import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import mail from "./modules/mail";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: auth,
    mail: mail
  }
});
