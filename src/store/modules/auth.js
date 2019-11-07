import { AuthenticatedUser, authApi } from "@/api/auth";
import { saveServerToken, loadServerToken } from "@/api/util/token-storage";
import { backendServer } from "@/api/util/servers";

const SET_USER = "LOGIN: Set user";

const LOGIN = "LOGIN";
const LOGIN_REQUEST = "LOGIN: Login request sent.";
const LOGIN_SUCCESS = "LOGIN: Successful request.";
const LOGIN_ERROR = "LOGIN: Failed request.";

const LOGOUT = "LOGOUT";
const LOGOUT_REQUEST = "LOGOUT: Logout request sent.";
const LOGOUT_SUCCESS = "LOGOUT: Successful request.";
const LOGOUT_ERROR = "LOGOUT: Failed request.";

const ACTIVATE = "ACTIVATE";
const ACTIVATE_REQUEST = "ACTIVATE: Account activation request sent.";
const ACTIVATE_SUCCESS = "ACTIVATE: Successful request.";
const ACTIVATE_ERROR = "ACTIVATE: Failed request.";

export { LOGIN, LOGOUT, ACTIVATE };

export default {
  state: {
    user:
      loadServerToken(backendServer) != null
        ? new AuthenticatedUser(loadServerToken(backendServer))
        : null,
    loading: false
  },
  mutations: {
    [SET_USER](state, result) {
      state.user = new AuthenticatedUser(result);
      saveServerToken(backendServer, result);
    },

    [LOGIN_REQUEST](state) {
      state.loading = true;
    },
    [LOGIN_SUCCESS](state) {
      state.loading = false;
    },
    [LOGIN_ERROR](state) {
      state.loading = false;
    },

    [LOGOUT_REQUEST](state) {
      state.loading = true;
    },
    [LOGOUT_SUCCESS](state) {
      saveServerToken(backendServer, null);
      state.user = null;
      state.loading = false;
    },
    [LOGOUT_ERROR](state) {
      state.loading = false;
    },

    [ACTIVATE_REQUEST](state) {
      state.loading = true;
    },
    [ACTIVATE_SUCCESS](state) {
      state.loading = false;
    },
    [ACTIVATE_ERROR](state) {
      state.loading = false;
    }
  },
  actions: {
    // Sign a user in
    [LOGIN]({ commit }, { email, password, remember_me }) {
      commit(LOGIN_REQUEST);
      return authApi
        .login(email, password, remember_me)
        .then(resp => {
          commit(SET_USER, resp.data);
          commit(LOGIN_SUCCESS);
        })
        .catch(({ status }) => {
          commit(LOGIN_ERROR);
          throw { status };
        });
    },
    // Sign a user out
    [LOGOUT]: ({ commit }) => {
      commit(LOGOUT_REQUEST);
      return authApi
        .logout()
        .then(() => {
          commit(LOGOUT_SUCCESS);
        })
        .catch(error => {
          commit(LOGOUT_ERROR);
          throw { error };
        });
    },
    // Activate user account
    [ACTIVATE]: ({ commit }, { activation_token, password, repeat_password }) => {
      commit(ACTIVATE_REQUEST);
      return authApi
        .activate(activation_token, password, repeat_password)
        .then(() => {
          commit(ACTIVATE_SUCCESS);
        })
        .catch(({ status, errors }) => {
          commit(ACTIVATE_ERROR);
          throw { status, errors };
        });
    }
  },
  getters: {
    currentUser: state => {
      return state.user;
    },
    isAuthenticated: state => {
      return state.user != null && state.user.isValid;
    }
  }
};
