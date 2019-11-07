// Main components
import Vue from "vue";
import App from "@/App.vue";
import AppNotLoaded from "@/AppNotLoaded";

// Main extension
import router from "@/router";
import store from "@/store";
import i18n from "@/languages";

// Import the config independent modules.
import VModal from "vue-js-modal";
import VueAxios from "vue-axios";
import Notify from "vue2-notify";
import { alert_options, alert_types } from "@/api/util/alerts";

// Service Worker
import "./registerServiceWorker";

// API calls
import { frontendApi } from "@/api/frontend";
import { backendServer } from "@/api/util/interceptors";
import AuthHandler from "@/components/auth/AuthHandler";
import UtilitiesHandler from "@/assets/js/utilities";

// Register the config independent modules.
Vue.use(VModal, { clickToClose: false });
Vue.use(AuthHandler);
Vue.use(UtilitiesHandler);
Vue.use(Notify, alert_options);
Vue.$notify.setTypes(alert_types);

// Turn oof Vue Production tip
Vue.config.productionTip = false;

// Mount App function
async function main() {
  try {
    const config = await frontendApi.fetchConfig().catch(err => {
      console.error("Failed to fetch config file");
      throw err;
    });

    /**
     * Define the $config property on Vue instances since it gets added by install
     * @class Vue
     * @property {AppConfig} $config
     */
    Vue.prototype.$config = config;
    Vue.prototype.$config.debug = config.debug || process.env.NODE_ENV === "development";

    // Set the baseURL according to the latest config and register the instance.
    backendServer.defaults.baseURL = Vue.prototype.$config.api.url;

    // Register the backend server as the Vue.axios instance.
    Vue.use(VueAxios, backendServer);

    new Vue({
      router,
      store,
      i18n,
      render: h => h(App)
    }).$mount("#app");
  } catch (error) {
    console.error(error);
    new Vue({
      el: "#app",
      render: h => h(AppNotLoaded)
    }).$mount("#app");
  }
}

// Mount App
main();
