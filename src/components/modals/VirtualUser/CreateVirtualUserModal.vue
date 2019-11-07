<template>
  <modal-wrapper modalClass="modal" :modalName="name" @modalWasClosed="cleanUp()">
    <form class="form" @submit.prevent>
      <div class="modal__header">
        <h3>Create user</h3>
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
        <loading-button
          class="button--cta"
          @click.native="createUser()"
          :loading="loading"
          :disabled="!complete"
        >
          Add
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
import { USERS_CREATE } from "@/store/modules/mail";
import { mapState } from "vuex";

export default {
  name: "create-virtual-user-modal",
  components: { LoadingButton, ModalWrapper },
  data: function() {
    return {
      name: "create-virtual-user-modal",
      email: "",
      password: "",
      domain: 0
    };
  },
  computed: {
    complete: function() {
      return this.domain > 0 && this.email !== "" && this.password.length >= 12;
    },
    ...mapState({
      loading: state => state.mail.loading_users,
      virtual_users: state => state.mail.users,
      virtual_domains: state => state.mail.domains
    })
  },
  methods: {
    createUser: function() {
      this.$store
        .dispatch(USERS_CREATE, {
          email: this.email,
          password: this.password,
          domain: this.domain
        })
        .then(() => {
          this.$notify.info(`${this.email} added.`);
          this.cleanUp();
        })
        .catch(() => {
          this.$notify.error(`Could not add ${this.email}.`);
        });
    },
    cleanUp: function() {
      this.email = "";
      this.password = "";
      this.domain = 0;
      this.$modal.hide(this.name);
    }
  }
};
</script>
