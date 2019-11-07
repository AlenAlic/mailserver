<template>
  <modal-wrapper modalClass="modal" :modalName="name" @modalWasClosed="cleanUp()">
    <form class="form" @submit.prevent>
      <div class="modal__header">
        <h3>Update alias</h3>
      </div>
      <div class="form__group">
        <label class="form__label" for="source">
          Source
        </label>
        <input class="form__input--text" type="text" id="source" v-model="source" />
      </div>
      <div class="form__group">
        <label class="form__label" for="destination">
          Destination
        </label>
        <input class="form__input--text" type="text" id="destination" v-model="destination" />
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
        <loading-button class="button--cta" @click.native="updateAlias()" :loading="loading">
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
import { ALIASES_UPDATE } from "@/store/modules/mail";
import { mapState } from "vuex";

export default {
  name: "update-virtual-alias-modal",
  components: { LoadingButton, ModalWrapper },
  props: {
    defaultAlias: Object,
    defaultSource: String,
    defaultDestination: String,
    defaultDomain: Number
  },
  data: function() {
    return {
      name: "update-virtual-alias-modal",
      source: this.defaultSource,
      destination: this.defaultDestination,
      domain: this.defaultDomain
    };
  },
  computed: {
    complete: function() {
      return this.domain > 0 && this.$util.isEmail(this.destination);
    },
    ...mapState({
      loading: state => state.mail.loading_aliases,
      virtual_domains: state => state.mail.domains
    })
  },
  watch: {
    defaultSource: function(newVal) {
      this.source = newVal;
    },
    defaultDestination: function(newVal) {
      this.destination = newVal;
    },
    defaultDomain: function(newVal) {
      this.domain = newVal;
    }
  },
  methods: {
    updateAlias: function() {
      this.$store
        .dispatch(ALIASES_UPDATE, {
          id: this.defaultAlias.id,
          source: this.source,
          destination: this.destination,
          domain: this.domain
        })
        .then(() => {
          this.$notify.info("Alias updated");
        })
        .catch(() => {
          this.$notify.error("Could not update alias");
        });
    },
    cleanUp: function() {
      this.source = this.defaultSource;
      this.destination = this.defaultDestination;
      this.domain = this.defaultDomain;
      this.$modal.hide(this.name);
    }
  }
};
</script>
