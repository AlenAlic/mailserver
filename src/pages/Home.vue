<template>
  <div v-if="!$auth.isAuthenticated()" class="login">
    <login-card></login-card>
  </div>
</template>

<script>
import LoginCard from "@/components/auth/LoginCard";
export default {
  name: "Home",
  components: {
    LoginCard
  }
};
</script>

<style scoped>
.login {
  min-height: 100%;
  height: 100%;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  justify-content: center;
}
</style>
