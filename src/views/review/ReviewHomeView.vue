<template>
  <div id="reviewHomeView">
    <v-container style="width: 90%" class="mt-5" v-if="!loading">
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
      loading: true,
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
      reviews: [],
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
      this.loading = false;
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