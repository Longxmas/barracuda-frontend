<template>
    <div id="mainView">
      <v-container fluid style="padding-top: 0">
        <v-card max-height="800px">
          <v-img src="../assets/mainpage_background.png" max-height="300px">
            <v-card-text class="home-search-box">
              <h1 style="color: white" class="main-h1">欢迎。</h1>
              <br>
              <h2 id ="main-h2" style="color: white" class="main-h2">这里有海量的电影、剧集和人物等你来发现。快来探索吧！</h2>
              <v-container fluid style="margin-top: 45px">
                <v-row>
                  <v-col cols="10" style="padding-left: 0">
                    <v-text-field
                        label="搜索电影、剧集、人物..."
                        solo
                        color="white"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-btn rounded color="warning" light large>
                      搜索
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-img>
        </v-card>
      </v-container>

      <v-container fluid>
        <v-row>
          <v-col col="3">
            <v-card elevation="0">
              <v-card-title>
                <h3>最新电影</h3>
              </v-card-title>
              <v-card-text>

                <v-sheet
                    class="mx-auto"
                    elevation="5">
                  <v-slide-group
                      class="pa-4"
                      center-active
                      show-arrows>
                    <v-slide-item
                        v-for="n in 5"
                        :key="n">
                      <v-card
                          outlined
                          >
                          <v-img
                              max-width="200px"
                              src="../assets/interstellar2.png"
                          ></v-img>
                        <v-card-text>
                          Fuck you
                        </v-card-text>
                      </v-card>
                    </v-slide-item>
                  </v-slide-group>
                </v-sheet>

              </v-card-text>
            </v-card>

            <v-divider></v-divider>

            <v-card>
              <v-card-title>
                <p>最热门电影</p>
              </v-card-title>
              <v-card-text>
                <v-sheet
                    class="mx-auto"
                    elevation="8">
                  <v-slide-group
                      class="pa-4"
                      center-active
                      show-arrows>
                    <v-slide-item
                        v-for="n in 5"
                        :key="n">
                      <v-card
                          outlined>
                        <v-img
                            max-width="200px"
                            src="../assets/interstellar2.png"
                        ></v-img>
                        <v-card-text>
                          Fuck you
                        </v-card-text>
                      </v-card>
                    </v-slide-item>
                  </v-slide-group>
                </v-sheet>
              </v-card-text>
              <v-card-actions>
                <v-btn>查看全部最热门电影</v-btn>
              </v-card-actions>
            </v-card>

            <v-divider></v-divider>

            <v-card>
              <v-card-title>最新影评</v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-item>
                    <v-card>
                      <v-card-text>
                        <v-container fluid>
                          <v-row>
                            <v-img src="../assets/interstellar2.png" max-width="150px"></v-img>
                            <v-col col="9">
                              <v-container fluid>
                                <v-row>
                                  <a>父母决定儿女的命运，国家决定父母的命运</a>
                                </v-row>
                                <v-row>
                                  <v-avatar>
                                    <v-img src="../assets/interstellar2.png" alt="Avatar"></v-img>
                                  </v-avatar>
                                  <a style="margin-top: 15px; margin-bottom: 15px">林愈静</a>
                                  <p style="margin-top: 15px; margin-bottom: 15px">评论</p>
                                  <a style="margin-top: 15px; margin-bottom: 15px">《青红》</a>
                                  <v-rating style="margin-top: 15px; margin-bottom: 15px"
                                            :value="4.5" color="amber" dense half-increments readonly size="14">
                                  </v-rating>
                                </v-row>
                                <v-row>
                                  <p>各位豆瓣的朋友大家好，我是演员胡军。很高兴在这里跟大家分享《长津湖》的创作过程和心得。 从正式入驻豆瓣的那天起，我陆续接到很多私信。有人说，雷爹，你走的时候哭死我了；有人说，雷爹，我想给你蒸大包子；... (全文)</p>
                                </v-row>
                              </v-container>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                    </v-card>
                  </v-list-item>

                  <v-list-item>
                    <v-card>
                      <v-card-text>
                        <v-container fluid>
                          <v-row>
                            <v-img src="../assets/interstellar2.png" max-width="150px"></v-img>
                            <v-col col="9">
                              <v-container fluid>
                                <v-row>
                                  <a>雷公的“破防”——胡军《长津湖》创作手记</a>
                                </v-row>
                                <v-row>
                                  <v-avatar>
                                    <v-img src="../assets/interstellar2.png" alt="Avatar"></v-img>
                                  </v-avatar>
                                  <a style="margin-top: 15px; margin-bottom: 15px">胡军</a>
                                  <p style="margin-top: 15px; margin-bottom: 15px">评论</p>
                                  <a style="margin-top: 15px; margin-bottom: 15px">《长津湖》</a>
                                </v-row>
                                <v-row>
                                  <p>各位豆瓣的朋友大家好，我是演员胡军。很高兴在这里跟大家分享《长津湖》的创作过程和心得。 从正式入驻豆瓣的那天起，我陆续接到很多私信。有人说，雷爹，你走的时候哭死我了；有人说，雷爹，我想给你蒸大包子；... (全文)</p>
                                </v-row>
                              </v-container>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                    </v-card>
                  </v-list-item>
                </v-list>
              </v-card-text>
              <v-card-actions>
                <v-btn>
                  查看全部影评
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col cols="3">
            <v-card>
              <v-card-title>
                <p>一周口碑榜</p>
              </v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-item>
                    abc
                  </v-list-item>
                  <v-list-item>
                    abc
                  </v-list-item>
                  <v-list-item>
                    abc
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
          name: "mainView",
          background_image: require("../assets/mainpage_background.png"),

          hotMovies:[
            {

            },
            {

            },
          ]
        };
    },
    methods: {

    },
    computed: {

    }
}
</script>

<style>
.main-h1 {
  font-family: 微软雅黑,serif;
  font-size: 45px;
}

.main-h2 {
  font-family: 微软雅黑,serif;
  font-size: 30px;
  line-height: normal;
}

.home-search-box {
  padding: 60px 0 0 70px;

}

</style>