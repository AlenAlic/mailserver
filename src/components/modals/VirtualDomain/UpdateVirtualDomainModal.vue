<template>
  <modal-wrapper modalClass="modal" :modalName="name" @modalWasClosed="cleanUp()">
    <form class="form" @submit.prevent>
      <div class="modal__header">
        <h3>Update domain</h3>
      </div>
      <div class="form__group">
        <label class="form__label" for="domain">
          Domain name
        </label>
        <input class="form__input--text" type="text" id="domain" v-model="domain" />
      </div>
      <div class="modal__footer">
        <loading-button class="button--cta" @click.native="updateDomain()" :loading="loading">
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
import { DOMAINS_UPDATE } from "@/store/modules/mail";
import { mapState } from "vuex";

export default {
  name: "update-virtual-domain-modal",
  components: { LoadingButton, ModalWrapper },
  props: {
    defaultDomain: Object,
    defaultDomainName: String
  },
  data: function() {
    return {
      name: "update-virtual-domain-modal",
      domain: this.defaultDomainName
    };
  },
  computed: mapState({
    loading: state => state.mail.loading_domains
  }),
  watch: {
    defaultDomainName: function(newVal) {
      this.domain = newVal;
    }
  },
  methods: {
    updateDomain: function() {
      this.$store
        .dispatch(DOMAINS_UPDATE, { id: this.defaultDomain.id, domain: this.domain })
        .then(() => {
          this.$notify.info(`${this.domain} updated.`);
          this.cleanUp();
        })
        .catch(() => {
          this.$notify.error(`Could not update ${this.defaultDomainName}.`);
        });
    },
    cleanUp: function() {
      this.domain = this.defaultDomainName;
      this.$modal.hide(this.name);
    }
  }
};
</script>
