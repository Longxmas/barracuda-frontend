<template>
  <div id="app">
    <v-app>
        <v-app-bar
            app
            color="bg"
            dark
            hide-on-scroll
            absolute
        >
          <v-container fluid>
            <v-row>
              <v-col cols="2" align-self="center">
                <a href="/">
                  <v-img
                      class="mx-auto"
                      alt="MeetMovies Logo"
                      src="./assets/mm8.png"
                      transition="scale-transition"
                      :aspect-ratio="372/107"
                      max-width="150px"
                      contain
                  />
                </a>
              </v-col>

              <v-col cols="1" class="mx-0 pl-0" align-self="center">
                <v-card style="background-color: transparent" flat class="mt-0">
                  <a href="/movie" style="width: 80px; text-decoration: none; color: #ff8d1a;">
                    <v-card-text class="text-center text-h6" style="padding-top: 30px; width: 80px">
                      <p style="font-family: YouSheBiaoTi,sans-serif; font-size: 23px">电影</p>
                    </v-card-text>
                  </a>
                </v-card>
              </v-col>

              <v-col cols="1" class="mx-0 pl-0" align-self="center">
                <v-card style="background-color: transparent" flat>
                  <a href="/actor" style="width: 80px; text-decoration: none; color: #ff8d1a;">
                    <v-card-text class="text-center text-h6" style="padding-top: 30px; width: 80px">
                      <p style="font-family: YouSheBiaoTi,sans-serif; font-size: 23px">人物</p>
                    </v-card-text>
                  </a>
                </v-card>
              </v-col>

              <v-col cols="1" class="mx-0 pl-0" align-self="center">
                <v-card style="background-color: transparent" flat>
                  <a href="/review" style="width: 80px; text-decoration: none; color: #ff8d1a;">
                    <v-card-text class="text-center text-h6" style="padding-top: 30px; width: 80px">
                      <p style="font-family: YouSheBiaoTi,sans-serif; font-size: 23px">影评</p>
                    </v-card-text>
                  </a>
                </v-card>

              </v-col>

              <v-col cols="1" class="mx-0 pl-0" align-self="center">
                <v-card style="background-color: transparent" flat>
                  <a href="/allgroup" style="width: 80px; text-decoration: none; color: #ff8d1a;">
                    <v-card-text class="text-center text-h6" style="padding-top: 30px; width: 120px">
                      <p style="font-family: YouSheBiaoTi,sans-serif; font-size: 23px">兴趣小组</p>
                    </v-card-text>
                  </a>
                </v-card>

              </v-col>

              <v-spacer></v-spacer>

              <v-col cols="1" class="mx-0" align-self="center">
                <v-card style="background-color: transparent" flat>
                  <a href="/login" style="width: 80px; text-decoration: none; color: #ff8d1a;">
                    <v-card-text class="text-center text-h6" style="padding-top: 30px; width: 80px">
                      <p style="font-family: YouSheBiaoTi,sans-serif; font-size: 23px">登录</p>
                    </v-card-text>
                  </a>
                </v-card>
              </v-col>

              <v-col cols="1" class="mx-0" align-self="center">
                <v-card style="background-color: transparent" flat>
                  <a href="/register" style="width: 80px; text-decoration: none; color: #ff8d1a;">
                    <v-card-text class="text-center text-h6" style="padding-top: 30px; width: 80px">
                      <p style="font-family: YouSheBiaoTi,sans-serif; font-size: 23px">注册</p>
                    </v-card-text>
                  </a>
                </v-card>
              </v-col>

              <v-col cols="1" class="mx-0" align-self="center">
                <v-card style="background-color: transparent" flat>
                  <v-card-text style="padding-top: 15px;">
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

          <template v-slot:extension v-if="searchBox" >
            <v-text-field v-model="query"></v-text-field>
            <v-btn icon @click="searchNow">
              <v-icon>
                mdi-movie-search
              </v-icon>
            </v-btn>
          </template>

        </v-app-bar>
        <v-main>
          <router-view @showSearchBar="showSearchBar"/>
        </v-main>
    </v-app>
  </div>
</template>

<script>

export default {
  name: 'App',

  data () {
    return {
      query: '',
      searchBox: false,
    }
  },

  mounted() {
    window.onscroll = () => {
      this.changeColor();
    };
  },
  methods: {
    searchNow() {
      this.$router.push('/search/movie?query=' + this.query);
    },
    showSearchBar(query_word) {
      this.searchBox = true;
      this.query = query_word;
    },
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

@font-face {
  /* font-properties */
  font-family: 'consensus';
  src:url('assets/fonts/consensus-bold.otf');
}

@font-face {
  /* font-properties */
  font-family: 'gotham-bold';
  src:url('assets/fonts/gotham-bold.otf');
}

@font-face {
  /* font-properties */
  font-family: 'source-sans-pro-bold';
  src:url('assets/fonts/SourceSansPro-Bold.ttf');
}

h3 {
  color: black;
}

h2 {
  color: black;
}

html,
body {
  height: 100%;
  width: 100%;
}

#app {
  min-width: 800px; /* 设置的最小宽度，小于1024时，会出现滚动条*/
  overflow-x: scroll;
}

</style>