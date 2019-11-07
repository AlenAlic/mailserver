<template>
  <div class="form">
    <form v-on:submit.prevent class="form">
      <div class="form__group">
        <label class="form__label" for="email">
          Email
        </label>
        <input
          class="form__input--text"
          v-model="email"
          type="email"
          id="email"
          placeholder="Email"
        />
      </div>
      <div class="form__group">
        <label class="form__label" for="password">
          Password
        </label>
        <input
          class="form__input--text"
          v-model="password"
          type="password"
          id="password"
          placeholder="Password"
        />
      </div>
      <div class="form__group">
        <div class="checkbox is-inline">
          <input class="checkbox__cb" type="checkbox" id="remember_me" />
          <label class="checkbox__label" for="remember_me">
            Remember me
          </label>
        </div>
      </div>
      <button
        @click.prevent="login"
        :disabled="filled !== true"
        class="button--cta"
        :class="{ 'no-click': !filled }"
      >
        Login
      </button>
    </form>
    <a href="javascript:void(0);" @click.prevent="resetPassword">Forgot password?</a>
  </div>
</template>

<script>
import { ERROR_CODES } from "@/api/util/network-errors";
export default {
  name: "LoginCard",
  data: function() {
    return {
      email: "",
      password: "",
      rememberMe: false,
      errors: null,
      loading: false
    };
  },
  computed: {
    filled: function() {
      return this.email !== "" && this.password !== "";
    }
  },
  methods: {
    login: function() {
      this.error = null;
      this.loading = true;
      this.$auth
        .signInWithUsernameAndPassword(this.email, this.password, this.rememberMe)
        .then(() => {
          this.$router.push({
            name: "dashboard"
          });
        })
        .catch(({ status }) => {
          if (status === ERROR_CODES.CREDENTIALS)
            this.$notify.error("Invalid username or password.");
          else if (status === ERROR_CODES.FORBIDDEN)
            this.$notify.error("Account is inactive. Please contact the administrator.");
          else this.$notify.error("Unknown error.");
          this.loading = false;
        });
    },
    resetPassword: function() {
      this.$router.push({
        name: "reset_password"
      });
    }
  }
};
</script>

<style scoped lang="scss">
.form {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
</style>
