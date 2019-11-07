<template>
  <modal-wrapper modalClass="modal" :modalName="name" @modalWasClosed="cleanUp()">
    <form class="form" @submit.prevent>
      <div class="modal__header">
        <h3>Create domain</h3>
      </div>
      <div class="form__group">
        <label class="form__label" for="domain">
          Domain name
        </label>
        <input class="form__input--text" type="text" id="domain" v-model="domain" />
      </div>
      <div class="modal__footer">
        <loading-button
          class="button--cta"
          @click.native="createDomain()"
          :loading="loading"
          :disabled="domain.length === 0"
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
import { DOMAINS_CREATE } from "@/store/modules/mail";
import { mapState } from "vuex";

export default {
  name: "create-virtual-domain-modal",
  components: { LoadingButton, ModalWrapper },
  data: function() {
    return {
      name: "create-virtual-domain-modal",
      domain: ""
    };
  },
  computed: mapState({
    loading: state => state.mail.loading_domains
  }),
  methods: {
    createDomain: function() {
      this.$store
        .dispatch(DOMAINS_CREATE, { domain: this.domain })
        .then(() => {
          this.$notify.info(`${this.domain} added.`);
          this.cleanUp();
        })
        .catch(() => {
          this.$notify.error(`Could not add ${this.domain}.`);
        });
    },
    cleanUp: function() {
      this.domain = "";
      this.$modal.hide(this.name);
    }
  }
};
</script>
