<template>
    <v-card>
        <v-app-bar
            flat
            color="rgba(0, 0, 0, 0)"
          >
            <v-card-title >
                <span class="text-h6">მანიფესტის დეტალები</span>
            </v-card-title>

            <v-spacer></v-spacer>

            <v-btn
              icon
            >
            <v-icon x-large @click='closeManifestDetail'>mdi-close</v-icon>
            </v-btn>
          </v-app-bar>
        <!-- manifest details -->
        <v-container fluid>
            <v-row justify='start' dense> 
                <v-col cols="auto">
                    <v-list>
                        <v-list-item>
                            <v-chip outlined label large class="ma-2">
                                <v-avatar left>
                                    <v-icon medium color='purple'>
                                        mdi-pound
                                    </v-icon>
                                </v-avatar>
                                მანიფესტის ID - {{manifest.id}}
                            </v-chip>
                        </v-list-item>
                        <v-list-item>
                            <v-chip outlined label large class="ma-2">
                                <v-avatar left>
                                    <v-icon medium color='purple'>
                                        mdi-account
                                    </v-icon>
                                </v-avatar>
                                მანიფესტის ავტორი - {{manifest.owner}}
                            </v-chip>
                        </v-list-item>
                        <v-list-item>
                            <v-chip outlined label large class="ma-2">
                                <v-avatar left>
                                    <v-icon left medium color='purple'>
                                        mdi-calendar-clock
                                    </v-icon>
                                </v-avatar> 
                                შეიქმნა - {{manifest.created_at}}
                            </v-chip>
                        </v-list-item>   
                    </v-list>
                </v-col>
                <v-col cols='auto'>
                    <v-list>
                        <v-list-item>
                            <v-chip outlined label large class="ma-2">
                                <v-avatar left>
                                    <v-icon medium color='primary'>
                                        mdi-home-city-outline
                                    </v-icon>
                                </v-avatar>
                                გამომგზავნი ქალაქი - {{manifest.sender_city}}
                            </v-chip>
                        </v-list-item>
                        <v-list-item>
                            <v-chip outlined label large class="ma-2">
                                <v-avatar left>
                                    <v-icon medium color='green'>
                                        mdi-home-city-outline
                                    </v-icon>
                                </v-avatar>
                                მიმღები ქალაქი - {{manifest.receiver_city}}
                            </v-chip>
                        </v-list-item>
                        <v-list-item>
                            <v-chip outlined label large class="ma-2">
                                <v-avatar left>
                                   <v-icon medium color='primary'>
                                        mdi-barcode-scan
                                    </v-icon>
                                </v-avatar>
                                მანიფესტის კოდი - {{manifest.manifest_code}}
                            </v-chip>
                        </v-list-item>
                    </v-list>
                </v-col>
                <v-col cols="auto">
                    <v-list>
                        
                        <v-list-item>
                            <v-chip outlined label large class="ma-2">
                                <v-avatar left>
                                   <v-icon medium color='primary'>
                                        mdi-car
                                    </v-icon>
                                </v-avatar>
                                მანქანის ნომერი - {{manifest.car_number}}
                            </v-chip>
                        </v-list-item>
                        <v-list-item>
                            <v-chip outlined label large class="ma-2">
                                <v-avatar left>
                                   <v-icon medium color='primary'>
                                        mdi-account
                                    </v-icon>
                                </v-avatar>
                                მძღოლის სახელი - {{manifest.driver_name}}
                            </v-chip>
                        </v-list-item>
                        <v-list-item>
                            <v-chip outlined label large class="ma-2">
                                <v-avatar left>
                                   <v-icon medium color='primary'>
                                        mdi-account
                                    </v-icon>
                                </v-avatar>
                                მძღოლის გვარი - {{manifest.driver_surname}}
                            </v-chip>
                        </v-list-item>
                         
                    </v-list>
                </v-col>
                <v-col cols='auto'>
                    <v-list>
                        <v-list-item>
                            <v-chip outlined label large class="ma-2">
                                <v-avatar left>
                                   <v-icon medium color='primary'>
                                        mdi-package-variant-closed
                                    </v-icon>
                                </v-avatar>
                                ამანათების რაოდენობა - {{manifest.total_items}}
                            </v-chip>
                        </v-list-item>
                        <v-list-item>
                            <v-chip outlined label large class="ma-2">
                                <v-avatar left>
                                   <v-icon medium color='red'>
                                        mdi-code-braces
                                    </v-icon>
                                </v-avatar>   
                                CMR კოდი - {{manifest.cmr}}
                            </v-chip>
                        </v-list-item>
                        <v-list-item>
                            <v-chip outlined label large class="ma-2">
                                <v-avatar left>
                                   <v-icon medium color='primary'>
                                        mdi-weight-kilogram
                                    </v-icon>
                                </v-avatar>  
                                სულ წონა - {{(manifest.total_weight/1000).toFixed(2)}} კგ
                            </v-chip>
                        </v-list-item>
                    </v-list>
                </v-col>
            </v-row>
        </v-container>
        <!-- manifest details -->

        <!-- items list -->
        <v-card-title class='ml-4'>
            <span class="text-h6">ამანათები მანიფესტში</span>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="items"
            class="elevation-1 overflow-y-auto mx-auto"
            fixed-header
            multi-sort
            no-data-text='მონაცემები არ არსებობს'
            no-results-text='მონაცემები ვერ მოიძებნა'
            :search="search"
            :loading='loadingItems'
            loading-text="მონაცემები იტვირთება"
            show-expand
            height="625px"
            hide-default-footer
            :footer-props="{
                    itemsPerPageOptions:[-1]
                }"
        >
            <template v-slot:item.actions="{ item }">
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
                    <span>მანიფესტის წაშლა მანიფესტიდან</span>
                </v-tooltip>
            </template>
            <template v-slot:item.document="{ item }">
            <v-icon
                medium
                class="ml-4"
                @click="showBarcode(item.id)"
                color='purple'
            >
                mdi-file-document-outline
            </v-icon>
            </template>
            <template v-slot:item.manifest_number="{ item }">
                <v-chip
                    v-if="!item.manifest_number"
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
            <template v-slot:expanded-item="{ item }">
                <td :colspan="headers.length">
                    
                </td>
            </template>
        </v-data-table>
        <!-- items list -->
        <!-- delete dialog -->
        <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
            <v-card-title class="text-h6">ნამდვილად გსურთ მონიშნული ამანათის/ამანათების წაშლა მანიფესტიდან?</v-card-title>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" outlined @click="closeDelete">არა</v-btn>
            <v-btn color="red" outlined @click="removeItem">დიახ</v-btn>
            <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
        </v-dialog>
        <!-- delete dialog -->
    </v-card>
</template>

<script>
import axios from 'axios'
import router from "../router/index";

export default {
    name: 'ManifestDetail',
    components: {

    },
    props: [
        'manifestID'
    ],
    data: ()=>({
        manifest: {},
        loadingItems: true,
        dialogDelete: false,
        errorM: '',
        selectItem: '',
        items: [],
        search: '',
        headers: [
          {
            text: 'ID',
            align: 'start',
            filterable: false,
            value: 'id',
          },
          { text: 'ბარკოდი', value: 'barcode' },
          { text: 'ავტორი', value: 'owner' },
          { text: 'მანიფესტის კოდი', value: 'manifest_number' },
          { text: 'კომპანია', value: 'company' },
          { text: 'გამ. ქალაქი', value: 'sender_city' },
          { text: 'მიმღების ID', value: 'receiver_id' },
          { text: 'წაშლა', value: 'actions', sortable: false },
          { text: 'ინვოისი', value: 'document', sortable: false },
          { text: '', value: 'data-table-expand' },
        ],
    }),

    methods: {
        getManifest(){
            let accessToken = JSON.parse(sessionStorage.getItem('access'))
            const baseURL = `http://127.0.0.1:8000/manifest/${this.manifestID}`;
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
                this.manifest = response.data
                this.items = response.data.items
                this.loadingItems = false
                console.log(response.data.items)
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
        // removes selected item from manifest
        removeItem () {
            let accessToken = JSON.parse(sessionStorage.getItem('access'))
            const baseURL = `http://127.0.0.1:8000/items/update/${this.selectItem}`;
            const options = {
                method: 'PATCH',
                baseURL: baseURL,
                timeout: 5000,
                headers: {
                    Authorization: 'Bearer ' + accessToken.value
                },
                data: {manifest_number: null},
            };
            axios(options)
            .then((response) => {
                console.log(response)
                this.$toast.success('ამანათი ამოღებულია მანიფესტიდან', {
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
                this.getManifest()
                this.dialogDelete = false
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
        showBarcode(item){
            let accessToken = JSON.parse(sessionStorage.getItem('access'))
            const baseURL = `http://127.0.0.1:8000/items/generate-pdf/${item}`;
            const options = {
                method: 'GET',
                baseURL: baseURL,
                timeout: 5000,
                responseType: "blob",
                headers: {
                    Authorization: 'Bearer ' + accessToken.value
                }, 
            };
            axios(options)
            .then((response) => {
                console.log(response)
                const blob = new Blob([response.data],{type: 'application/pdf'});
                const objectUrl = URL.createObjectURL(blob);
                this.pdfsrc = objectUrl;
                let tab = window.open();
                tab.location.href = objectUrl;
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
        closeManifestDetail(){
            this.$emit('closeManifestDetail')
        },
        logout() {
            axios.post('http://127.0.0.1:8000/api/logout/', {
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
        // opens delete dialog bar and assigns item id to newSelected data
        deleteItem (item) {
            this.dialogDelete = true
            this.selectItem = item.id
            this.newSelected = []
        },
        // closes delete dialog bar 
        closeDelete () {
            this.dialogDelete = false
            this.newSelected = ''
        },
    },
    mounted(){
        this.getManifest()
    }
}
</script>
