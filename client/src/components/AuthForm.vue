<template>
  <v-container>
    <v-img
      alt="biGLogo"
      class="mx-auto mb-15 mt-5"
      contain
      src="../assets/hummaction.png"
      transition="scale-transition"
      width="50vw"
    />
    <v-form
      action="api/auth/login"
      method="post"
      class="authForm"
      @submit.prevent="login"
    >
      <p class="display-1">Authentification</p>
      <v-col cols="12" md="12">
        <v-text-field
          type="text"
          v-model="username"
          placeholder="Identifiant"
          required
        />
      </v-col>
      <v-col cols="12" md="12">
        <v-text-field
          type="password"
          v-model="password"
          placeholder="Mot de passe"
          required
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-btn
          type="submit"
          color="primary"
          class="button"
          elevation="5"
          @click="login()"
          large
        >
          Entrer
        </v-btn>
      </v-col>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: "AuthForm",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login: function () {
      let username = this.username;
      let password = this.password;
      this.$store
        .dispatch("login", { username, password })
        .then(() => this.$router.push("/home"))
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>
.authForm {
  border: 0.25vh solid #268ac4c0;
  text-align: center;
  align-content: center;
  width: min-content;
  padding: 4vw;
  margin: 0 auto;
}
.bigLogo {
  width: 50vw;
  margin: 0 auto;
}
.button {
  justify-content: center;
}
</style>