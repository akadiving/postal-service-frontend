<template>
    <v-card id='components' height='100%'>
        <v-app-bar
            flat
            color="rgba(0, 0, 0, 0)"
          >
            <v-toolbar-title class="text-h6 text--primary">
              ამანათები
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-avatar>
                <v-icon x-large @click='closeItems'>mdi-close</v-icon>
            </v-avatar>

        </v-app-bar>
        <v-card-title style="{position: sticky; overflow: auto;}">
            <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="ამანათის მოძებნა"
            single-line
            hide-details
            clearable
            ></v-text-field>
        </v-card-title>
        <div>
        <v-data-table
            v-model="selected"
            :headers="headers"
            :items="items"
            class="elevation-0 overflow-y-auto mx-auto"
            fixed-header
            show-select
            no-data-text='მონაცემები არ არსებობს'
            no-results-text='მონაცემები ვერ მოიძებნა'
            :search="search"
            :loading='loadingItems'
            multi-sort
            loading-text="მონაცემები იტვირთება"
            show-expand
            hide-default-footer
            height="625px"
            :footer-props="{
                    itemsPerPageOptions:[-1]
                }"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-btn  
                    large 
                    text
                    class="ma-2">
                        <v-icon large
                        color="green"
                        @click="exportExcell">
                            mdi-microsoft-excel
                        </v-icon>
                    </v-btn>
                    <!-- edit dialog -->
                    <v-dialog
                    v-model="dialog"
                    max-width="500px"
                    >
                    <v-card>
                        <v-card-title>
                            <span class="text-h5">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                >
                                    <v-text-field
                                    v-model="editedItem.sender_name"
                                    label="გამომ. სახელი"
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                >
                                    <v-text-field
                                    v-model="editedItem.sender_surname"
                                    label="გამომ. გვარი"
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                >
                                    <v-text-field
                                    v-model="editedItem.receiver_name"
                                    label="მიმღ. სახელი"
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                >
                                    <v-text-field
                                    v-model="editedItem.receiver_surname"
                                    label="მიმღ. გვარი"
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                >
                                    <v-autocomplete
                                    class='elevation-0'
                                    item-text="country"
                                    item-value="country"
                                    label="გამომ. ქვეყანა"
                                    background-color="white"
                                    :items="countries"
                                    v-model="editedItem.sender_country"
                                    ></v-autocomplete>
                                </v-col>
                                <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                >
                                    <v-autocomplete
                                    class='elevation-0'
                                    item-text="country"
                                    item-value="country"
                                    label="მიმღ. ქვეყანა"
                                    background-color="white"
                                    :items="countries"
                                    v-model="editedItem.receiver_country"
                                    ></v-autocomplete>
                                </v-col>
                                <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                >
                                    <v-text-field
                                    v-model="editedItem.sender_city"
                                    label="გამომ. ქალაქი"
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                >
                                    <v-text-field
                                    v-model="editedItem.receiver_city"
                                    label="მიმღ. ქალაქი"
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                >
                                    <v-text-field
                                    v-model="editedItem.receiver_address"
                                    label="მიმღ. მისამართი"
                                    ></v-text-field>
                                </v-col>
                                
                                <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                >
                                    <v-text-field
                                    v-model="editedItem.receiver_id"
                                    label="მიმღების ID"
                                    ></v-text-field>
                                </v-col>
                                
                                
                                <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                >
                                    <v-text-field
                                    v-model="editedItem.receiver_number"
                                    label="მიმღ. ნომერი"
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                >
                                    <v-text-field
                                    v-model="editedItem.weight"
                                    label="წონა"
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                >
                                    <v-text-field
                                    v-model="editedItem.price"
                                    label="ფასი"
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                >
                                    <v-autocomplete
                                    class='elevation-0'
                                    item-text="cc"
                                    item-value="cc"
                                    label="ვალუტა"
                                    background-color="white"
                                    :items="currency"
                                    v-model="editedItem.currency"
                                    :prefix="currency.symbol"
                                    ></v-autocomplete>
                                </v-col>
                                <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                >
                                <v-select
                                    v-model="editedItem.arrived"
                                    :items="arrived"
                                    label="ჩამოსულია"
                                    hint='ჩამოსულია'
                                    persistent-hint
                                    single-line
                                    ></v-select>
                                </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="red"
                            outlined
                            @click="close"
                        >
                            გაუქმება
                        </v-btn>
                        <v-btn
                            color="green"
                            outlined
                            @click="save"
                        >
                            დამახსოვრება
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                    <!-- edit dialog -->

                    <!-- barcode manfiest dialog -->
                    <v-dialog v-model="barcodeDialog" 
                    persistent
                    hide-overlay
                    width="300">
                    <v-card 
                    color="white"
                    >
                        <v-card-text class='text-center'>
                        <v-progress-circular
                        class='mt-4'
                        :size="50"
                        color="amber"
                        indeterminate
                        ></v-progress-circular>
                        </v-card-text>
                    </v-card>
                    </v-dialog>
                    <!-- barcode manfiest dialog -->

                    <!-- delete dialog -->
                    <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title class="text-h6">ნამდვილად გსურთ მონიშნული ამანათის/ამანათების გაუქმება?</v-card-title>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" outlined @click="closeDelete">არა</v-btn>
                        <v-btn color="red" outlined @click="deleteItemConfirm">დიახ</v-btn>
                        <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                    <!-- delete dialog -->

                    <!-- change manfiest dialog -->
                    <v-dialog v-model="changeManifest" max-width="500px">
                    <v-card>
                        <v-form v-model="validManifest">
                            <v-card-title class="text-h6">დაამატე ან შეცვალე მანიფესტის ID</v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols='12'>
                                            <v-autocomplete
                                                class='elevation-0'
                                                outlined
                                                clearable
                                                hide-details
                                                required
                                                item-text="manifest_code"
                                                item-value="id"
                                                label="აირჩიეთ მანიფესტის კოდი"
                                                :items="manifestList"
                                                
                                                v-model="newManifest"
                                                dense
                                                ></v-autocomplete>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1"
                            :disabled="!validManifest"
                            outlined @click="changeManifestId">შეცვალე/დაამატე</v-btn>
                            <v-btn color="red" outlined @click="closeChangeManifest">გაუქმება</v-btn>
                            <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-form>
                        
                    </v-card>
                    </v-dialog>
                    <!-- change manfiest dialog -->
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
            <v-icon
                medium
                class="mr-1"
                @click="editItem(item)"
                color='primary'
            >
                mdi-pencil
            </v-icon>
            <v-icon
                medium
                @click="deleteItem(item)"
                color='red'
            >
                mdi-delete
            </v-icon>
            </template>
            <template v-slot:item.document="{ item }">
            <v-icon
                medium
                class="ml-4"
                @click="showBarcode(item.id)"
                color='purple'
            >
                mdi-sticker-check-outline
            </v-icon>
            </template>
            <template v-slot:item.add_manifest="{ item }">
            <v-icon
                medium
                class="ml-4"
                @click="showSelected(item)"
                color='green'
            >
                mdi-book-plus-multiple-outline
            </v-icon>
            </template>
            <template v-slot:item.manifest_code="{ item }">
                <v-chip
                    v-if="!item.manifest_code"
                    color='red'
                    dark
                >
                    N/A
                </v-chip>
                <v-chip
                    v-else
                    color='green'
                    dark
                    outlined
                >
                    {{item.manifest_code}}
                </v-chip>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                    <v-row justify="center" align="center">
                        <v-col cols='auto' class="ma-2 mt-3">
                            ფასი - {{item.price}} {{item.currency}}
                        </v-col>
                        <v-col cols='auto' class="ma-2 mt-3">
                            წონა - {{item.weight}} კგ
                        </v-col>
                        <v-col cols='auto' class="ma-2 mt-3">
                            ავტორი - {{item.owner}} 
                        </v-col>
                        <v-col cols='auto' class="ma-2 mt-3">
                            კომპანია - {{item.company}} 
                        </v-col>
                        
                        <v-col cols='auto' class="ma-2 mt-3">
                            ჩამოსულია - <v-chip
                                v-if="!item.arrived"
                                color='red'
                                dark
                                outlined
                                
                            >
                                არა
                            </v-chip>
                            <v-chip
                                v-else
                                color='green'
                                dark
                                outlined
                            >
                                კი
                            </v-chip> 
                        </v-col>
                        <v-col cols='auto' class="ma-2 mt-3">
                            <v-textarea
                            outlined
                            readonly
                            auto-grow
                            hide-details
                            rows="1"
                            label="აღწერა"
                            :value="item.description"
                            ></v-textarea> 
                        </v-col>
                    </v-row>
                </td>
            </template> 
                 
        </v-data-table>
        <v-pagination
            v-model="page"
            :length="(totalItems)/20"
            circle
            @next="next"
            @previous='previous'
        ></v-pagination> 
        </div>
  </v-card>
</template>

<script>
import axios from 'axios'
import router from "../router/index";
import countries from '../data.json'
import currency from '../currency.json'
export default {
    name: 'Items',
    data: ()=>({
        countries: countries,
        currency: currency,
        newManifest: '',
        errorM: '',
        selected: [],
        validManifest: false,
        newSelected: [],
        manifestList: [],
        selectedManifest: '',
        search: '',
        nextPage: '',
        previousPage: '',
        page: 1,
        arrived: [{
        text: "კი",
            value: true
        },
        {
            text: "არა",
            value: false
        }],
        pdfsrc: null,
        loadingItems: true,
        selectItem: '',
        selectEditItem: '',
        dialogDelete: false,
        dialog: false,
        barcodeDialog: false,
        changeManifest: false,
        headers: [
          {
            text: 'ID',
            align: 'start',
            filterable: false,
            value: 'id',
          },
          { text: 'ბარკოდი', value: 'barcode' },
          
          { text: 'მანიფესტის კოდი', value: 'manifest_code' },
          
          { text: 'გამ. სახელი', value: 'sender_name' },
          { text: 'გამ. გვარი', value: 'sender_surname' },
          { text: 'მიმღ. სახელი', value: 'receiver_name' },
          { text: 'მიმღ. გვარი', value: 'receiver_surname' },
          { text: 'მიმღ. ქალაქი', value: 'receiver_city' },
          { text: 'მიმღების ID', value: 'receiver_id' },
          { text: 'შეცვლა', value: 'actions', sortable: false },
          { text: 'სტიკერი', value: 'document', sortable: false },
          { text: 'მანიფესტში დამ.', value: 'add_manifest' },
          { text: '', value: 'data-table-expand' },
          
        ],
        items: [
            
        ],
        totalItems: '',
        editedIndex: -1,
        editedItem: {
            company: '',
            sender_name: '',
            sender_surname: '',
            sender_country: '',
            sender_city: '',
            receiver_name: '',
            receiver_surname: '',
            receiver_id: '',
            receiver_country: '',
            receiver_city: '',
            receiver_address: '',
            receiver_number: '',
            weight: '',
            price: '',
            currency: '',
            in_manifest: '',
            arrived: '',
            manifest_number: '',
        },
        defaultItem: {
            company: '',
            sender_name: '',
            sender_surname: '',
            sender_country: '',
            sender_city: '',
            receiver_name: '',
            receiver_surname: '',
            receiver_id: '',
            receiver_country: '',
            receiver_city: '',
            receiver_address: '',
            receiver_number: '',
            weight: '',
            price: '',
            currency: '',
            in_manifest: '',
            arrived: '',
            manifest_number: '',
        },
        
    }),
    watch: {
        search(value) {
            this.itemSearch(value);
        },
        dialog (val) {
            val || this.close()
        },
        dialogDelete (val) {
            val || this.closeDelete()
        },

    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'ამანათის დამატება' : 'ამანათის მონაცემების შეცვლა'
      },
      manifestValidation() {
          if(this.newManifest){
              return this.validManifest = true
          } else {
              return this.validManifest = false
          }
      }
    },
    methods: {
        itemSearch(item){
            let baseURL = `https://apimyposta.onlineitems/search/?search=${item}`;
            if (!item){
                baseURL = `https://apimyposta.online/items/search/?search=`
            } else {
                baseURL = `https://apimyposta.online/items/search/?search=${item}`;
            }
            let accessToken = JSON.parse(sessionStorage.getItem('access'))
            
            const options = {
                method: 'GET',
                baseURL: baseURL,
                headers: {
                    Authorization: 'Bearer ' + accessToken.value
                },
            };
            axios(options)
            .then((response) => {
                this.items = response.data.results
                this.totalItems = response.data.count
                this.nextPage = response.data.next
                this.previousPage = response.data.previous
                this.loadingItems = false
            })
            .catch((error) => {
                console.log(error)
                if(error.response.data.detail == 'Given token not valid for any token type') 
                 {
                    this.errorM = "გთხოვთ თავიდან შეიყვანოთ მონაცემები"
                    this.logout()
                } else if(error.response.data.detail == 'User is inactive'){
                    this.errorM = "თქვენ არ გაქვთ შესვლის უფლება"
                    this.logout()
                } else{
                    this.errorM = error.response.data.detail
                }
                this.$toast.error(this.errorM, {
                    position: "bottom-left",
                    timeout: 5000,
                    closeOnClick: true,
                    pauseOnFocusLoss: true,
                    pauseOnHover: true,
                    draggable: true,
                    draggablePercent: 0.6,
                    showCloseButtonOnHover: false,
                    hideProgressBar: false,
                    closeButton: "button",
                    icon: true,
                    rtl: false
                }); 
            })
        },
        next(){
            let accessToken = JSON.parse(sessionStorage.getItem('access'))
            const baseURL = `${this.nextPage}`;
            const options = {
                method: 'GET',
                baseURL: baseURL,
                timeout: 5000,
                headers: {
                    Authorization: 'Bearer ' + accessToken.value
                }, 
            };
            axios(options)
            .then((response) => {
                this.items = response.data.results
                this.totalItems = response.data.count
                this.nextPage = response.data.next
                this.previousPage = response.data.previous
                this.loadingItems = false
            })
            .catch((error) => {
                console.log(error)
                this.$toast.error(error.response.data.detail, {
                    position: "bottom-left",
                    timeout: 5000,
                    closeOnClick: true,
                    pauseOnFocusLoss: true,
                    pauseOnHover: true,
                    draggable: true,
                    draggablePercent: 0.6,
                    showCloseButtonOnHover: false,
                    hideProgressBar: false,
                    closeButton: "button",
                    icon: true,
                    rtl: false
                });
                if(error.response.data.detail == 'Given token not valid for any token type'){
                    this.logout()
                }
            })
        },
        previous(){
            let accessToken = JSON.parse(sessionStorage.getItem('access'))
            const baseURL = `${this.previousPage}`;
            const options = {
                method: 'GET',
                baseURL: baseURL,
                timeout: 5000,
                headers: {
                    Authorization: 'Bearer ' + accessToken.value
                }, 
            };
            axios(options)
            .then((response) => {
                this.items = response.data.results
                this.totalItems = response.data.count
                this.nextPage = response.data.next
                this.previousPage = response.data.previous
                this.loadingItems = false
            })
            .catch((error) => {
                console.log(error)
                this.$toast.error(error.response.data.detail, {
                    position: "bottom-left",
                    timeout: 5000,
                    closeOnClick: true,
                    pauseOnFocusLoss: true,
                    pauseOnHover: true,
                    draggable: true,
                    draggablePercent: 0.6,
                    showCloseButtonOnHover: false,
                    hideProgressBar: false,
                    closeButton: "button",
                    icon: true,
                    rtl: false
                });
                if(error.response.data.detail == 'Given token not valid for any token type'){
                    this.logout()
                }
            })
        },
        editItem (item) {
            this.editedIndex = this.items.indexOf(item)
            console.log(this.editedItem)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
            this.selectEditItem = item.id
        },
        deleteItem (item) {
            this.editedIndex = this.items.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
            this.selectItem = item.id
            this.newSelected = []
            this.selected.push(item)

            this.selected.forEach(element => {
                this.newSelected.push(element.id)
            });

            this.newSelected = [...new Set(this.newSelected)]
            
        },
        async showBarcode(item){
            this.barcodeDialog = true
            let accessToken = JSON.parse(sessionStorage.getItem('access'))
            const baseURL = `https://apimyposta.online/items/generate_sticker/${item}`;
            const options = {
                method: 'GET',
                baseURL: baseURL,
                timeout: 10000,
                responseType: "blob",
                headers: {
                    Authorization: 'Bearer ' + accessToken.value
                }, 
            };
            await axios(options)
            .then((response) => {
                const blob = new Blob([response.data],{type: 'application/pdf'});
                const objectUrl = URL.createObjectURL(blob);
                this.pdfsrc = objectUrl;
                let tab = window.open();
                tab.location.href = objectUrl;
                this.barcodeDialog = false
            })
            .catch((error) => {
                console.log(error)
                this.$toast.error(error.response.data.detail, {
                    position: "bottom-left",
                    timeout: 5000,
                    closeOnClick: true,
                    pauseOnFocusLoss: true,
                    pauseOnHover: true,
                    draggable: true,
                    draggablePercent: 0.6,
                    showCloseButtonOnHover: false,
                    hideProgressBar: false,
                    closeButton: "button",
                    icon: true,
                    rtl: false
                });
            })
        },
        deleteItemConfirm () {
            let accessToken = JSON.parse(sessionStorage.getItem('access'))
            const baseURL = `https://apimyposta.online/items/bulk-delete/`;
            const options = {
                method: 'DELETE',
                baseURL: baseURL,
                timeout: 5000,
                headers: {
                    Authorization: 'Bearer ' + accessToken.value
                },
                data: {id: this.newSelected}
            };
            axios(options)
            .then((response) => {
                console.log(response)
                this.items.splice(this.editedIndex, 1)
                this.closeDelete()
                this.$toast.success('ამანათი გაუქმებულია', {
                    position: "bottom-left",
                    timeout: 5000,
                    closeOnClick: true,
                    pauseOnFocusLoss: true,
                    pauseOnHover: true,
                    draggable: true,
                    draggablePercent: 0.6,
                    showCloseButtonOnHover: false,
                    hideProgressBar: false,
                    closeButton: "button",
                    icon: true,
                    rtl: false
                });
                this.newSelected = []
                this.selected = []
            })
            .catch((error) => {
                console.log(error)
                this.$toast.error(error.response.data.detail, {
                    position: "bottom-left",
                    timeout: 5000,
                    closeOnClick: true,
                    pauseOnFocusLoss: true,
                    pauseOnHover: true,
                    draggable: true,
                    draggablePercent: 0.6,
                    showCloseButtonOnHover: false,
                    hideProgressBar: false,
                    closeButton: "button",
                    icon: true,
                    rtl: false
                });
                if(error.response.data.detail == 'Given token not valid for any token type'){
                    this.logout()
                }
            })  
        },
        close () {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
        closeDelete () {
            this.dialogDelete = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            })
        },
        closeChangeManifest () {
            this.changeManifest = false
            this.$nextTick(() => {
                this.newSelected = []
                this.selected = []
            })
        },
        save () {
            delete this.editedItem['barcode_image']
            delete this.editedItem['manifest_code']
            let accessToken = JSON.parse(sessionStorage.getItem('access'))
            const baseURL = `https://apimyposta.online/items/update/${this.selectEditItem}`;
            const options = {
                method: 'PATCH',
                baseURL: baseURL,
                timeout: 5000,
                headers: {
                    Authorization: 'Bearer ' + accessToken.value
                },
                data: this.editedItem

            };
            axios(options)
            .then((response) => {
                console.log(response)
                this.itemSearch()
                this.close()
                this.$toast.success('ამანათი შეცვლილია', {
                    position: "bottom-left",
                    timeout: 5000,
                    closeOnClick: true,
                    pauseOnFocusLoss: true,
                    pauseOnHover: true,
                    draggable: true,
                    draggablePercent: 0.6,
                    showCloseButtonOnHover: false,
                    hideProgressBar: true,
                    closeButton: "button",
                    icon: true,
                    rtl: false
                });
            })
            .catch((error) => {
                console.log(error)
                this.$toast.error(error.response.data.detail, {
                    position: "bottom-left",
                    timeout: 5000,
                    closeOnClick: true,
                    pauseOnFocusLoss: true,
                    pauseOnHover: true,
                    draggable: true,
                    draggablePercent: 0.6,
                    showCloseButtonOnHover: false,
                    hideProgressBar: false,
                    closeButton: "button",
                    icon: true,
                    rtl: false
                });
                if(error.response.data.detail == 'Given token not valid for any token type'){
                    this.logout()
                }
            })  
            
        },
        closeItems(){
            this.$emit('closeItems')
        },
        logout() {
            axios.post('https://apimyposta.online/api/logout/', {
                refresh_token: sessionStorage.getItem('refresh')
            })
            .then((response) => {
                console.log(response)
                //localStorage.removeItem('access')
                //localStorage.removeItem('refresh')
                sessionStorage.clear();
                this.loginPage()
            })
            .catch((error)=>{
                console.log(error)
            })
        },
        loginPage() {
            router.push({ path: "/login" }).catch((err) => {
                // Ignore the vuex err regarding  navigating to the page they are already on.
                if (
                err.name !== "NavigationDuplicated" &&
                !err.message.includes(
                    "Avoided redundant navigation to current location"
                )
                ) {
                // But print any other errors to the console
                console.log(err);
                }
            });
        },
        showSelected(item){
            this.manifestId()
            this.changeManifest = true
            this.newSelected = []
            this.selected.push(item)
   
            this.selected.forEach(element => {
                this.newSelected.push(element.id)
            });

            this.newSelected = [...new Set(this.newSelected)]
            
            this.selected = []
        },
        changeManifestId(){
            let accessToken = JSON.parse(sessionStorage.getItem('access'))
            const baseURL = `https://apimyposta.online/items/update-manifest/`;
            const options = {
                method: 'PATCH',
                baseURL: baseURL,
                timeout: 5000,
                headers: {
                    Authorization: 'Bearer ' + accessToken.value
                },
                data: {id: this.newSelected,manifest: this.newManifest} 
            };
            console.log(options.data)
            axios(options)
            .then((response) => {
                console.log(response)
                this.itemSearch()
                this.changeManifest = false
                this.$toast.success('მანიფესტი შეცვლილია', {
                    position: "bottom-left",
                    timeout: 5000,
                    closeOnClick: true,
                    pauseOnFocusLoss: true,
                    pauseOnHover: true,
                    draggable: true,
                    draggablePercent: 0.6,
                    showCloseButtonOnHover: false,
                    hideProgressBar: false,
                    closeButton: "button",
                    icon: true,
                    rtl: false
                });
                this.newSelected = []
                this.selected = []
            })
            .catch((error) => {
                console.log(error)
                if(error.response.data.detail == 'Given token not valid for any token type'){
                    this.$toast.error('გთხოვთ თავიდან შეხვიდეთ მართვის პანელში', {
                    position: "bottom-left",
                    timeout: 5000,
                    closeOnClick: true,
                    pauseOnFocusLoss: true,
                    pauseOnHover: true,
                    draggable: true,
                    draggablePercent: 0.6,
                    showCloseButtonOnHover: false,
                    hideProgressBar: false,
                    closeButton: "button",
                    icon: true,
                    rtl: false
                });
                    this.logout()
                }
                this.$toast.error(error.response.data.detail, {
                    position: "bottom-left",
                    timeout: 5000,
                    closeOnClick: true,
                    pauseOnFocusLoss: true,
                    pauseOnHover: true,
                    draggable: true,
                    draggablePercent: 0.6,
                    showCloseButtonOnHover: false,
                    hideProgressBar: false,
                    closeButton: "button",
                    icon: true,
                    rtl: false
                });
                
            })
        },
        manifestId(){
            let accessToken = JSON.parse(sessionStorage.getItem('access'))
            const baseURL = `https://apimyposta.online/manifest/search/?search=`;
            const options = {
                method: 'GET',
                baseURL: baseURL,
                timeout: 5000,
                headers: {
                    Authorization: 'Bearer ' + accessToken.value
                }, 
            };
            axios(options)
            .then((response) => {
                this.manifestList = response.data.results
                this.manifestList.unshift({manifest_code: "არცერთი", id: null})
            })
            .catch((error) => {
                console.log(error)
                if(error.response.data.detail == 'Given token not valid for any token type'){
                    this.$toast.error('გთხოვთ თავიდან შეხვიდეთ მართვის პანელში', {
                    position: "bottom-left",
                    timeout: 5000,
                    closeOnClick: true,
                    pauseOnFocusLoss: true,
                    pauseOnHover: true,
                    draggable: true,
                    draggablePercent: 0.6,
                    showCloseButtonOnHover: false,
                    hideProgressBar: false,
                    closeButton: "button",
                    icon: true,
                    rtl: false
                });
                    this.logout()
                }
                this.$toast.error(error.response.data.detail, {
                    position: "bottom-left",
                    timeout: 5000,
                    closeOnClick: true,
                    pauseOnFocusLoss: true,
                    pauseOnHover: true,
                    draggable: true,
                    draggablePercent: 0.6,
                    showCloseButtonOnHover: false,
                    hideProgressBar: false,
                    closeButton: "button",
                    icon: true,
                    rtl: false
                });
                
            })
        },
        async exportExcell(){
            // If there is any selected item takes id from array and appends it to a
            // newSelected. If not, than this function will take an ID form Items array
            // and will append it to a newSelected. After that, POST request with the list
            // of IDs will be sent to return an excel file with specified IDs
            this.barcodeDialog = true
            let accessToken = JSON.parse(sessionStorage.getItem('access'))
            const baseURL = `https://apimyposta.online/items/export_excel/`;
            let options = {
                method: 'POST',
                baseURL: baseURL,
                timeout: 10000,
                responseType: "blob",
                headers: {
                    Authorization: 'Bearer ' + accessToken.value
                },
                data: {id: this.newSelected.id} 
            };
            if (this.selected.length > 0){
                this.newSelected = []
                this.selected.forEach(element => {
                    this.newSelected.push(element.id)
                });
                this.newSelected = [...new Set(this.newSelected)]
                options = {
                    method: 'POST',
                    baseURL: baseURL,
                    timeout: 10000,
                    responseType: "blob",
                    headers: {
                        Authorization: 'Bearer ' + accessToken.value
                    },
                    data: {id: this.newSelected} 
                };
            } else {
                this.newSelected = []
                this.items.forEach(element => {
                    this.newSelected.push(element.id)
                });
                this.newSelected = [...new Set(this.newSelected)]
                options = {
                    method: 'POST',
                    baseURL: baseURL,
                    timeout: 10000,
                    responseType: "blob",
                    headers: {
                        Authorization: 'Bearer ' + accessToken.value
                    },
                    data: {id: this.newSelected} 
                };
            }
            await axios(options)
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data], {type: 'application/vnd.ms-excel'}));
                const link = document.createElement('a');
                link.href = url;
                let d = Date.now();
                d = new Date(d);
                d = (d.getMonth()+1)+'-'+d.getDate()+'-'+d.getFullYear()+'-'+(d.getHours() > 12 ? d.getHours() - 12 : d.getHours())+':'+d.getMinutes()+'-'+(d.getHours() >= 12 ? "PM" : "AM");
                link.setAttribute('download', `ამანათები-${d}.xls`);
                document.body.appendChild(link);
                link.click();
                this.barcodeDialog = false
                this.newSelected = []
                this.selected = []
            })
            .catch((error) => {
                console.log(error)
                this.$toast.error(error.response.data.detail, {
                    position: "bottom-left",
                    timeout: 5000,
                    closeOnClick: true,
                    pauseOnFocusLoss: true,
                    pauseOnHover: true,
                    draggable: true,
                    draggablePercent: 0.6,
                    showCloseButtonOnHover: false,
                    hideProgressBar: false,
                    closeButton: "button",
                    icon: true,
                    rtl: false
                });
            })
        }
    },
    mounted(){
        this.itemSearch()
    }
}
</script>

<style scoped>

.v-data-table .sticky-header {
  position: sticky;
  top: var(--toolbarHeight);
}

.v-data-table .v-data-table__wrapper {
        overflow: unset;
    }
</style>