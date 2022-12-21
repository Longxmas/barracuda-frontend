<template>
  <div id="reviewHomeView">
    <v-container style="width: 90%" class="mt-5">
      <v-row>
        <v-col cols="10">
          <h1>随便看看</h1>
        </v-col>
        <v-col cols = "2"  class="pt-4">
          <v-btn class=" ma-0" text @click="refresh">
            <v-icon>mdi-autorenew</v-icon> 换一批
          </v-btn>
        </v-col>

      </v-row>

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
                      <v-img :src="review.movie_details.image" max-width="150px"
                             style="border-bottom-left-radius: 10px; border-top-left-radius: 10px"></v-img>
                      <v-col style="margin-left: 5px">
                        <v-container fluid>

                          <v-row class="pl-0 pt-0">
                            <v-col class="pa-0">
                              <a :href="'/review/'+review.id" style="text-decoration: none">
                                <h3 style="font-family: 微软雅黑,serif;font-size: 20px;color: black; line-height: normal"
                                    class="ma-auto pa-0 ">{{ review.title }}</h3>
                              </a>
                            </v-col>
                          </v-row>

                          <v-row class="py-4">
                            <v-avatar>
                              <v-img :src="review.author_details.avatar" alt="Avatar"></v-img>
                            </v-avatar>
                            &ensp;
                            <a style="margin-top: 15px; margin-bottom: 15px; font-size: 16px" @click="jumpToUserProfile(review.author_details.id)">{{ review.author_details.nickname }}</a>
                            &ensp;
                            <p style="margin-top: 15px; margin-bottom: 15px; font-size: 16px">评论</p>
                            &ensp;
                            <a style="margin-top: 15px; margin-bottom: 15px; font-size: 16px" @click="jumpToMovie(review.movie_details.id)">
                              {{  review.movie_details.movie_name}}
                            </a>
                            &ensp;
                            <p class="my-auto" style="font-size: 16px"> {{review.create_at}} </p>
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
                            <v-btn small class="mr-5" style="color: white;background-color: skyblue"  @click="jumpToMovieReview(review)">
                              <v-icon small class="my-auto"> mdi-heart</v-icon>
                              &ensp;
                              {{review.likes}}
                            </v-btn>

                            <v-btn small class="mr-5" style="color: white;background-color: darkorange"  @click="jumpToMovieReview(review)">
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

  </div>
</template>

<script>
import {queryRandomReview} from "@/api/review";
import {apiUrl} from "@/api/request";

export default {
  name: 'reviewHomeView',
  async mounted() {
    await this.refresh();
  },
  data() {
    return {
      selection: '最近的影评',
      selection_items: [
        {
          text: '最近的影评',
          disabled: false,
          href: '/reviewhome',
        },
        {
          text: '全部影评',
          disabled: false,
          href: '/reviewhome',
        },
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
      let response = await queryRandomReview('');
      if (response.status === 200) {
        this.reviews = response.data;
      }
      for (let i = 0 ; i < this.reviews.length; i++) {
        this.reviews[i].author_details.avatar = apiUrl + this.reviews[i].author_details.avatar;
      }
    },

    jumpToMovieReview(review) {
      this.$router.push('/review/' + review.id);
    },
    jumpToUserProfile(user_id) {
      this.$router.push('/user/' + user_id);
    },
    jumpToMovie(movie_id) {
      this.$router.push('/movie/' + movie_id);
    }

  },
  computed: {

  }
}
</script>