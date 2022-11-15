<template>
  <div id="searchMovieView">
    <h1> “{{this.$route.query.query}}” 的搜索结果</h1>
    <v-divider></v-divider>
    <v-container fluid>
      <v-row>
        <v-col lg="4"
               md="4"
               sm="6"
               xs="8" style="margin-top: 0;">
          <v-card
              class="mx-auto rounded-lg"
              max-width="300"
          >
            <v-card color="#01b4e4">
              <v-card-title>
                <h3 style="color: white">搜索结果</h3>
              </v-card-title>
            </v-card>
            <v-list>
              <v-list-item-group color="primary" v-model="choose_type">
                <v-list-item :href="'/search/movie?query=' + this.$route.query.query">
                  <v-list-item-content>
                    <v-container fluid>
                      <v-row align="center">
                        <v-col class="pt-0 pb-0">
                          <p class="pt-2">影片</p>
                        </v-col>
                        <v-col class="d-flex flex-row-reverse pt-0 pb-0">
                          <v-chip pill>114514</v-chip>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item :href="'/search/actor?query=' + this.$route.query.query">
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-container fluid>
                        <v-row align="center">
                          <v-col class="pt-0 pb-0">
                            <p class="pt-2">人物</p>
                          </v-col>
                          <v-col class="d-flex flex-row-reverse pt-0 pb-0">
                            <v-chip pill>114514</v-chip>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>

        <v-col lg="8"
               md="8"
               sm="6"
               xs="4" style="margin-top: 0;">
          <v-list style="margin: auto">
            <v-list-item
              v-for="(item, i) in movie_results"
              :key="i">
              <v-card elevation="5" class="mb-5" style="border-radius: 10px" width="100%">
                <v-card-text class="pa-0">
                  <v-container fluid >
                    <v-row>
                      <v-img :src="item.image" max-width="150px"
                             style="border-bottom-left-radius: 10px; border-top-left-radius: 10px"></v-img>
                      <v-col style="margin-left: 5px">
                        <v-container fluid>
                          <v-row>
                            <v-col>
                              <a>
                                <h3 style="font-family: 微软雅黑,serif;font-size: 20px;color: black; line-height: normal"
                                    class="ma-auto pa-0 ">{{item.name}}</h3>
                              </a>

                            </v-col>
                          </v-row>

                          <v-row>
                            <v-rating style="margin-top: 15px; margin-bottom: 15px"
                                      :value="4.5" color="amber" dense half-increments readonly size="14">
                            </v-rating>
                          </v-row>


                          <v-row class="pt-3">
                            <p style="text-overflow: ellipsis;
                                        overflow: hidden;
                                        display: -webkit-box;
                                        -webkit-box-orient: vertical;
                                        -webkit-line-clamp: 4;
                                        line-height: 20px;
                                        max-height: 80px;
                                        font-family: 微软雅黑,serif;
                                        font-size: 16px;
                                        color: black;">
                              {{item.overview}} </p>
                          </v-row>

                        </v-container>
                      </v-col>
                    </v-row>
                  </v-container>

                </v-card-text>
              </v-card>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'searchMovieView',
  mounted() {
    this.$emit('showSearchBar', this.$route.query.query);
  },
  data() {
    return {
      choose_type: 0,
      movie_results: [
        {
          id: 1,
          name: 'test',
          image: require('../assets/interstellar2.png'),
          overview: 'testtesttesttesttesttesttest'
        },
        {
          id: 2,
          name: 'test',
          image: require('../assets/interstellar2.png'),
          overview: 'testtesttesttesttesttesttest'
        },
        {
          id: 3,
          name: 'test',
          image: require('../assets/interstellar2.png'),
          overview: 'testtesttesttesttesttesttest'
        }
      ]
    }
  },
  methods: {
  },
  computed: {

  }
}
</script>