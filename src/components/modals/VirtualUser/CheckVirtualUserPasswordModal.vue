<template>
  <modal-wrapper modalClass="modal--small" :modalName="name" @modalWasClosed="cleanUp()">
    <form class="form" @submit.prevent>
      <div class="modal__header">
        <h3>Check password for {{ user_name }}</h3>
      </div>
      <div class="form__group">
        <label class="form__label" for="password">
          Password
        </label>
        <input class="form__input--text" type="password" id="password" v-model="password" />
      </div>
      <div class="modal__footer">
        <loading-button class="button--cta" @click.native="checkUserPassword()" :loading="loading">
          Check
        </loading-button>
      </div>
    </form>
  </modal-wrapper>
</template>

<script>
import ModalWrapper from "@/components/general/ModalWrapper";
import LoadingButton from "@/components/general/LoadingButton";
import { USERS_CHECK_PASSWORD } from "@/store/modules/mail";
import { mapState } from "vuex";

export default {
  name: "check-virtual-user-password-modal",
  components: { ModalWrapper, LoadingButton },
  props: {
    user: Object
  },
  data: function() {
    return {
      name: "check-virtual-user-password-modal",
      password: ""
    };
  },
  computed: {
    user_name: function() {
      return this.user ? this.user.email : "";
    },
    ...mapState({
      loading: state => state.mail.loading_users
    })
  },
  methods: {
    checkUserPassword: function() {
      this.$store
        .dispatch(USERS_CHECK_PASSWORD, {
          id: this.user.id,
          password: this.password
        })
        .then(() => {
          this.$notify.info("Password correct.");
          this.cleanUp();
        })
        .catch(() => {
          this.$notify.warning("Password incorrect.");
        });
    },
    cleanUp: function() {
      this.password = "";
      this.$modal.hide(this.name);
    }
  }
};
</script>
