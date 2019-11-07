<template>
  <div class="block--small">
    <h2>{{ $t("page_not_found") }}</h2>
    <p>
      <router-link :to="{ name: 'sign-in' }" class="button--cta">
        {{ $t("navigation.go_back") }}
      </router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: "page-not-found"
};
</script>
