import Vue from "vue";

const DOMAINS_CREATE = "DOMAINS: Created new element";
const DOMAINS = "DOMAINS";
const DOMAINS_UPDATE = "DOMAINS: Updated element";
const DOMAINS_DELETE = "DOMAINS: Deleted element";
const DOMAINS_REQUEST = "DOMAINS: Request sent.";
const DOMAINS_SUCCESS = "DOMAINS: Successful request.";
const DOMAINS_ERROR = "DOMAINS: Failed request.";
const SET_DOMAINS = "DOMAINS: Set domains";

const USERS_CREATE = "USERS: Created new element";
const USERS = "USERS";
const USERS_UPDATE = "USERS: Updated element";
const USERS_DELETE = "USERS: Deleted element";
const USERS_REQUEST = "USERS: Request sent.";
const USERS_SUCCESS = "USERS: Successful request.";
const USERS_ERROR = "USERS: Failed request.";
const SET_USERS = "USERS: Set users";
const USERS_CHECK_PASSWORD = "USERS: Checking password";

const ALIASES_CREATE = "ALIASES: Created new element";
const ALIASES = "ALIASES";
const ALIASES_UPDATE = "ALIASES: Updated element";
const ALIASES_DELETE = "ALIASES: Deleted element";
const ALIASES_REQUEST = "ALIASES: Request sent.";
const ALIASES_SUCCESS = "ALIASES: Successful request.";
const ALIASES_ERROR = "ALIASES: Failed request.";
const SET_ALIASES = "ALIASES: Set aliases";

export {
  DOMAINS_CREATE,
  DOMAINS,
  DOMAINS_UPDATE,
  DOMAINS_DELETE,
  USERS_CREATE,
  USERS,
  USERS_UPDATE,
  USERS_DELETE,
  USERS_CHECK_PASSWORD,
  ALIASES_CREATE,
  ALIASES,
  ALIASES_UPDATE,
  ALIASES_DELETE
};

export default {
  state: {
    domains: [],
    loading_domains: false,
    users: [],
    loading_users: false,
    aliases: [],
    loading_aliases: false
  },
  mutations: {
    [SET_DOMAINS](state, result) {
      state.domains = result;
    },
    [DOMAINS_REQUEST](state) {
      state.loading_domains = true;
    },
    [DOMAINS_SUCCESS](state) {
      state.loading_domains = false;
    },
    [DOMAINS_ERROR](state) {
      state.loading_domains = false;
    },

    [SET_USERS](state, result) {
      state.users = result;
    },
    [USERS_REQUEST](state) {
      state.loading_users = true;
    },
    [USERS_SUCCESS](state) {
      state.loading_users = false;
    },
    [USERS_ERROR](state) {
      state.loading_users = false;
    },

    [SET_ALIASES](state, result) {
      state.aliases = result;
    },
    [ALIASES_REQUEST](state) {
      state.loading_aliases = true;
    },
    [ALIASES_SUCCESS](state) {
      state.loading_aliases = false;
    },
    [ALIASES_ERROR](state) {
      state.loading_aliases = false;
    }
  },
  actions: {
    [DOMAINS_CREATE]({ commit, dispatch }, { domain }) {
      commit(DOMAINS_REQUEST);
      return Vue.axios
        .post("/mail/virtual_domain", { domain: domain })
        .then(() => {
          commit(DOMAINS_SUCCESS);
          dispatch(DOMAINS);
        })
        .catch(() => {
          commit(DOMAINS_ERROR);
          throw { status };
        });
    },
    [DOMAINS]({ commit }) {
      commit(DOMAINS_REQUEST);
      return Vue.axios
        .get("/mail/virtual_domains")
        .then(res => {
          commit(DOMAINS_SUCCESS);
          commit(SET_DOMAINS, res.data);
        })
        .catch(() => {
          commit(DOMAINS_ERROR);
          throw { status };
        });
    },
    [DOMAINS_UPDATE]({ commit, dispatch }, { id, domain }) {
      commit(DOMAINS_REQUEST);
      return Vue.axios
        .patch("/mail/virtual_domain", { id: id, domain: domain })
        .then(() => {
          commit(DOMAINS_SUCCESS);
          dispatch(DOMAINS);
          dispatch(USERS);
          dispatch(ALIASES);
        })
        .catch(() => {
          commit(DOMAINS_ERROR);
          throw { status };
        });
    },
    [DOMAINS_DELETE]({ commit, dispatch }, { id }) {
      commit(DOMAINS_REQUEST);
      return Vue.axios
        .delete(`/mail/virtual_domain/${id}`)
        .then(() => {
          commit(DOMAINS_SUCCESS);
          dispatch(DOMAINS);
          dispatch(USERS);
          dispatch(ALIASES);
        })
        .catch(() => {
          commit(DOMAINS_ERROR);
          throw { status };
        });
    },

    [USERS_CREATE]({ commit, dispatch }, { email, password, domain }) {
      commit(USERS_REQUEST);
      return Vue.axios
        .post("/mail/virtual_user", {
          email: email,
          password: password,
          domain: domain
        })
        .then(() => {
          commit(USERS_SUCCESS);
          dispatch(USERS);
        })
        .catch(() => {
          commit(USERS_ERROR);
          throw { status };
        });
    },
    [USERS]: ({ commit }) => {
      commit(USERS_REQUEST);
      return Vue.axios
        .get("/mail/virtual_users")
        .then(res => {
          commit(USERS_SUCCESS);
          commit(SET_USERS, res.data);
        })
        .catch(() => {
          commit(USERS_ERROR);
          throw { status };
        });
    },
    [USERS_UPDATE]({ commit, dispatch }, { id, email, domain, password }) {
      commit(USERS_REQUEST);
      return Vue.axios
        .patch("/mail/virtual_user", {
          id: id,
          email: email,
          domain: domain,
          password: password
        })
        .then(() => {
          commit(USERS_SUCCESS);
          dispatch(USERS);
        })
        .catch(() => {
          commit(USERS_ERROR);
          throw { status };
        });
    },
    [USERS_DELETE]({ commit, dispatch }, { id }) {
      commit(USERS_REQUEST);
      return Vue.axios
        .delete(`/mail/virtual_user/${id}`)
        .then(() => {
          commit(USERS_SUCCESS);
          dispatch(USERS);
        })
        .catch(() => {
          commit(USERS_ERROR);
          throw { status };
        });
    },
    [USERS_CHECK_PASSWORD]({ commit }, { id, password }) {
      commit(USERS_REQUEST);
      return Vue.axios
        .post(`/mail/virtual_user/${id}/check_password`, { password: password })
        .then(() => {
          commit(USERS_SUCCESS);
        })
        .catch(() => {
          commit(USERS_ERROR);
          throw { status };
        });
    },

    [ALIASES_CREATE]({ commit, dispatch }, { source, destination, domain }) {
      commit(ALIASES_REQUEST);
      return Vue.axios
        .post("/mail/virtual_alias", {
          source: source,
          destination: destination,
          domain: domain
        })
        .then(() => {
          commit(ALIASES_SUCCESS);
          dispatch(ALIASES);
        })
        .catch(() => {
          commit(ALIASES_ERROR);
          throw { status };
        });
    },
    [ALIASES]: ({ commit }) => {
      commit(ALIASES_REQUEST);
      return Vue.axios
        .get("/mail/virtual_aliases")
        .then(res => {
          commit(ALIASES_SUCCESS);
          commit(SET_ALIASES, res.data);
        })
        .catch(() => {
          commit(ALIASES_ERROR);
          throw { status };
        });
    },
    [ALIASES_UPDATE]: ({ commit, dispatch }, { id, source, destination, domain }) => {
      commit(ALIASES_REQUEST);
      return Vue.axios
        .patch("/mail/virtual_alias", {
          id: id,
          source: source,
          destination: destination,
          domain: domain
        })
        .then(() => {
          commit(ALIASES_SUCCESS);
          dispatch(ALIASES);
        })
        .catch(() => {
          commit(ALIASES_ERROR);
          throw { status };
        });
    },
    [ALIASES_DELETE]({ commit, dispatch }, { id }) {
      commit(ALIASES_REQUEST);
      return Vue.axios
        .delete(`/mail/virtual_alias/${id}`)
        .then(() => {
          commit(ALIASES_SUCCESS);
          dispatch(ALIASES);
        })
        .catch(() => {
          commit(ALIASES_ERROR);
          throw { status };
        });
    }
  }
};
