<template>
  <div class="wrapper" id="app">
    <Header v-if="$auth.isAuthenticated()"></Header>
    <main class="main">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import "@mdi/font/css/materialdesignicons.css";
import Header from "@/components/general/Header";

export default {
  name: "App",
  components: { Header }
};
</script>

<style src="./assets/css/styles.scss" lang="scss"></style>
