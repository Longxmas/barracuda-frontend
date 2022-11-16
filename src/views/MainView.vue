<template>
  <div id="mainView">
    <v-container fluid style="padding-top: 0;">
      <v-card max-height="800px">
        <v-img src="../assets/mainpage_background.png" max-height="300px">
          <v-card-text class="home-search-box">
            <h1 style="color: white" class="main-h1">欢迎。</h1>
            <br>
            <h2 id="main-h2" style="color: white" class="main-h2">这里有海量的电影、剧集和人物等你来发现。快来探索吧！</h2>
            <v-container fluid style="margin-top: 45px">
              <v-row>
                <v-col cols="10" style="padding-left: 0">
                  <v-text-field
                      label="搜索电影、剧集、人物..."
                      solo
                      color="white"
                      style="border-radius: 30px"
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
        <v-col cols="9">
          <v-card elevation="0">
            <v-card-title>
              <h3>最新电影</h3>
            </v-card-title>
            <v-card-text>

              <ul style="width: auto" class="photo-ul">
                <li v-for="(item,i) in hotMovies"
                    :key="i"
                    class="parent_center">
                  <v-card
                      class="mx-auto"
                      elevation="0"
                      max-width="400"
                      style="text-align: center"
                      :href="'/movie/' + item.id"
                  >
                    <v-img
                        :src="item.src"
                        max-width="200px"
                        height="300px"
                    >
                    </v-img>

                    <!-- TODO::VALUE应当是评分-->
                    <v-progress-circular
                        :value="80"
                        color="#13C00DFF"
                        width="3"
                        size="40"
                        rotate="270"
                        style="margin-top: -30px; margin-right: 115px; background-color: #0b1c22; border-radius: 100%"
                    >
                      <span style="color: white; font-family: gotham-bold,serif; font-size: 18px">80</span>
                    </v-progress-circular>

                    <v-card-text class="text--primary" style="padding: 3px !important;">
                      <div><h3>{{ item.name }}</h3></div>
                    </v-card-text>

                  </v-card>
                </li>
              </ul>

            </v-card-text>
          </v-card>


          <v-card elevation="0">
            <v-card-title>
              <h3>热门电影</h3>
            </v-card-title>
            <v-card-text>

              <ul style="width: auto" class="photo-ul">
                <li v-for="(item,i) in hotMovies"
                    :key="i"
                    class="parent_center">
                  <v-card
                      class="mx-auto"
                      elevation="0"
                      max-width="400"
                      style="text-align: center"
                      :href="'/movie/' + item.id"
                  >
                    <v-img
                        :src="item.src"
                        max-width="200px"
                        height="300px"
                    >
                    </v-img>

                    <!-- TODO::VALUE应当是评分-->
                    <v-progress-circular
                        :value="80"
                        color="#1aa953"
                        width="6"
                        size="50"
                        rotate="270"
                        style="margin-top: -30px; margin-right: 100px; background-color: #022811; border-radius: 100%"
                    >
                      <span style="color: white; font-family: YouSheBiaoTi, bold,serif; font-size: 20px">{{ 80 }}</span>
                    </v-progress-circular>

                    <v-card-text class="text--primary" style="padding: 3px !important;">
                      <div><h3>{{ item.name }}</h3></div>
                    </v-card-text>

                  </v-card>
                </li>
              </ul>

            </v-card-text>
          </v-card>


          <v-card elevation="0">
            <v-card-title>
              <h3>今日推荐</h3>
            </v-card-title>

            <v-card-text>
              <v-container style="padding: 0 0 0 0">
                <v-row style="padding-left: 0">
                  <v-col cols="10" class="mx-auto">

                    <v-carousel
                        cycle
                        height="400px"
                        hide-delimiter-background
                        hide-delimiters
                        show-arrows-on-hover
                    >

                      <v-carousel-item
                          v-for="(item, i) in hotMovies"
                          :key="i"
                      >
                        <v-container
                            height="400px"
                            class="pa-0"
                        >
                          <v-row no-gutters>
                            <v-col cols="4" class="pa-0">
                              <v-img :src="item.src" height="100%" aspect-ratio="1">
                              </v-img>

                            </v-col>

                            <v-col cols="8" class="pa-0">
                              <v-card
                                  max-height="400"
                                  style="background-color: ghostwhite;"
                                  height="400"
                              >
                                <v-card style="padding: 25% 10% 0 10%; background: transparent" elevation="0">
                                  <span style="font-family: 微软雅黑,serif; font-size: 20px; line-height: normal; ">
                                    《蜘蛛侠：平行宇宙》续集中字预告片正式流出
                                  </span>
                                  <br>
                                  <br>
                                  <span
                                      style="font-family: 微软雅黑, serif; font-size: 15px; line-height: normal; color: #afb6b5">
                                    《蜘蛛侠：纵横宇宙（上）》延期至2023年6月2日北美上映，《蜘蛛侠：纵横宇宙（下）》官宣2024年3月29日北美上映！
                                  </span>
                                </v-card>
                              </v-card>
                            </v-col>
                          </v-row>

                        </v-container>
                      </v-carousel-item>
                    </v-carousel>
                  </v-col>
                </v-row>

              </v-container>
            </v-card-text>
          </v-card>


          <v-card elevation="0" width="100%" >
            <v-card-title>
              <h3>最新影评</h3>
            </v-card-title>
            <v-card-text class="pl-5">
              <v-list class="pl-0">
                <v-list-item
                    v-for="(review,i) in reviews"
                    :key=i
                    class="pl-0"
                >
                  <v-card elevation="5" class="mb-5" style="border-radius: 10px" width="100%">
                    <v-card-text class="pa-0">
                      <v-container fluid>
                        <v-row>
                          <v-img :src="review.movie_poster" max-width="150px"
                                 style="border-bottom-left-radius: 10px; border-top-left-radius: 10px"></v-img>
                          <v-col style="margin-left: 5px">
                            <v-container fluid>

                              <v-row class="pl-0 pt-0">
                                <v-col class="pa-0">
                                  <a>
                                    <h3 style="font-family: 微软雅黑,serif;font-size: 20px;color: black; line-height: normal"
                                        class="ma-auto pa-0 ">{{ review.review_title }}</h3>
                                  </a>
                                </v-col>
                              </v-row>

                              <v-row class="py-4">
                                <v-avatar>
                                  <v-img :src="review.user_avatar" alt="Avatar"></v-img>
                                </v-avatar>
                                &ensp;
                                <a style="margin-top: 15px; margin-bottom: 15px; font-size: 16px">{{
                                    review.user_name
                                  }}</a>
                                &ensp;
                                <p style="margin-top: 15px; margin-bottom: 15px; font-size: 16px">评论</p>
                                &ensp;
                                <a style="margin-top: 15px; margin-bottom: 15px; font-size: 16px">{{
                                    review.movie_name
                                  }}</a>
                                &ensp;
                                <p class="my-auto" style="font-size: 16px"> {{ review.review_date }} </p>
                                <v-spacer></v-spacer>
                                <v-rating style="margin-top: 15px; margin-bottom: 15px"
                                          :value="review.user_rate" color="amber" dense half-increments readonly
                                          size="14">
                                </v-rating>
                              </v-row>


                              <v-row>
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
                                  {{ review.review_content }} </p>
                              </v-row>

                              <v-row>
                                <v-btn small class="mr-5" style="color: white;background-color: skyblue">
                                  <v-icon small class="my-auto"> mdi-heart</v-icon>
                                  &ensp;
                                  {{ review.review_thumb }}
                                </v-btn>

                                <v-btn small class="mr-5" style="color: white;background-color: darkorange">
                                  <v-icon small class="my-auto"> mdi-message</v-icon>
                                  &ensp;
                                  {{ review.reply_count }}
                                </v-btn>

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

      hotMovies: [
        {
          name: "星际穿越",
          src: require("../assets/interstellar2.png"),
        },
        {
          name: "真探",
          src: require("../assets/p2.webp"),
        },
        {
          name: "星际穿越",
          src: require("../assets/interstellar2.png"),
        },
        {
          name: "真探",
          src: require("../assets/p2.webp"),
        },
        {
          name: "星际穿越",
          src: require("../assets/interstellar2.png"),
        },
        {
          name: "真探",
          src: require("../assets/p2.webp"),
        },
        {
          name: "星际穿越",
          src: require("../assets/interstellar2.png"),
        },
        {
          name: "真探",
          src: require("../assets/p2.webp"),
        },
        {
          name: "星际穿越",
          src: require("../assets/interstellar2.png"),
        },
        {
          name: "真探",
          src: require("../assets/p2.webp"),
        },
      ],
      reviews: [
        {
          id: 1,
          movie_id: 1,
          movie_poster: require('../assets/interstellar2.png'),
          movie_name: "肖申克的救赎",
          user_name: "小鸟",
          user_avatar: "https://img3.doubanio.com/icon/u1000001-1.jpg",
          user_rate: 5,
          review_date: "2020-01-01",
          review_title: "这是一部好电影",
          review_content: "由于众所周知的原因，院线电影在沉寂了一个多月之后，" +
              "终于上映了一部由众多年轻一代演员和老戏骨联手奉献的扫黑题材电影，给这个有点波澜不惊的电影市场注入了一剂新的强心剂。 近年来，扫黑题材影视作品并不少见，这次本片从近年来为人深恶痛绝的“套路贷”和暴力催收引发的案...  (展开)",
          review_thumb: 100,
          reply_count: 100,
          reply: [
            {
              user_name: "小鸟",
              user_avatar: "https://img3.doubanio.com/icon/u1000001-1.jpg",
              review_date: "2020-01-01",
              review_content: "好呀好呀好呀好",
              review_digest: "好呀好呀好呀好",
              review_thumb: 100,
            },
            {
              user_name: "小鸟",
              user_avatar: "https://img3.doubanio.com/icon/u1000001-1.jpg",
              review_date: "2020-01-01",
              review_content: "好呀好呀好呀好",
              review_digest: "好呀好呀好呀好",
              review_thumb: 100,
            },
          ]
        },
        {
          id: 2,
          movie_id: 1,
          movie_poster: require('../assets/interstellar2.png'),
          movie_name: "肖申克的救赎",
          user_name: "小鸟",
          user_avatar: "https://img3.doubanio.com/icon/u1000001-1.jpg",
          user_rate: 5,
          review_date: "2020-01-01",
          review_title: "这是一部好电影",
          review_content: "好呀好呀好呀好",
          review_digest: "好呀好呀好呀好",
          review_thumb: 100,
          reply_count: 100,
          reply: [
            {
              user_name: "小鸟",
              user_avatar: "https://img3.doubanio.com/icon/u1000001-1.jpg",
              review_date: "2020-01-01",
              review_content: "好呀好呀好呀好",
              review_digest: "好呀好呀好呀好",
              review_thumb: 100,
            },
            {
              user_name: "小鸟",
              user_avatar: "https://img3.doubanio.com/icon/u1000001-1.jpg",
              review_date: "2020-01-01",
              review_content: "好呀好呀好呀好",
              review_digest: "好呀好呀好呀好",
              review_thumb: 100,
            },
          ]
        },
        {
          id: 3,
          movie_id: 1,
          movie_poster: require('../assets/interstellar2.png'),
          movie_name: "肖申克的救赎",
          user_name: "小鸟",
          user_avatar: "https://img3.doubanio.com/icon/u1000001-1.jpg",
          user_rate: 5,
          review_date: "2020-01-01",
          review_title: "这是一部好电影",
          review_content: "好呀好呀好呀好",
          review_digest: "好呀好呀好呀好",
          review_thumb: 100,
          reply_count: 100,
          reply: [
            {
              user_name: "小鸟",
              user_avatar: "https://img3.doubanio.com/icon/u1000001-1.jpg",
              review_date: "2020-01-01",
              review_content: "好呀好呀好呀好",
              review_digest: "好呀好呀好呀好",
              review_thumb: 100,
            },
            {
              user_name: "小鸟",
              user_avatar: "https://img3.doubanio.com/icon/u1000001-1.jpg",
              review_date: "2020-01-01",
              review_content: "好呀好呀好呀好",
              review_digest: "好呀好呀好呀好",
              review_thumb: 100,
            },
          ]
        }
      ],
    };
  },
  methods: {},
  computed: {}
}
</script>

<style scoped>
.main-h1 {
  font-family: 微软雅黑, serif;
  font-size: 45px;
}

.main-h2 {
  font-family: 微软雅黑, serif;
  font-size: 30px;
  line-height: normal;
}

.home-search-box {
  padding: 60px 0 0 70px;

}

.outer-up {
  color: white;
  font-size: 1px !important;
  vertical-align: text-top !important;
}
</style>