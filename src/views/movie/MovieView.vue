<template>
  <div id="movieView">
    <v-tabs centered v-model="activeIndex">
      <v-tab :href="`#tab-1`">概览</v-tab>
      <v-tab @click="jumpToMedia" :href="`#tab-2`">媒体</v-tab>
      <v-tab @click="jumpToDiscussion" :href="`#tab-3`">讨论区</v-tab>
    </v-tabs>

    <v-tabs-items v-model="activeIndex">
      <v-tab-item :value="`tab-1`"> <!--概览部分-->
        <v-container fluid style="width: 90%;">
          <v-row>
            <v-col cols="3">
              <v-img
                  height="400px"
                  width="300px"
                  aspect-ratio="1"
                  contain
                  :src=movie.poster
                  style="border-radius: 8px"
              ></v-img>
            </v-col>

            <v-col cols="8">
              <v-card-text>
                <v-row style="height:50px" class="mt-3 pb-0">
                  <h1 style="font-size: 40px">{{movie.name}}</h1>
                  <h1 style="font-size: 40px; color: dimgray">({{movie.year}})</h1>
                </v-row>
                <v-row>
                  <h3>{{ movie.publisedtime}} ({{movie.country}})</h3>
                  &ensp;
                  &ensp;
                  <h1>·</h1>
                  <h3 v-for="(tag,k) in movie.genres" :key="k">
                              {{tag}} &ensp;</h3>
                  &ensp; &ensp;
                  <h1>·</h1>
                  <h3>2h 49m</h3>
                </v-row>
                <v-row class="pt-5 pb-5">
                  <v-progress-circular
                      :value="80"
                      color="#13C00DFF"
                      width="5"
                      size="60"
                      rotate="270"
                      style="background-color: #0b1c22; border-radius: 100%"
                      class="mr-3"
                  >
                    <span style="color: white; font-family: gotham-bold,serif; font-size: 25px">80</span>
                  </v-progress-circular>
                  <h3 class="my-auto">用户评分</h3>
                  &ensp;

                  <v-chip
                      class="my-auto mx-10"
                      dark
                      color="primary"
                      text-color="white"
                      @click="starmovie"
                  >
                    收藏
                    <v-icon right :color="heart_color">mdi-heart</v-icon>
                  </v-chip>

                  <v-chip
                      class="my-auto"
                      color="orange"
                      text-color="white"
                      @click="is_rating = true"
                  >
                    评分
                    <v-icon right>mdi-star</v-icon>
                  </v-chip>



                </v-row>
                <v-row>
                  <h1>剧情简介</h1>
                  <p>
                    世界在历经极端气候与粮食危机，地球濒临末日之际，一位电机工程师与一群专业研究者还有顶尖太空人，扛起人类史上最重要的任务，越过已知的银河，在星际间寻找未来出路。同时必须先割舍无法与家人见面的亲情牵绊，在爱与勇气、生存与挑战中，跨越星际拯救人类。</p>
                </v-row>
                <v-row>
                  <v-col>
                    <p>Christopher Nolan</p>
                    <p>Director</p>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-col>
          </v-row>
        </v-container>
        <v-container fluid>
          <v-row>
            <v-col cols="9">
              <v-card style="margin:10px">
                <v-card-title>主演</v-card-title>
                <v-card-text>
                  <v-sheet
                      class="mx-auto"
                      elevation="8">
                    <v-slide-group
                        class="pa-4"
                        center-active
                        show-arrows>
                      <v-slide-item
                          v-for="n in 15"
                          :key="n">
                        <v-card
                            outlined>
                          <v-scale-transition>
                            <v-img
                                height="400px"
                                max-height="400px"
                                width="300px"
                                src="../../assets/interstellar2.png"
                            ></v-img>
                          </v-scale-transition>
                          <v-card-text>
                            <p>比利·海灵顿</p>
                          </v-card-text>
                        </v-card>
                      </v-slide-item>
                    </v-slide-group>
                  </v-sheet>
                </v-card-text>
                <v-card-actions>
                  <v-btn>完整演职员表</v-btn>
                </v-card-actions>
              </v-card>
              <v-divider></v-divider>
              <v-card style="margin:10px">
                <v-card-title>讨论</v-card-title>
                <v-card-text>
                  <v-data-table
                      :headers="discussionHeaders"
                      :items="discussionItems"
                      hide-default-header
                      hide-default-footer
                      class="elevation-1">
                    <template v-slot:[`item.avatar`]="{ item }">
                      <v-img :src="item.avatar" width="20px"></v-img>
                    </template>
                  </v-data-table>
                </v-card-text>
                <v-card-actions>
                  <v-btn>查看全部讨论</v-btn>
                </v-card-actions>
              </v-card>
              <v-divider></v-divider>
              <v-card style="margin:10px">
                <v-card-title>媒体</v-card-title>
                <v-card-text>
                  <v-sheet
                      class="mx-auto"
                      elevation="8">
                    <v-slide-group
                        class="pa-4"
                        center-active
                        show-arrows>
                      <v-slide-item
                          v-for="n in 15"
                          :key="n">
                        <v-card
                            outlined>
                          <v-scale-transition>
                            <v-img
                                height="400px"
                                max-height="400px"
                                width="300px"
                                src="../../assets/interstellar2.png"
                            ></v-img>
                          </v-scale-transition>
                          <v-card-text>
                            <p>比利·海灵顿</p>
                          </v-card-text>
                        </v-card>
                      </v-slide-item>
                    </v-slide-group>
                  </v-sheet>
                </v-card-text>
                <v-card-actions>
                  <v-btn>查看全部媒体</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="3">
              <v-card style="margin:20px">
                <v-card-text>
                  <v-row>
                    <h3>原产地片名</h3>
                  </v-row>
                  <v-row>
                    <p>Interstellar</p>
                  </v-row>
                  <v-row>
                    <h4>状态</h4>
                  </v-row>
                  <v-row>
                    <p>已上映</p>
                  </v-row>
                  <v-row>
                    <h4>原始语言</h4>
                  </v-row>
                  <v-row>
                    <p>英语</p>
                  </v-row>
                  <v-row>
                    <h4>预算</h4>
                  </v-row>
                  <v-row>
                    <p>$165,000,000.00</p>
                  </v-row>
                  <v-row>
                    <h4>票房</h4>
                  </v-row>
                  <v-row>
                    <p>$701,729,206.00</p>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
      <v-tab-item :value="`tab-2`"> <!--媒体部分-->
        <h1> 媒体 </h1>
      </v-tab-item>
      <v-tab-item :value="`tab-3`"> <!--影评部分-->
        <h1> 影评 </h1>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "movieView",
      activeIndex: "tab-1",
      movie: {
        id: 1,
        name: "Interstellar",
        introduction: "",
        year: 2014,
        country: "美国",
        language: "英语",
        length: 169,
        score: 8.6,
        director: "克里斯托弗·诺兰",
        publisedtime: "2014-11-07",
        genres:[
          "科幻",
          "冒险",
          "剧情"
        ],
        poster: require('../../assets/interstellar2.png'),

      },

      discussionHeaders: [
        {text: "头像", value: "avatar"},
        {text: "标题", value: "title"},
        {text: "回复数", value: "reply_count"},
        {text: "时间", value: "time"},
        {text: "用户", value: "user"},
      ],
      discussionItems: [
        {
          avatar: require("../../assets/logo.png"),
          title: "太好看了吧",
          reply_count: 100,
          time: "2020-10-10",
          user: "user1",
        },
        {
          avatar: require("../../assets/logo.png"),
          title: "太垃圾了吧",
          reply_count: 100,
          time: "2020-10-10",
          user: "user1",
        }
      ],
      is_rating: false,
      started : false,
      heart_color: "white",
    };
  },
  methods: {
    jumpToDiscussion() {
      this.$router.push('/moviereview');
    },
    jumpToMedia() {
      this.$router.push('/moviemedia');
    },
    starmovie() {
      this.started = !this.started;
      if (this.heart_color === "red" ) {
        this.heart_color = "white";
        alert("取消收藏");
      } else {
        this.heart_color = "red";
        alert("收藏成功");
      }

    }
  },
  computed: {

  },
}
</script>

<style scoped>


.circle {
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
}


</style>