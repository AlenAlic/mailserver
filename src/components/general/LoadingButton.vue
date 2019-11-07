<template>
  <button :disabled="loading || disabled">
    <span v-if="loading" class="spinner_border--tiny"></span>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "LoadingButton",
  props: {
    loading: Boolean,
    disabled: Boolean
  }
};
</script>
