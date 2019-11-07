<template>
  <modal
    :class="modalClass"
    :name="modalName"
    @before-open="beforeOpen"
    @opened="opened"
    @closed="closed"
    :clickToClose="false"
  >
    <a class="modal__close" type="button" @click="closeModal">
      <i class="mdi mdi-close"></i>
    </a>

    <slot></slot>
  </modal>
</template>

<script>
export default {
  name: "ModalWrapper",
  props: {
    modalName: String,
    modalClass: String
  },
  data: function() {
    return {
      name: "modal-wrapper"
    };
  },
  methods: {
    beforeOpen: function(event) {
      const documentBody = document.getElementsByTagName("body")[0];
      documentBody.classList.add("modal__open");
      this.$emit("before-open", event);
    },
    opened: function() {
      this.modalOpen = true;
      this.$emit("modalIsOpen", this.modalOpen);
    },
    closed: function() {
      const documentBody = document.getElementsByTagName("body")[0];
      documentBody.className = documentBody.classList.remove("modal__open");
      this.modalOpen = false;
      this.$emit("modalWasClosed", this.modalOpen);
    },
    closeModal: function() {
      this.$modal.hide(this.modalName);
    }
  }
};
</script>
