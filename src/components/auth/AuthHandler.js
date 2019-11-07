import store from "@/store";
import { LOGIN, LOGOUT, ACTIVATE } from "@/store/modules/auth";

const AuthHandler = {
  install(Vue) {
    /**
     * Check if a user is signed in.
     * @param methodOptions
     * @returns Object or null
     */
    Vue.prototype.$auth = {
      currentUser() {
        return store.getters.currentUser;
      },
      isAuthenticated() {
        return store.getters.isAuthenticated;
      },

      /**
       * Sign in a user with a username and password.
       * @param email
       * @param password
       * @param remember_me
       * @returns {Promise<AuthenticatedUser>}
       */
      signInWithUsernameAndPassword(email, password, remember_me) {
        return store.dispatch(LOGIN, { email, password, remember_me });
      },

      /**
       * Activate an account using the activation token
       * @param {string} token
       * @param password
       * @param repeat_password
       * @returns {Promise<AuthenticatedUser>}
       */
      activate(token, password, repeat_password) {
        return store.dispatch(ACTIVATE, { token, password, repeat_password });
      },

      /**
       * Sign out the currently signed in user.
       * @returns {Promise}
       */
      signOut() {
        return store.dispatch(LOGOUT);
      }
    };
  }
};

export default AuthHandler;
