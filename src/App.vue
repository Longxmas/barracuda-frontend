<template>
  <v-app>
    <v-app-bar
        app
        color="bg"
        dark
        hide-on-scroll
    >
      <div class="d-flex align-center">
        <v-spacer></v-spacer>
        <a href="/home">
          <v-img
              alt="Vuetify Logo"
              class="shrink mr-2"
              contain
              src="./assets/mm7.png"
              transition="scale-transition"
              width="150"
          />
        </a>


      </div>


    </v-app-bar>


    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({}),

  mounted() {
    window.onscroll = () => {
      this.changeColor();
    };
  },
  methods: {
    changeColor() {
      if (
          document.body.scrollTop > 100 ||
          document.documentElement.scrollTop > 100
      ) {
        this.bg = 'white';
      } else {
        this.bg = 'transparent';
      }
    },
  },
};
</script>

<style>

</style>