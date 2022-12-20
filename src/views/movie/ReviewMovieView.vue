<template>
  <div id="reviewMovieView">
    <v-tabs centered v-model="activeIndex">
      <v-tab @click="jumpToOverView" :href="`#tab-1`">概览</v-tab>
      <v-tab @click="jumpToMedia" :href="`#tab-2`">媒体</v-tab>
      <v-tab @click="jumpToComment" :href="`#tab-3`">短评区</v-tab>
      <v-tab :href="`#tab-4`">影评区</v-tab>
    </v-tabs>

    <v-tabs-items v-model="activeIndex">
      <v-tab-item :value="`tab-4`">

        <v-container fluid style="width: 90%; margin-top: 10px; margin-left: 50px">
        <h1>快来发表看法吧~</h1>
        <v-container fluid class="pl-0">
          <v-row class="pl-0">
            <v-col class="pl-0 pb-0">
              <v-breadcrumbs
                  :items="breadcrumbs_items"
                  large>
                <template v-slot:divider>
                  <v-icon>mdi-forward</v-icon>
                </template>
              </v-breadcrumbs>
            </v-col>
            <v-col class="d-flex flex-row-reverse">
              <v-btn class="mr-4" @click="jumpToAddReview">
                <v-icon>mdi-pen</v-icon>
                &ensp;
                我要写影评
              </v-btn>
            </v-col>
          </v-row>
        </v-container>

        <v-card elevation="0">
          <v-card-text class="pl-0">
            <v-list  class="pl-0">
              <v-list-item
                  v-for="(review,i) in reviews"
                  :key=i
                  class="pl-0"
              >
                <v-card elevation="5" class="mb-5" style="border-radius: 10px" width="100%">
                  <v-card-text class="pa-0">
                    <v-container fluid >
                      <v-row>
                        <v-img :src="movie.image" max-width="150px"
                               style="border-bottom-left-radius: 10px; border-top-left-radius: 10px"></v-img>
                        <v-col style="margin-left: 5px">
                          <v-container fluid>

                            <v-row class="pl-0 pt-0">
                              <v-col class="pa-0">
                                <a @click="jumpToMovieReview(review)">
                                  <h3 style="font-family: 微软雅黑,serif;font-size: 20px;color: black; line-height: normal"
                                      class="ma-auto pa-0 "
                                  >{{ review.title }}</h3>
                                </a>
                              </v-col>
                            </v-row>

                            <v-row class="py-4">
                              <v-avatar>
                                <v-img :src="review.user_avatar" alt="Avatar"></v-img>
                              </v-avatar>
                              &ensp;
                              <a style="margin-top: 15px; margin-bottom: 15px; font-size: 16px">{{ review.author_details.nickname }}</a>
                              &ensp;
                              <p style="margin-top: 15px; margin-bottom: 15px; font-size: 16px">评论</p>
                              &ensp;
                              <a style="margin-top: 15px; margin-bottom: 15px; font-size: 16px">{{  movie.movie_name}}</a>
                              &ensp;
                              <p class="my-auto" style="font-size: 16px"> {{review.review_date}} </p>
                              <v-spacer></v-spacer>
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
                                {{ review.content }} </p>
                            </v-row>

                            <v-row>
                              <v-btn small class="mr-5" style="color: white;background-color: skyblue" @click="jumpToMovieReview(review)">
                                <v-icon small class="my-auto"> mdi-heart</v-icon>
                                &ensp;
                                {{review.likes}}
                              </v-btn>

                              <v-btn small class="mr-5" style="color: white;background-color: darkorange" @click="jumpToMovieReview(review)">
                                <v-icon small class="my-auto"> mdi-message</v-icon>
                                &ensp;
                                {{review.reply_count}}
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
        </v-container>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import {queryMovieDetail, queryMovieReviews} from "@/api/movie";

export default {
  name: 'reviewMovieView',
  async mounted() {
    await this.refresh();
  },
  data() {
    return {
      activeIndex: 'tab-4',
      movie: {},
      breadcrumbs_items: [
        {
          text: '所有电影',
          disabled: false,
          href: '/movie',
        },
        {
          text: '',
          disabled: false,
          href: '/movie/'+this.$route.params.id,
        }
      ],
      discussionHeaders: [
        { text: "", value: "avatar", widths: '5%'},
        { text: "主题", value: "title"},
        { text: "回复数", value: "reply_count" },
        { text: "最后回复", value: "last_reply" },
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
      reviews: [
        {
          id: 1,
          movie_id: 1,
          movie_poster: require('../../assets/interstellar2.png'),
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
          movie_poster: require('../../assets/interstellar2.png'),
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
          movie_poster: require('../../assets/interstellar2.png'),
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
      ]
    }
  },
  methods: {
    async refresh() {
      let response = await queryMovieReviews('', this.$route.params.id);
      if (response.status === 200) {
        let len1 = response.data.reviews.length;
        this.reviews = response.data.reviews.slice(len1-3, len1).reverse();
      }
      response = await queryMovieDetail('', this.$route.params.id);
      if (response.status === 200) {
        this.movie = response.data;
        this.breadcrumbs_items[1].text = this.movie.movie_name;
      }
    },

    jumpToOverView() {
      this.$router.push('/movie/'+this.$route.params.id);
    },
    jumpToMedia() {
      this.$router.push('/movie/'+this.$route.params.id+'/media/images');
    },
    jumpToComment() {
      this.$router.push('/movie/'+this.$route.params.id+'/comment');
    },

    jumpToAddReview() {
      this.$router.push('/movie/' + this.$route.params.id + '/addreview');
    },

    jumpToMovieReview(review) {
      this.$router.push('/review/' + review.id);
    },

  },
  computed: {

  }
}
</script>