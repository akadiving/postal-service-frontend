<template>
    <v-card height='100%'>
        <v-app-bar
            flat
            color="rgba(0, 0, 0, 0)"
          >
            <v-toolbar-title class="text-h6 text--primary">
              მანიფესტები
            </v-toolbar-title>
            
            <v-spacer></v-spacer>

            <v-avatar>
                <v-icon x-large @click='closeManifest'>mdi-close</v-icon>
            </v-avatar>
        </v-app-bar>
        <v-card-title style="{position: sticky; overflow: auto;}">
            <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="მანიფესტის მოძებნა"
            single-line
            hide-details
            ></v-text-field>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="manifest"
            class="elevation-0 overflow-y-auto mx-auto"
            fixed-header
            no-data-text='მონაცემები არ არსებობს'
            no-results-text='მონაცემები ვერ მოიძებნა'
            :search="search"
            multi-sort
            hide-default-footer
            :loading='loadingManifest'
            loading-text="მონაცემები იტვირთება"
            height="625px"
            :footer-props="{
                    itemsPerPageOptions:[-1]
                }"
        >
            <template v-slot:top>
                <v-toolbar
                    flat
                >
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
                                    v-model="editedItem.cmr"
                                    label="CMR კოდი"
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                >
                                    <v-text-field
                                    v-model="editedItem.car_number"
                                    label="მანქანის ნომერი"
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                >
                                    <v-text-field
                                    v-model="editedItem.driver_name"
                                    label="მძღოლის სახელი"
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                >
                                    <v-text-field
                                    v-model="editedItem.driver_surname"
                                    label="მძღოლის გვარი"
                                    ></v-text-field>
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
                    <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title class="text-h6">ნამდვილად გსურთ ამანათის გაუქმება?</v-card-title>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" outlined @click="closeDelete">არა</v-btn>
                        <v-btn color="red" outlined @click="deleteItemConfirm">დიახ</v-btn>
                        <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                </v-toolbar>
            </template> 
            <template v-slot:item.total_weight="{ item }">
                <p>
                    {{ (item.total_weight/1000).toFixed(2) }} კგ
                </p>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon
                            v-bind="attrs"
                            v-on="on"
                            medium
                            class="mr-2"
                            @click="editItem(item)"
                            color='primary'
                        >
                            mdi-pencil
                        </v-icon>
                    </template>
                    <span>მანიფესტის მონაცემების შეცვლა</span>
                </v-tooltip>
                <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon
                            v-bind="attrs"
                            v-on="on"
                            medium
                            @click="deleteItem(item)"
                            color='red'
                        >
                            mdi-delete
                        </v-icon>
                    </template>
                    <span>ამანათის წაშლა მანიფესტიდან</span>
                </v-tooltip>
            </template>
            <template v-slot:item.details="{ item }">
                <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon
                            v-bind="attrs"
                            v-on="on"
                            medium
                            @click="getManifestDetail(item.id)"
                            color='purple'
                        >
                            mdi-information-outline
                        </v-icon>
                    </template>
                    <span>მანიფესტის დეტალები</span>
                </v-tooltip>
            </template>
        </v-data-table>
        <v-pagination
            v-model="page"
            :length="(totalManifests)/20"
            circle
            @next="next"
            @previous='previous'
        ></v-pagination> 
  </v-card>
</template>

<script>
import axios from 'axios'
import router from "../router/index";

export default {
    name: 'Manifest',
    data: ()=>({
        search: '',
        totalManifests: '',
        errorM: '',
        nextPage: '',
        previousPage: '',
        page: 1,
        selectManifest: '',
        selectEditItem: '',
        dialogDelete: false,
        dialog: false,
        itemHeaders: [
          {
            text: 'ID',
            align: 'start',
            filterable: false,
            value: 'id',
          },
          { text: 'ბარკოდი', value: 'barcode' },
          { text: 'ავტორი', value: 'owner' },
          { text: 'მანიფესტის #', value: 'manifest_number_id' },
          { text: 'კომპანია', value: 'company' },
          { text: 'გამ. ქალაქი', value: 'sender_city' },
          { text: 'მიმღების ID', value: 'receiver_id' },
        ],
        headers: [
          {
            text: 'ID',
            align: 'start',
            filterable: false,
            value: 'id',
          },
          { text: 'თარიღი', value: 'created_at' },
          { text: 'მანქ. ნომერი', value: 'car_number' },
          { text: 'ავტორი', value: 'owner' },
          { text: 'მანიფესტის კოდი', value: 'manifest_code' },
          { text: 'გამ. ქალაქი', value: 'sender_city' },
          { text: 'მიმღ. ქალაქი', value: 'receiver_city' },
          { text: 'ამანათების რაოდ.', value: 'total_items' },
          { text: 'სულ წონა', value: 'total_weight' },
          { text: 'შეცვლა', value: 'actions', sortable: false },
          { text: 'სრულად ნახვა', value: 'details', sortable: false },
        ],
        manifest: [
            
        ],
        loadingManifest: true,
        editedIndex: -1,
        editedItem: {
            sender_city: '',
            receiver_city: '',
            driver_name: '',
            driver_surname: '',
            car_number: '',
            cmr: '',
        },
        defaultItem: {
            sender_city: '',
            receiver_city: '',
            driver_name: '',
            driver_surname: '',
            car_number: '',
            cmr: '',
        },
    }),
    watch: {
        search(value) {
            this.manifestSearch(value);
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
        return this.editedIndex === -1 ? 'მანიფესტის დამატება' : 'მანიფესტის მონაცემების შეცვლა'
      },
    },
    methods: {
        manifestSearch(manifest){
            let accessToken = JSON.parse(sessionStorage.getItem('access'))
            const baseURL = `https://postal-service-test.herokuapp.com/manifest/search/?=${manifest}`;
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
                console.log(response)
                this.manifest = response.data.results
                this.loadingManifest = false
                console.log(response.data.results[0].items)
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
                console.log(response)
                this.manifest = response.data.results
                this.totalManifests = response.data.count
                this.nextPage = response.data.next
                this.previousPage = response.data.previous
                this.loadingManifest = false
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
                if(error.response.data.detail == 'Given token not valid for any token type' || 
                error.response.data.detail == 'User is inactive'){
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
                console.log(response)
                this.manifest = response.data.results
                this.totalManifests = response.data.count
                this.nextPage = response.data.next
                this.previousPage = response.data.previous
                this.loadingManifest = false
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
                if(error.response.data.detail == 'Given token not valid for any token type' || 
                error.response.data.detail == 'User is inactive'){
                    this.logout()
                }
            })
        },
        editItem (item) {
            this.editedIndex = this.manifest.indexOf(item)
            console.log(this.editedItem)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
            this.selectEditItem = item.id
            console.log(this.editedItem)
        },
        getManifestDetail(id){
            this.$emit('getManifestDetail', id)
        },
        deleteItem (item) {
            this.editedIndex = this.manifest.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
            this.selectManifest = item.id
        },
        deleteItemConfirm () {
            let accessToken = JSON.parse(sessionStorage.getItem('access'))
            const baseURL = `https://postal-service-test.herokuapp.com/manifest/delete/${this.selectManifest}`;
            const options = {
                method: 'DELETE',
                baseURL: baseURL,
                timeout: 5000,
                headers: {
                    Authorization: 'Bearer ' + accessToken.value
                }, 
            };
            axios(options)
            .then((response) => {
                console.log(response)
                this.manifest.splice(this.editedIndex, 1)
                this.closeDelete()
                this.$toast('მანიფესტი გაუქმებულია', {
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

        save () {
            console.log(this.editedItem)
            let accessToken = JSON.parse(sessionStorage.getItem('access'))
            const baseURL = `https://postal-service-test.herokuapp.com/manifest/update/${this.selectEditItem}`;
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
                if (this.editedIndex > -1) {
                    Object.assign(this.manifest[this.editedIndex], this.editedItem)
                } else {
                    this.manifest.push(this.editedItem)
                }
                this.close()
                this.$toast.success('მანიფესტი შეცვლილია', {
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
            })  
            
        },
        closeManifest(){
            this.$emit('closeManifest')
        },
        logout() {
            axios.post('https://postal-service-test.herokuapp.com/api/logout/', {
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
    },
    mounted(){
        this.manifestSearch()
    }
}
</script>
