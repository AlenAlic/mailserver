<template>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <ul>
          <li class="nav__item">
            <router-link :to="{ name: 'dashboard' }" class="nav__link">
              {{ $t("menu.dashboard") }}
            </router-link>
          </li>
          <li class="nav__item">
            <router-link :to="{ name: 'styleguide' }" class="nav__link">
              {{ $t("menu.styleguide") }}
            </router-link>
          </li>
          <li class="nav__item--mobile">
            <button @click="signOut" class="nav__link">
              {{ $t("menu.signout") }}
            </button>
          </li>
        </ul>
      </nav>

      <button @click="signOut" class="header__logout">
        {{ $t("menu.signout") }}
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  methods: {
    signOut: function() {
      this.$auth.signOut().then(() => {
        this.$router.replace({
          name: "sign-in"
        });
      });
    }
  }
};
</script>
