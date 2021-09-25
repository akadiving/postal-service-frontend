<template>
    <v-card elevation="1">
        <v-app-bar
            flat
            color="rgba(0, 0, 0, 0)"
          >
            <v-toolbar-title class="text-h6 text--primary">
              ექსელიდან ამანათების ატვირთვა
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-avatar>
                <v-icon x-large @click='closeComponent'>mdi-close</v-icon>
            </v-avatar>
        </v-app-bar>

        <v-card-text>
            <v-container fluid>
                <v-row justify="center">
                    <v-col cols="auto">
                        <v-card
                            v-ripple="{ class: `secondary--text`}"
                            elevation="0"
                            href="../assets/Sample Form.xlsx" download
                        >
                            <v-avatar
                            size="64"
                            tile
                            >
                            <v-img src="../assets/download.svg"></v-img>
                            </v-avatar>
                            <v-card-text>
                            <v-row align="center">
                                <v-col class="text-body2 text--primary"
                                cols="12">
                                ექსელის ნიმუში
                                </v-col>
                            </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="10">
                        <template>
                            <v-file-input
                                v-model="files"
                                color="deep-purple accent-4"
                                counter
                                label="აირჩიეთ ფაილი"
                                accept=".xlsx, .xls"
                                prepend-icon="mdi-paperclip"
                                outlined
                                :show-size="1000"
                            >
                                <template v-slot:selection="{ index, text }">
                                <v-chip
                                    v-if="index < 2"
                                    color="deep-purple accent-4"
                                    dark
                                    outlined
                                    label
                                    small
                                >
                                    {{ text }}
                                </v-chip>

                                <span
                                    v-else-if="index === 2"
                                    class="text-overline grey--text text--darken-3 mx-2"
                                >
                                    +{{ files.length - 2 }} File(s)
                                </span>
                                </template>
                            </v-file-input>
                        </template>
                    </v-col>
                    <v-col cols="auto">
                        <template>
                        <div class="text-center">
                            <v-btn
                                color="deep-purple"
                                outlined
                                class="ma-2"
                                @click="uploadExcel"
                                :disabled="!fileInput"
                                >
                                    ატვირთვა
                            </v-btn>
                            <v-btn
                                color="red"
                                outlined
                                class="ma-2"
                                @click="deleteItems"
                                >
                                    ამანათების ჭაშლა
                            </v-btn>
                            <v-dialog v-model="upload" 
                                persistent
                                hide-overlay
                                max-width="600"
                                v-if="upload"
                                >
                                <v-card color="white">
                                    <v-card-title>მიმდინარეობს ამანათების ატვირთვა</v-card-title>
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
                        </div>
                        </template>
                    </v-col>
                    <v-col cols="12">
                        <template v-if="items">
                        <v-simple-table fixed-header
                        height="400px">
                            <template v-slot:default>
                            <thead>
                                <tr>
                                <th class="text-center">
                                    ID
                                </th>
                                <th class="text-center">
                                    ბარკოდი
                                </th>
                                <th class="text-center">
                                    ამობეჭდვა
                                </th>
                                <th class="text-center">
                                    წაშლა
                                </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                v-for="item in items"
                                :key="item.barcode"
                                >
                                <td>{{ item.id }}</td>
                                <td>{{ item.barcode }}</td>
                                <td>
                                    <v-icon color="primary"
                                    @click="showBarcode(item.id)"
                                    >mdi-printer</v-icon>
                                </td>
                                <td>
                                    <v-icon color="red"
                                    @click="removeItem(item.id)"
                                    >mdi-delete</v-icon>
                                </td>
                                </tr>
                            </tbody>
                            </template>
                        </v-simple-table>
                        </template>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions>
        
        </v-card-actions>
    </v-card>  
</template>

<script>
import axios from 'axios'
import router from "../router/index";
import print from 'print-js'

export default {
    name: 'UploadExcel',
    components: {

    },
    data: ()=>({
        dialog: false,
        errorM: '',
        files: null,
        item_id: [],
        upload: false,
        items: [],
        current_item: null
    }),
    computed: {
        fileInput(){
            return this.files
        }
    },
    watch: {

    },
    methods: {
        close () {
            this.dialog = false
        },
        closeComponent(){
            this.$emit('closeComponent')
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
        deleteItems(){
            localStorage.removeItem('item_id')
            this.stickers()
        },
        removeItem(item){
            var arr = JSON.parse( localStorage.getItem('item_id'));
                const index = arr.indexOf(item);
                if (index > -1) {
                    arr.splice(index, 1);
                    console.log(arr)
                    localStorage.setItem('item_id', JSON.stringify(arr))
                }
                this.stickers()
        },
        uploadExcel(){
            this.upload = true
            let accessToken = JSON.parse(sessionStorage.getItem('access'))
            const baseURL = `http://127.0.0.1:8000/items/upload-excel/`;
            var data = new FormData();
            data.append('myfile', this.files);
            const options = {
                method: 'POST',
                baseURL: baseURL,
                data: data,
                headers: {
                    Authorization: 'Bearer ' + accessToken.value
                }, 
            };
            axios(options)
            .then((response) => {
                console.log(response)
                localStorage.setItem('item_id', JSON.stringify(response.data.item_id))
                this.item_id = response.data.item_id
                this.$toast.success(`${response.data.message}`, {
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
                this.stickers()
                this.upload = false
                this.dialog = true
                this.files = null
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
                this.upload = false
            })
        },
        stickers(){
            var arr = JSON.parse( localStorage.getItem('item_id'));
            this.item_id = arr
            console.log(this.item_id)
            let accessToken = JSON.parse(sessionStorage.getItem('access'))
            const baseURL = `http://127.0.0.1:8000/items/stickers/`;
            const options = {
                method: 'POST',
                baseURL: baseURL,
                data: {id: this.item_id},
                headers: {
                    Authorization: 'Bearer ' + accessToken.value
                }, 
            };
            axios(options)
            .then((response) => {
                console.log(response)
                this.items = response.data
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
        async showBarcode(item){
            this.barcodeDialog = true
            this.current_item = item
            let accessToken = JSON.parse(sessionStorage.getItem('access'))
            const baseURL = `http://127.0.0.1:8000/items/generate_sticker/${item}`;
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
                console.log(response)
                const blob =  new Blob([response.data],{type: 'application/pdf'});
                const objectUrl = URL.createObjectURL(blob);
                printJS(objectUrl);
                var arr = JSON.parse( localStorage.getItem('item_id'));
                const index = arr.indexOf(this.current_item);
                if (index > -1) {
                    arr.splice(index, 1);
                    console.log(arr)
                    localStorage.setItem('item_id', JSON.stringify(arr))
                }
                this.stickers()
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
        this.stickers()
        this.upload = false
    }  
}
</script>

<style scoped>

</style>