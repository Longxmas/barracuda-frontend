<template>
  <v-app>
    <v-app-bar
        app
        color="bg"
        dark
        hide-on-scroll
    >
      <v-container>
        <v-row justify="space-between">
          <v-col class="align-center" style="max-width: 200px; padding-top: 30px">
            <a href="/home">
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
                <a href="/movie" style="width: 80px; text-decoration: none; color: yellow">
                  <v-card-text class="text-center text-h6" style="padding-top: 25px">
                    电影
                  </v-card-text>
                </a>
              </v-card>
          </v-col>

          <v-col style="max-width: 100px">
              <v-card style="background-color: transparent" flat width="100px">
                <a href="/actor" style="width: 80px; text-decoration: none; color: yellow">
                <v-card-text class="text-center text-h6" style="padding-top: 25px">
                  人物
                </v-card-text>
                </a>
              </v-card>

          </v-col>

          <v-col style="max-width: 100px">

              <v-card style="background-color: transparent" flat width="100px">
                <a href="/review" style="width: 80px; text-decoration: none; color: yellow">
                <v-card-text class="text-center text-h6" style="padding-top: 25px">
                  影评
                </v-card-text>
                </a>
              </v-card>

          </v-col>

          <v-spacer></v-spacer>

          <v-col style="max-width: 100px">
            <v-card style="background-color: transparent" flat width="100px">
              <v-card-actions style="padding-top: 20px">
                <v-btn color="red">
                登录
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col style="max-width: 100px">
            <v-card style="background-color: transparent" flat width="100px">
              <v-card-actions style="padding-top: 20px">
                <v-btn color="blue">
                  注册
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col style="max-width: 100px">
            <v-card style="background-color: transparent" flat width="100px">
              <v-card-text>
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

</style>