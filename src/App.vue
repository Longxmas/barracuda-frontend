<template>
  <v-app>
    <v-app-bar
        app
        color="bg"
        dark
        hide-on-scroll
    >
      <v-container fluid>
        <v-row justify="space-between">
          <v-col class="align-center" style="max-width: 200px; padding-top: 35px">
            <a href="/">
              <v-img
                  alt="MeetMovies Logo"
                  class="shrink mr-2"
                  contain
                  src="./assets/mm7.png"
                  transition="scale-transition"
                  width="150"
              />
            </a>
          </v-col>

          <v-col style="max-width: 100px">
            <v-card style="background-color: transparent" flat width="100px">
              <a href="/allMovie" style="width: 80px; text-decoration: none; color: #ff8d1a;">
                <v-card-text class="text-center text-h6" style="padding-top: 30px;">
                  <p style="font-family: YouSheBiaoTi,sans-serif; font-size: 23.5px">电影</p>
                </v-card-text>
              </a>
            </v-card>
          </v-col>

          <v-col style="max-width: 100px">
            <v-card style="background-color: transparent" flat width="100px">
              <a href="/allActor" style="width: 80px; text-decoration: none; color: #ff8d1a;">
                <v-card-text class="text-center text-h6" style="padding-top: 30px;">
                  <p style="font-family: YouSheBiaoTi,sans-serif; font-size: 23.5px">人物</p>
                </v-card-text>
              </a>
            </v-card>
          </v-col>

          <v-col style="max-width: 100px">

              <v-card style="background-color: transparent" flat width="100px">
                <a href="/review" style="width: 80px; text-decoration: none; color: #ff8d1a;">
                <v-card-text class="text-center text-h6" style="padding-top: 30px;">
                  <p style="font-family: YouSheBiaoTi,sans-serif; font-size: 23.5px">影评</p>
                </v-card-text>
                </a>
              </v-card>

          </v-col>

          <v-spacer></v-spacer>

          <v-col style="max-width: 100px">
            <v-card style="background-color: transparent" flat width="100px">
              <a href="/login" style="width: 80px; text-decoration: none; color: #ff8d1a;">
                <v-card-text class="text-center text-h6" style="padding-top: 30px;">
                  <p style="font-family: YouSheBiaoTi,sans-serif; font-size: 23.5px">登录</p>
                </v-card-text>
              </a>
            </v-card>
          </v-col>

          <v-col style="max-width: 100px">
            <v-card style="background-color: transparent" flat width="100px">
              <a href="/register" style="width: 80px; text-decoration: none; color: #ff8d1a;">
                <v-card-text class="text-center text-h6" style="padding-top: 30px;">
                  <p style="font-family: YouSheBiaoTi,sans-serif; font-size: 23.5px">注册</p>
                </v-card-text>
              </a>
            </v-card>
          </v-col>

          <v-col style="max-width: 100px">
            <v-card style="background-color: transparent" flat width="100px">
              <v-card-text style="padding-top: 21.5px;">
                <v-btn icon @click="searchBox = !searchBox">
                  <v-icon>
                    mdi-movie-search
                  </v-icon>
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <template v-slot:extension v-if="searchBox">
        <v-text-field></v-text-field>
        <v-btn icon>
          <v-icon>
            mdi-movie-search
          </v-icon>
        </v-btn>
      </template>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data () {
    return {
      searchBox: false,
    }
  },

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

@font-face {
  /* font-properties */
  font-family: 'YouSheBiaoTi';
  src:url('assets/fonts/youshebiaoti.ttf');
}

.title-text {
  padding-top: 25px ;
  font-family: YouSheBiaoTi,sans-serif;
}

</style>