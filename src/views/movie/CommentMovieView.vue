<template>
  <div id="commentMovie">
    <v-tabs centered v-model="activeIndex">
      <v-tab @click="jumpToOverView" :href="`#tab-1`">概览</v-tab>
      <v-tab @click="jumpToMedia" :href="`#tab-2`">媒体</v-tab>
      <v-tab :href="`#tab-3`">短评区</v-tab>
      <v-tab @click="jumpToReview" :href="`#tab-4`">影评区</v-tab>
    </v-tabs>

    <v-tabs-items v-model="activeIndex">
      <v-tab-item :value="`tab-3`">
        <v-container fluid style="width: 90%; margin-top: 10px; margin-left: 50px">
          <h1>所有短评</h1>
          <v-container fluid>
            <v-row>
              <v-col class="px-0">
                <v-card style="margin-top: 10px; overflow: scroll; min-width: 1000px" elevation="0">
                  <v-card-text class="pl-0 ml-0 pb-0 mb-0">

                    <v-container fluid class="pl-0 ml-0 pt-0 mt-0">
                      <v-list class="py-0">
                        <v-list-item
                            v-for="(comment, i) in all_comments"
                            :key=i
                            :class=judgePosition(i)
                            class="px-0">
                          <v-container class="px-0">
                            <v-row :class="judgePosition(i)">
                              <v-col cols="1" class="px-0">
                                <v-avatar tile class="ml-5 pt-2" size="60">
                                  <v-img :src="comment.avatar"></v-img>
                                </v-avatar>
                              </v-col>
                              <v-col :class="judgePosition(i)" class="mx-1">
                                <v-card elevation="2" class="mb-0 mx-0" width="60%">
                                  <v-card-text class="pa-0">
                                    <v-container fluid>
                                      <v-row>
                                        <v-col class="pl-0 ">
                                          <v-container fluid>

                                            <v-row class="pl-0 " :class=judgePosition(i)>
                                              <a style="font-size: 16px" class="my-auto pl-3">{{ comment.user }}</a>
                                              <v-rating class="my-auto pl-3"
                                                        :value="comment.rating" color="amber" dense
                                                        half-increments readonly
                                                        size="18">
                                              </v-rating>
                                              <span class="my-auto pl-3">{{ comment.time }}</span>
                                            </v-row>

                                            <v-row class="pt-2 pl-3 pr-2" :class=judgePosition(i)>
                                              <p style="text-overflow: ellipsis;
                                        overflow: hidden;
                                        display: -webkit-box;
                                        -webkit-box-orient: vertical;
                                        -webkit-line-clamp: 3;
                                        line-height: 15px;
                                        max-height: 45px;
                                        font-family: 微软雅黑,serif;
                                        font-size: 14px;
                                        color: dimgray;
                                        margin-bottom: 0">
                                                {{ comment.introduction }} </p>
                                            </v-row>
                                          </v-container>
                                        </v-col>
                                      </v-row>
                                    </v-container>
                                  </v-card-text>
                                </v-card>
                              </v-col>
                            </v-row>
                          </v-container>

                        </v-list-item>
                      </v-list>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col>
                <v-card>
                  <v-container fluid>
                    <v-row>
                      <v-col cols="4">
                        <v-img
                            :src="`https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.webp`"
                            aspect-ratio="1"
                            contain>
                        </v-img>
                      </v-col>
                      <v-col cols="8">
                        <h3>电影名称</h3>
                        <a :href="'/movie/'+this.$route.params.id">回到电影主页面</a>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-container>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  name: 'CommentMovieView',
  data() {
    return {
      activeIndex: 'tab-3',
      all_comments: [
        {
          id: 1,
          avatar: require("../../assets/pics/anne.jpg"),
          introduction: "最强科幻片不过如此",
          rating: 4.0,
          time: "2022-10-12",
          user: "user2",
        },
        {
          id: 2,
          avatar: require("../../assets/pics/anne.jpg"),
          introduction: "最强科幻片不过如此 最强科幻片不过如此 最强科幻片不过如此" +
              "最强科幻片不过如此" +
              "最强科幻片不过如此" +
              "最强科幻片不过如此" +
              "最强科幻片不过如此" +
              "最强科幻片不过如此" +
              "最强科幻片不过如此最强科幻片不过如此最强科幻片不过如此最强科幻片不过如此最强科幻片不过如此" +
              "最强科幻片不过如此",
          rating: 4.0,
          time: "2022-10-12",
          user: "user2",
        },
        {
          id: 3,
          avatar: require("../../assets/pics/anne.jpg"),
          introduction: "最强科幻片不过如此",
          rating: 4.0,
          time: "2022-10-12",
          user: "user2",
        },
        {
          id: 4,
          avatar: require("../../assets/pics/anne.jpg"),
          introduction: "最强科幻片不过如此",
          rating: 4.0,
          time: "2022-10-12",
          user: "user2",
        }
      ]
    }
  },
  methods: {
    jumpToReview() {
      this.$router.push('/movie/'+this.$route.params.id+'/review');
    },
    jumpToMedia() {
      this.$router.push('/movie/'+this.$route.params.id+'/media/images');
    },
    jumpToOverView() {
      this.$router.push('/movie/'+this.$route.params.id);
    },
    judgePosition(i) {
      if (i % 2 === 1) {
        return "d-flex flex-row-reverse";
      } else {
        return "d-flex flex-row"
      }
    }
  },
  computed: {

  }
}
</script>