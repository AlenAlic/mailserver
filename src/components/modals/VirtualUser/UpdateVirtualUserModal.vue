<template>
  <modal-wrapper modalClass="modal" :modalName="name" @modalWasClosed="cleanUp()">
    <form class="form" @submit.prevent>
      <div class="modal__header">
        <h3>Update user</h3>
      </div>
      <div class="form__group">
        <label class="form__label" for="email">
          Username
        </label>
        <input class="form__input--text" type="text" id="email" v-model="email" />
      </div>
      <div class="form__group">
        <label class="form__label" for="password">
          Password
        </label>
        <input class="form__input--text" type="password" id="password" v-model="password" />
      </div>
      <div class="form__group">
        <label class="form__label" for="domain">
          Domain
        </label>
        <div class="select">
          <select id="domain" v-model="domain">
            <option v-for="domain in virtual_domains" :key="domain.id" :value="domain.id">
              {{ domain.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="modal__footer">
        <loading-button class="button--cta" @click.native="updateUser()" :loading="loading">
          Save
        </loading-button>
        <button class="button--alt" type="button" @click="cleanUp()">
          Cancel
        </button>
      </div>
    </form>
  </modal-wrapper>
</template>

<script>
import ModalWrapper from "@/components/general/ModalWrapper";
import LoadingButton from "@/components/general/LoadingButton";
import { USERS_UPDATE } from "@/store/modules/mail";
import { mapState } from "vuex";

export default {
  name: "update-virtual-user-modal",
  components: { LoadingButton, ModalWrapper },
  props: {
    defaultUser: Object,
    defaultEmail: String,
    defaultDomain: Number
  },
  data: function() {
    return {
      name: "update-virtual-user-modal",
      email: this.defaultEmail,
      domain: this.defaultDomain,
      password: ""
    };
  },
  computed: {
    complete: function() {
      return (
        this.domain > 0 && this.email !== "" && (this.password.length >= 12 || this.password === "")
      );
    },
    ...mapState({
      loading: state => state.mail.loading_users,
      virtual_domains: state => state.mail.domains
    })
  },
  watch: {
    defaultEmail: function(newVal) {
      this.email = newVal;
    },
    defaultDomain: function(newVal) {
      this.domain = newVal;
    }
  },
  methods: {
    updateUser: function() {
      this.$store
        .dispatch(USERS_UPDATE, {
          id: this.defaultUser.id,
          email: this.email,
          domain: this.domain,
          password: this.password
        })
        .then(() => {
          this.$notify.info(`${this.email} updated.`);
          this.cleanUp();
        })
        .catch(() => {
          this.$notify.error(`Could not update ${this.defaultEmail}.`);
          this.email = this.defaultEmail;
          this.domain = this.defaultDomain;
        });
    },
    cleanUp: function() {
      this.password = "";
      this.email = this.defaultEmail;
      this.domain = this.defaultDomain;
      this.$modal.hide(this.name);
    }
  }
};
</script>
