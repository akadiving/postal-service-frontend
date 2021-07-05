<template>
    <v-card elevation="1">
        <v-app-bar
            flat
            color="rgba(0, 0, 0, 0)"
          >
            <v-toolbar-title class="text-h6 text--primary">
              მანიფესტის დამატება
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-avatar>
                <v-icon x-large @click='closeComponent'>mdi-close</v-icon>
            </v-avatar>
          </v-app-bar>

        <!-- add item form -->
        <v-form v-model="valid">
            <v-container fill-height fluid>
            <v-row justify='start' align="center">
                <v-col
                cols="12"
                md="4"
                sm="6"
                >
                <v-autocomplete
                    class='elevation-0'
                    outlined
                    clearable
                    required
                    item-text="country"
                    item-value="country"
                    label="გამომგზავნი ქალაქი"
                    background-color="white"
                    :items="cities"
                    v-model="newManifest.receiver_country"
                    prepend-inner-icon="mdi-home-city"
                    ></v-autocomplete>

                </v-col>
                <v-col
                cols="12"
                md="4"
                sm="6"
                >
                <v-text-field
                    v-model="newManifest.receiver_city"
                    label="მიმღები ქალაქი"
                    required
                    outlined
                    prepend-inner-icon="mdi-home-city"
                    clearable
                ></v-text-field>
                </v-col>

                <v-col
                cols="12"
                md="4"
                sm="6"
                >
                <v-text-field
                    v-model="newManifest.cmr"
                    label="CMR კოდი"
                    required
                    outlined
                    prepend-inner-icon="mdi-code-equal"
                    clearable
                ></v-text-field>
                </v-col>

                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                    <v-text-field
                    v-model="newManifest.car_number"
                    :rules="receiverNumberRules"
                    label="მანქანის ნომერი"
                    required
                    outlined
                    prepend-inner-icon="mdi-car"
                    clearable
                    ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                    <v-text-field
                    v-model="newManifest.driver_name"
                    label="მძროლის სახელი"
                    required
                    outlined
                    prepend-inner-icon="mdi-account"
                    clearable
                    ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                    <v-text-field
                    v-model="newManifest.driver_surname"
                    label="მძღოლის გვარი"
                    required
                    outlined
                    prepend-inner-icon="mdi-account"
                    clearable
                    ></v-text-field>
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
                class="ma-2"
                v-bind="attrs"
                v-on="on"
                :disabled="!valid"    
                >
                    შენახვა
                </v-btn>
            </template>

            <v-card>
                <v-card-title>
                    <span class="text-h5">შეამოწმეთ მონაცემები დამატებამდე</span>
                </v-card-title>

                <v-card-text>
                    <v-container>
                    <v-row justify='center'>
                        <v-col
                        cols="12"
                        md="4"
                        sm="6"
                        >
                        <v-text-field
                            v-model="newManifest.sender_city"
                            label="გამომგზავნი ქალაქი"
                            readonly
                        ></v-text-field>
                        </v-col>

                        <v-col
                        cols="12"
                        md="4"
                        sm="6"
                        >
                        <v-text-field
                            v-model="newManifest.receiver_city"
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
                            v-model="newManifest.cmr"
                            label="CMR კოდი"
                            readonly
                            ></v-text-field>
                        </v-col>

                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-text-field
                            v-model="newManifest.car_number"
                            label="მანქანის ნომერი"
                            readonly
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    </v-container>
                </v-card-text>
                <v-divider class='mb-4'></v-divider>
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
                    @click='addManifest'
                >
                    დამახსოვრება
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
        </div>
        </template>
        <!-- add item preview -->
        </v-card-actions>
    </v-card>  
</template>

<script>
import axios from 'axios'
import router from "../router/index";


export default {
    name: 'AddManifest',
    components: {

    },
    data: ()=>({
        valid: false,
        dialog: false,
        cities: [],
        errorM: '',
        newManifest: {
            sender_city: '',
            receiver_city: '',
            cmr: '',
            car_number: '',
            driver_name: '',
            driver_surname: '',
        },
        
        nameRules: [
            v => !!v || 'გთხოვთ შეიყვანოთ სახელი',
            v => v.length <= 150 || 'გთხოვთ შეამოკლოდ სახელი',
        ],
        weightRules: [
            v => /^-?\d*\.?\d*$/.test(v) || 'გთხოვთ შეიყვანოთ მხოლოდ რიცხვები',
        ],
        priceRules: [
            v => /^-?\d*\.?\d*$/.test(v) || 'გთხოვთ შეიყვანოთ მხოლოდ რიცხვები',
        ],
        receiverNumberRules: [
            v => /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/.test(v) || 'გთხოვთ სწორად შეიყვანოთ მანქანის ნომერი',
        ],
    }),
    computed: {
        
    },
    watch: {
        cities(val){
            this.getCities(val)
        }
    },
    methods: {
        addManifest(){
            console.log(this.newItem)
            let accessToken = JSON.parse(sessionStorage.getItem('access'))
            const baseURL = `https://postal-service-test.herokuapp.com/manifest/add/`;
            const options = {
                method: 'POST',
                baseURL: baseURL,
                timeout: 5000,
                data: this.newManifest,
                headers: {
                    Authorization: 'Bearer ' + accessToken.value
                }, 
            };
            axios(options)
            .then((response) => {
                console.log(response)
                this.$toast.success('მანიფესტი დამატებულია', {
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
        getCities(){
            const baseURL = `https://countriesnow.space/api/v0.1/countries`;
            const options = {
                method: 'GET',
                baseURL: baseURL,
                timeout: 5000,
                 
            };
            axios(options)
            .then(response => {
                console.log(response.data)

            })
        }
    },
    mounted(){

    }  
}
</script>

<style scoped>

</style>