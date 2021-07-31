import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import vueCountryRegionSelect from 'vue-country-region-select'
import VueSignaturePad from 'vue-signature-pad';

Vue.use(VueSignaturePad);


Vue.use(vueCountryRegionSelect)


const options = {
    transition: "Vue-Toastification__fade",
    maxToasts: 5,
    newestOnTop: true
};

Vue.use(Toast, options);


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
