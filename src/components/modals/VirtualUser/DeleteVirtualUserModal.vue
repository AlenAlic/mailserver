<template>
  <modal-wrapper modalClass="modal--small" :modalName="name">
    <div class="modal__header">
      <h3>Delete {{ user_name }}</h3>
    </div>
    <div class="modal__content">Are you sure you wish to delete this {{ user_name }}?</div>
    <div class="modal__footer">
      <loading-button class="button--cta" @click.native="deleteUser()" :loading="loading">
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
import { USERS_DELETE } from "@/store/modules/mail";
import { mapState } from "vuex";

export default {
  name: "delete-virtual-user-modal",
  components: { ModalWrapper, LoadingButton },
  props: {
    user: Object
  },
  data: function() {
    return {
      name: "delete-virtual-user-modal"
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
    deleteUser: function() {
      this.$store
        .dispatch(USERS_DELETE, {
          id: this.user.id
        })
        .then(() => {
          this.$modal.hide(this.name);
          this.$notify.info(`${this.user.email} deleted.`);
        })
        .catch(() => {
          this.$notify.error(`Could not delete ${this.user.email}.`);
        });
    }
  }
};
</script>
