<template>
  <modal-wrapper modalClass="modal--small" :modalName="name">
    <div class="modal__header">
      <h3>Delete {{ domain_name }}</h3>
    </div>
    <div class="modal__content">Are you sure you wish to delete this {{ domain_name }}?</div>
    <div class="modal__footer">
      <loading-button class="button--cta" @click.native="deleteDomain()" :loading="loading">
        Yes
      </loading-button>
      <button class="button--alt" type="button" @click="$modal.hide(name)">
        Cancel
      </button>
    </div>
  </modal-wrapper>
</template>

<script>
import ModalWrapper from "@/components/general/ModalWrapper";
import LoadingButton from "@/components/general/LoadingButton";
import { DOMAINS_DELETE } from "@/store/modules/mail";
import { mapState } from "vuex";

export default {
  name: "delete-virtual-domain-modal",
  components: { ModalWrapper, LoadingButton },
  props: {
    domain: Object
  },
  data: function() {
    return {
      name: "delete-virtual-domain-modal"
    };
  },
  computed: {
    domain_name: function() {
      return this.domain ? this.domain.name : "";
    },
    ...mapState({
      loading: state => state.mail.loading_domains
    })
  },
  methods: {
    deleteDomain: function() {
      this.$store
        .dispatch(DOMAINS_DELETE, { id: this.domain.id })
        .then(() => {
          this.$modal.hide(this.name);
          this.$notify.info(`${this.domain.name} deleted.`);
        })
        .catch(() => {
          this.$notify.error(`Could not delete ${this.domain.name}.`);
        });
    }
  }
};
</script>
