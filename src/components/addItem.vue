<template>
    <v-card elevation="1">
        <v-app-bar
            flat
            color="rgba(0, 0, 0, 0)"
          >
            <v-toolbar-title class="text-h6 text--primary">
              ამანათის დამატება
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-avatar >
                <v-icon x-large @click='closeComponent'>mdi-close</v-icon>
            </v-avatar>
        </v-app-bar>

        <!-- add item form -->
        <v-form v-model="valid">
            <v-container fill-height fluid>
                <v-icon large color="purple">
                    mdi-card-account-details-outline
                </v-icon>
                <v-card-title>
                    მიმღები და გამომგზავნი პირის ინფორმაცია
                </v-card-title>
            <v-row justify='start' align="center">
                <v-col
                cols="12"
                md="4"
                sm="6"
                >
                <v-text-field
                    v-model="newItem.sender_name"
                    :rules="nameRules"
                    label="გამომგზავნის სახელი"
                    required
                    clearable
                    outlined
                ></v-text-field>
                </v-col>

                <v-col
                cols="12"
                md="4"
                sm="6"
                >
                <v-text-field
                    v-model="newItem.sender_surname"
                    :rules="nameRules"
                    label="გამომგზავნის გვარი"
                    required
                    clearable
                    outlined
                ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                    <v-text-field
                    v-model="newItem.receiver_name"
                    label="მიმღების სახელი"
                    clearable
                    outlined
                    ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                    <v-text-field
                    v-model="newItem.receiver_surname"
                    label="მიმღების გვარი"
                    clearable
                    outlined
                    ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                    <v-text-field
                    v-model="newItem.receiver_id"
                    label="მიმღების ID"
                    clearable
                    outlined
                    ></v-text-field>
                </v-col>
                
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                    <v-text-field
                    v-model="newItem.receiver_number"
                    label="მიმღების ტელ.ნომერი"
                    :rules="receiverNumberRules"
                    clearable
                    prepend-inner-icon="mdi-phone"
                    outlined
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-divider></v-divider>

            
            <v-icon large color="purple">
                mdi-earth
            </v-icon>
            <v-card-title>
                მისამართი
            </v-card-title>
            <v-row justify='start' align="center" >
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                    <v-autocomplete
                    class='elevation-0'
                    outlined
                    clearable
                    required
                    item-text="country"
                    item-value="country"
                    label="გამომგზავნი ქვეყანა"
                    background-color="white"
                    :items="countries"
                    v-model="newItem.sender_country"
                    ></v-autocomplete>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                    <v-autocomplete
                    class='elevation-0'
                    outlined
                    clearable
                    required
                    item-text="country"
                    item-value="country"
                    label="მიმღები ქვეყანა"
                    background-color="white"
                    :items="countries"
                    v-model="newItem.receiver_country"
                    ></v-autocomplete>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                    <v-text-field
                    v-model="newItem.sender_city"
                    label="გამომგზავნი ქალაქი"
                    clearable
                    outlined
                    ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                    <v-text-field
                    v-model="newItem.receiver_city"
                    label="მიმღები ქალაქი"
                    clearable
                    outlined
                    ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                    <v-text-field
                    v-model="newItem.receiver_address"
                    label="მიმღების მისამართი"
                    clearable
                    outlined
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-divider></v-divider>
            
            <v-icon large color="purple">
                mdi-package-variant-closed
            </v-icon>
            <v-card-title>
                ამანათის ზოგადი ინფორმაცია
            </v-card-title>
            <v-row justify='start' align="center">
            <v-col
                cols="12"
                sm="6"
                md="4"
            >
                <v-text-field
                v-model="newItem.weight"
                label="წონა კგ."
                :rules="weightRules"
                clearable
                background-color="white"
                outlined
                prepend-inner-icon="mdi-weight-kilogram"
                ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                sm="6"
                md="4"
            >
                <v-text-field
                v-model="newItem.price"
                label="ფასი"
                :rules="priceRules"
                background-color="white"
                prepend-inner-icon="mdi-cash"
                clearable
                outlined
                ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                sm="6"
                md="4"
            >
                <v-autocomplete
                class='elevation-0'
                outlined
                clearable
                required
                item-text="cc"
                item-value="cc"
                label="ვალუტა"
                background-color="white"
                :items="currency"
                v-model="newItem.currency"
                :prefix="currency.symbol"
                ></v-autocomplete>
            </v-col>
            <v-col
                cols="12"
                sm="6"
                md="4"
            >
            <v-autocomplete
                outlined
                clearable
                hide-details
                background-color="white"
                required
                item-text="manifest_code"
                item-value="id"
                label="აირჩიეთ მანიფესტის კოდი"
                :items="manifestList"
                v-model="newItem.manifest_number"
                ></v-autocomplete>
            </v-col>
            <v-col
                cols="12"
                sm="6"
                md="4"
            >
                <v-textarea
                label="დამ. ინფორმაცია"
                value="ამანათის დამატებითი ინფორმაცია.."
                auto-grow
                clearable
                outlined
                background-color="white"
                :counter="500"
                v-model="newItem.description"
                ></v-textarea>
            </v-col>
            </v-row> 
            </v-container> 
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
        <!-- add item form -->
        
        <!-- add item preview -->   
        <template>
        <div class="text-center">
            <v-dialog
            v-model="dialog"
            width="500"
            >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                color="deep-purple"
                outlined
                class='ma-2'
                v-bind="attrs"
                v-on="on"
                :disabled="!valid"    
                >
                    შენახვა
                </v-btn>
            </template>

            <v-card>
                <v-card-title>
                    <span class="text-h5">შეამოწმეთ ამანათის მონაცემები დამატებამდე</span>
                </v-card-title>

                <v-card-text>
                    <v-container>
                    <v-row justify='center'>
                        <!-- user information -->
                        <v-col
                        cols="12"
                        md="4"
                        sm="6"
                        >
                        <v-text-field
                            :value="newItem.sender_name"
                            label="გამომგზავნის სახელი"
                            readonly
                        ></v-text-field>
                        </v-col>

                        <v-col
                        cols="12"
                        md="4"
                        sm="6"
                        >
                        <v-text-field
                            :value="newItem.sender_surname"
                            label="გამომგზავნის გვარი"
                            readonly
                        ></v-text-field>
                        </v-col>

                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-text-field
                            :value="newItem.receiver_name"
                            label="მიმღების სახელი"
                            readonly
                            ></v-text-field>
                        </v-col>

                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-text-field
                            :value="newItem.receiver_surname"
                            label="მიმღების გვარი"
                            readonly
                            ></v-text-field>
                        </v-col>

                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-text-field
                            :value="newItem.sender_country"
                            label="გამომგზავნი ქვეყანა"
                            readonly
                            ></v-text-field>
                        </v-col>

                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-text-field
                            :value="newItem.receiver_id"
                            label="მიმღების ID"
                            readonly
                            ></v-text-field>
                        </v-col>

                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-text-field
                            :value="newItem.receiver_number"
                            label="მიმღების ტელ.ნომერი"
                            readonly
                            ></v-text-field>
                        </v-col>
                        <!-- user information -->

                        <!-- location information -->
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-text-field
                            :value="newItem.sender_country"
                            label="გამომგზავნი ქვეყანა"
                            readonly
                            ></v-text-field>
                        </v-col>

                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-text-field
                            :value="newItem.receiver_country"
                            label="მიმღები ქვეყანა"
                            readonly
                            ></v-text-field>
                        </v-col>

                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-text-field
                            :value="newItem.sender_city"
                            label="გამომგზავნი ქალაქი"
                            readonly
                            ></v-text-field>
                        </v-col>

                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-text-field
                            :value="newItem.receiver_city"
                            label="მიმღები ქალაქი"
                            readonly
                            ></v-text-field>
                        </v-col>

                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-text-field
                            :value="newItem.receiver_address"
                            label="მიმღების მისამართი"
                            readonly
                            ></v-text-field>
                        </v-col>
                        <!-- location information -->

                        <!-- item information -->
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-text-field
                            :value="newItem.weight"
                            label="წონა კგ."
                            readonly
                            ></v-text-field>
                        </v-col>

                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-text-field
                            :value="newItem.price"
                            label="ფასი"
                            readonly
                            ></v-text-field>
                        </v-col>

                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-text-field
                            :value="newItem.currency"
                            label="ვალუტა"
                            readonly
                            ></v-text-field>
                        </v-col>

                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-text-field
                            :value="newItem.manifest_number"
                            label="მანიფესტის ID"
                            readonly
                            ></v-text-field>
                        </v-col>
                        
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-textarea
                            label="დამ. ინფორმაცია"
                            :value="newItem.description"
                            auto-grow
                            readonly
                            ></v-textarea>
                        </v-col>
                        <!-- item information -->
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
                    @click='addItem'
                >
                    დამახსოვრება
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
        </div>
        </template>
        <!-- add item preview -->

        <!-- sticker print dialog -->   
        <template>
            <div class="text-center">
                <v-dialog
                v-model="stickerDialog"
                width="300"
                >
                <v-card>
                    <v-card-title>
                        <span class="text-h5">სტიკერის ბეჭდვა</span>
                    </v-card-title>

                        <v-container>
                            <v-row justify='center'>
                                <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                    id="package"
                                >
                                    <v-card
                                        v-ripple="{ class: `secondary--text`}"
                                        @click='showBarcode(createdItem.id)'
                                        elevation="0"
                                    >
                                        
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-container>

                    <v-card-actions class='ml-12'>
                        <v-btn
                            flat
                            color="blue"
                            outlined
                            >
                            <v-icon
                            color="blue darken-2"
                            x-large>
                                mdi-printer
                            </v-icon>
                        </v-btn>
                        <v-btn
                            color="red"
                            outlined
                            @click="stickerDialog = false"
                        >
                            გამოსვლა
                        </v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </div>
        </template>
        <!-- sticker print dialog -->
        </v-card-actions>
    </v-card>  
</template>
<script>
import axios from 'axios'
import router from "../router/index";
import currency from '../currency.json'
import countries from '../data.json'

export default {
    name: 'AddItem',
    components: {

    },
        data: ()=>({
        valid: false,
        dialog: false,
        stickerDialog: false,
        newItem: {
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
            manifest_number: null,
            description: '',
        },
        manifestList: [],
        currency: currency,
        countries: countries, 
        nameRules: [
            v => !!v || 'გთხოვთ შეიყვანოთ სახელი',
            v => v.length <= 150 || 'გთხოვთ შეამოკლოდ სახელი',
        ],
        email: '',
        weightRules: [
            v => /^-?\d*\.?\d*$/.test(v) || 'გთხოვთ შეიყვანოთ მხოლოდ რიცხვები',
        ],
        priceRules: [
            v => /^-?\d*\.?\d*$/.test(v) || 'გთხოვთ შეიყვანოთ მხოლოდ რიცხვები',
        ],
        receiverNumberRules: [
            v => /^\d+$/.test(v) || 'გთხოვთ სწორად შეიყვანოთ ტელეფონის ნომერი',
        ],
        createdItem: [],
    }),

    methods: {
        addItem(){
            this.stickerDialog = false
            let accessToken = JSON.parse(sessionStorage.getItem('access'))
            const baseURL = `https://apimyposta.online/items/add/`;
            if (this.newItem.description == null){
                this.newItem.description = 'Personal Item'
            }
            let options = {
                method: 'POST',
                baseURL: baseURL,
                timeout: 5000,
                data: this.newItem,
                headers: {
                    Authorization: 'Bearer ' + accessToken.value
                }, 
            };
            axios(options)
            .then((response) => {
                this.createdItem = []
                this.createdItem = response.data
                this.stickerDialog = true
                this.$toast.success('ამანათი დამატებულია', {
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
                this.dialog = false
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
                    this.errorM = 'დაფიქსირდა შეცდომა, გთხოვთ სცადეთ თავიდან'
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
                this.dialog = false
            })
        },
        close () {
            this.dialog = false
        },
        closeComponent(){
            this.$emit('closeComponent')
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
        async showBarcode(item){
            this.barcodeDialog = true
            let accessToken = JSON.parse(sessionStorage.getItem('access'))
            const baseURL = `https://apimyposta.online/items/generate_sticker/${item}`;
            const options = {
                method: 'GET',
                baseURL: baseURL,
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
    },
    mounted(){
        this.manifestId()
    }  
}
</script>

<style scoped>


</style>