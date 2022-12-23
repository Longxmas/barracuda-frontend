<template>
  <div id="reviewMovieView" v-if="!loading">
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
                                <v-img :src="review.author_details.avatar" alt="Avatar"></v-img>
                              </v-avatar>
                              &ensp;
                              <a style="margin-top: 15px; margin-bottom: 15px; font-size: 16px"
                                 @click="jumpToUserProfile(review.author_details.id)">
                                {{ review.author_details.nickname }}</a>
                              &ensp;
                              <p style="margin-top: 15px; margin-bottom: 15px; font-size: 16px">评论</p>
                              &ensp;
                              <a style="margin-top: 15px; margin-bottom: 15px; font-size: 16px"
                              @click="jumpToOverView()">{{  movie.movie_name}}</a>
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
import {apiUrl} from "@/api/request";

export default {
  name: 'reviewMovieView',
  async mounted() {
    await this.refresh();
  },
  data() {
    return {
      loading: true,
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
      discussionItems: [],
      reviews: []
    }
  },
  methods: {
    async refresh() {
      let response = await queryMovieReviews('', this.$route.params.id);
      if (response.status === 200) {
        let len1 = response.data.reviews.length;
        this.reviews = response.data.reviews.slice(Math.max(0,len1-6), len1).reverse();
        for (let i = 0 ; i < this.reviews.length; i++) {
          this.reviews[i].author_details.avatar = apiUrl + this.reviews[i].author_details.avatar;
        }
      }
      response = await queryMovieDetail('', this.$route.params.id);
      if (response.status === 200) {
        this.movie = response.data;
        this.breadcrumbs_items[1].text = this.movie.movie_name;
      }
      this.loading = false;
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

    jumpToUserProfile(user_id) {
      this.$router.push('/user/' + user_id);
    },


  },
  computed: {

  }
}
</script>