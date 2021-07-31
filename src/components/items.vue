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
                    <v-container fluid>
                        <v-row justify="start">
                            <v-col cols="auto">
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
                            </v-col>
                            <v-col cols="auto">
                                <v-checkbox
                                class="mt-4"
                                v-model="received"
                                label="გაცემულია"
                                ></v-checkbox>
                            </v-col>
                        </v-row>
                    </v-container>
                   
                    
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
                                <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                >
                                <v-select
                                    v-model="editedItem.delivered"
                                    :items="delivered"
                                    label="გაცემულია"
                                    hint='გაცემულია'
                                    persistent-hint
                                    single-line
                                    ></v-select>
                                </v-col>
                                <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                >
                                    <v-textarea
                                    v-model="editedItem.description"
                                    outlined
                                    auto-grow
                                    hide-details
                                    rows="1"
                                    label="აღწერა"
                                    :value="items.description"
                                    ></v-textarea>
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

                    <!-- signature dialog -->
                    <v-dialog v-model="dialogSignature" width="500px" height="200px" max-height="400px" max-width="500px" >
                        <v-card flex v-if="signed" transition="scale-transition origin-center">
                            <v-card-title class="text-h6">გთხოვთ ხელი მოაწეროთ</v-card-title>
                            <v-card-text class='text-center'>
                                <v-container fluid>
                                    <v-row justify="center">   
                                        <v-col cols="12" v-if="signedFinish">
                                            <v-avatar
                                            size="128"
                                            >
                                            <v-img src="../assets/success-svgrepo-com.svg"></v-img>
                                            </v-avatar>

                                        </v-col>
                                        <v-col cols="12" v-else>
                                            <v-progress-circular
                                            :size="70"
                                            :width="7"
                                            color="green"
                                            indeterminate
                                            ></v-progress-circular>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red" outlined @click="clear" :disabled='true'>წაშლა</v-btn>
                            <v-btn color="green" outlined @click="signItem()" :disabled='true'
                            >დადასტურება</v-btn>
                            <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                        <v-card flex v-else transition="scale-transition origin-center">
                            <v-card-title class="text-h6">გთხოვთ ხელი მოაწეროთ</v-card-title>
                            <v-card-text class='text-center'>
                                <v-container flex width="100%">
                                    <v-row>
                                        <v-col cols='12'>
                                            <VueSignaturePad
                                            id="signature"
                                            width="100%"
                                            height="200px"
                                            ref="signaturePad"
                                            :options="{onBegin: () => {$refs.signaturePad.resizeCanvas()}, 
                                            onEnd: () => {$refs.signaturePad.clearCacheImages()}}"
                                            />
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red" outlined @click="clear">წაშლა</v-btn>
                            <v-btn color="green" outlined @click="signItem()"
                            >დადასტურება</v-btn>
                            <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <!-- signature dialog -->

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
                class="ml-6"
                @click="showSelected(item)"
                color='green'
            >
                mdi-book-plus-multiple-outline
            </v-icon>
            </template>
            <template v-slot:item.add_signature="{ item }">
            <v-icon
                medium
                
                @click="addSignature(item)"
                color='primary'
            >
                mdi-pen
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
                            გაცემულია - <v-chip
                                v-if="!item.delivered"
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
        <v-btn text color="primary" @click="next">
            მეტი...
        </v-btn>
        <v-btn text color="primary" @click="allItems">
            ყველა ამანათი
        </v-btn>
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
        received: false,
        errorM: '',
        selected: [],
        validManifest: false,
        signed: false,
        signedFinish: false,
        newSelected: [],
        manifestList: [],
        selectedManifest: '',
        search: '',
        arrived: [{
        text: "კი",
            value: true
        },
        {
            text: "არა",
            value: false
        }],
        delivered: [{
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
        dialogSignature: false,
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
          { text: 'ხელის მოწერა', value: 'add_signature' },
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
            delivered: '',
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
            delivered: '',
            manifest_number: '',
        },
        currentUrl: 'https://apimyposta.online/items/search/?search=',
        signature: {}
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
        received(value){
            if(value){
                this.itemDeliveredSearch()
            } else{
                this.itemSearch(value)
            }
        }
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
      },
    },
    methods: {
        itemSearch(item){
            this.loadingItems = true
            let baseURL = `https://apimyposta.online/items/search/?search=${item}`;
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
        itemDeliveredSearch(){
            let baseURL = `https://apimyposta.online/items/delivered/search/?search=`;
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
            let baseURL = this.currentUrl;
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
                for (let i = 0; i < response.data.results.length; i++){
                    this.items.push(response.data.results[i])
                }
                this.currentUrl = response.data.next
                this.totalItems = response.data.count
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
        allItems(){
            this.loadingItems = true
            let baseURL = 'https://apimyposta.online/items/';
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
                this.items = response.data
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
        clear() {
            this.$refs.signaturePad.clearSignature();
            this.$refs.signaturePad.clearCacheImages();
        },
        signItem() {
            this.signed = true
            const data = this.$refs.signaturePad.saveSignature().data
            this.signature = data
            let accessToken = JSON.parse(sessionStorage.getItem('access'))
            const baseURL = `https://apimyposta.online/items/signature/`;
            const options = {
                method: 'PATCH',
                baseURL: baseURL,
                headers: {
                    Authorization: 'Bearer ' + accessToken.value
                },
                data: {id: this.newSelected,signature: this.signature} 
            };
            console.log(options.data)
            axios(options)
            .then((response) => {
                console.log(response)
                this.itemSearch()
                this.signedFinish = true
                
                setTimeout(() => { 
                    this.dialogSignature = false
                    this.signed = false
                    this.signedFinish = false
                    this.newSelected = []
                    this.signature = {}
                }, 1500);
                
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
        addSignature(item){
            this.dialogSignature = true
            this.newSelected = `${item.id}`
            this.signature = item.signature
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
            } 
            else if(this.selected.length <= 0){
                this.newSelected = []
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
            else {
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

#signature {
  border: double 3px transparent;
  border-radius: 5px;
  background-image: linear-gradient(white, white),
    radial-gradient(circle at top left, #4bc5e8, #9f6274);
  background-origin: border-box;
  background-clip: content-box, border-box;
}
</style>