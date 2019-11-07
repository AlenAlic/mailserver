<template>
  <modal-wrapper modalClass="modal--small" :modalName="name">
    <div class="modal__header">
      <h3>Delete alias</h3>
    </div>
    <div class="modal__content">
      Are you sure you wish to delete the alias<br />
      {{ source }} -> {{ destination }}?
    </div>
    <div class="modal__footer">
      <loading-button class="button--cta" @click.native="deleteAlias()" :loading="loading">
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
import { ALIASES_DELETE } from "@/store/modules/mail";
import { mapState } from "vuex";

export default {
  name: "delete-virtual-alias-modal",
  components: { ModalWrapper, LoadingButton },
  props: {
    alias: Object
  },
  data: function() {
    return {
      name: "delete-virtual-alias-modal"
    };
  },
  computed: {
    source: function() {
      return this.alias ? this.alias.source : "";
    },
    destination: function() {
      return this.alias ? this.alias.destination : "";
    },
    ...mapState({
      loading: state => state.mail.loading_aliases
    })
  },
  methods: {
    deleteAlias: function() {
      this.$store
        .dispatch(ALIASES_DELETE, { id: this.alias.id })
        .then(() => {
          this.$modal.hide(this.name);
          this.$notify.info("Alias deleted.");
        })
        .catch(() => {
          this.$notify.error("Could not delete alias.");
        });
    }
  }
};
</script>
