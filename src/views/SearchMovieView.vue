<template>
  <div id="searchMovieView">
    <v-container fluid style="width: 90%">
      <v-container fluid>
        <v-row>
          <v-col lg="3"
                 md="3"
                 sm="6"
                 xs="8" style="margin-top: 0;">
            <v-card
                class="mx-auto rounded-lg"
                max-width="300"
            >
              <v-card color="#01b4e4">
                <v-card-title>
                  <h3 style="color: white"> “{{ this.$route.query.query }}” 的搜索结果</h3>
                </v-card-title>
              </v-card>
              <v-list>
                <v-list-item-group color="primary" v-model="choose_type">
                  <v-list-item :href="'/search/movie?query=' + this.$route.query.query">
                    <v-list-item-content>
                      <v-container fluid>
                        <v-row align="center">
                          <v-col class="pt-0 pb-0">
                            <p class="my-auto">影片</p>
                          </v-col>
                          <v-col class="d-flex flex-row-reverse pt-0 pb-0">
                            <v-chip pill>{{ movie_results.length }}</v-chip>
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
                              <p class="my-auto">人物</p>
                            </v-col>
                            <v-col class="d-flex flex-row-reverse pt-0 pb-0">
                              <v-chip pill>{{ this.actors.length }}</v-chip>
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

          <v-col lg="9"
                 md="9"
                 sm="6"
                 xs="4" style="margin-top: 0;">
            <v-list>
              <v-list-item
                  v-for="(movie,i) in movie_results"
                  :key=i
              >
                <v-card elevation="5" class="mb-5" style="border-radius: 10px" width="100%">
                  <v-card-text class="pa-0">

                    <v-container fluid>
                      <v-row>
                        <v-img :src="movie.image" max-width="150px"
                               style="border-bottom-left-radius: 10px; border-top-left-radius: 10px"
                               @click="jumpToMovie(movie)"
                        ></v-img>
                        <v-col style="margin-left: 5px">
                          <v-container fluid>

                            <v-row>
                              <v-progress-circular
                                  :value="movie.vote_average * 10"
                                  color="#13C00DFF"
                                  width="3"
                                  size="40"
                                  rotate="270"
                                  class="ma-auto"
                                  style="background-color: #0b1c22; border-radius: 100%"
                              >
                                <span style="color: white; font-family: gotham-bold,serif; font-size: 20px">{{
                                    Math.round(movie.vote_average * 10)
                                  }}</span>
                              </v-progress-circular>

                              <v-col>
                                <a :href="'/movie/' + movie.id" style="text-decoration: none">
                                  <h3 style="font-family: 微软雅黑,serif;font-size: 20px;color: black; line-height: normal"
                                      class="ma-auto pa-0 ">{{ movie.movie_name }}</h3>
                                </a>

                                <span>{{ movie.release_date }}</span>
                              </v-col>
                            </v-row>

                            <v-row class="pl-2">
                              <p style="text-overflow: ellipsis;
                                        overflow: hidden;
                                        display: -webkit-box;
                                        -webkit-box-orient: vertical;
                                        -webkit-line-clamp: 4;
                                        line-height: 20px;
                                        max-height: 80px;
                                        font-family: 微软雅黑,serif;
                                        font-size: 16px;
                                        color: black;
                                        min-height: 50px">
                                {{ movie.overview }} </p>
                            </v-row>

                            <v-row>
                              <v-col cols="6"  class="pa-0">
                                <v-btn icon color="pink" large @click="changeStar(movie.id)">
                                  <v-icon color="red" v-if="stars[i]"> mdi-heart</v-icon>
                                  <v-icon color="blue" v-if="!stars[i]"> mdi-heart</v-icon>
                                </v-btn>
                                <span
                                    style="font-family: 微软雅黑, serif; font-size: 16px; color: #afb6b5">添加收藏</span>
                              </v-col>

                              <v-col cols="6"  class="pa-0">
                                <v-menu offset-y>
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        v-model:="ratings[i]"
                                        color="indigo"
                                        icon
                                        large
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                      <v-icon>mdi-star</v-icon>
                                    </v-btn>
                                  </template>

                                  <v-list>
                                    <v-list-item>
                                      <v-rating
                                          v-model="ratings[i]"
                                          color="yellow darken-3"
                                          background-color="grey darken-1"
                                          empty-icon="$ratingFull"
                                          half-increments
                                          hover
                                          large
                                          @input="submitRating(i,movie.id)"
                                      ></v-rating>
                                    </v-list-item>

                                  </v-list>
                                </v-menu>
                                <span
                                    style="font-family: 微软雅黑, serif; font-size: 16px; color: #afb6b5">我的评分</span>
                              </v-col>

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

    </v-container>

  </div>
</template>

<script>
import {addReview, queryMovieRatings, queryMovieStar, searchMovie, submitMovieRating} from "@/api/movie";
import {searchActor} from "@/api/celebrity";
import {starMovie, unstarMovie} from "@/api/user";

export default {
  name: 'searchMovieView',
  async mounted() {
    this.$emit('showSearchBar', this.$route.query.query);
    await this.refresh();
  },
  data() {
    return {
      choose_type: 0,
      movie_results: [
        {
          id: 1,
          name: 'test',
          image: require('../assets/interstellar2.png'),
          introduction: '《寄生虫》是由奉俊昊执导，宋康昊、李善均、赵茹珍、崔宇植、朴素丹主演的剧情片，于2019年5月30日在韩国上映。' +
              '该片讲述了一家四口全是无业游民的爸爸金基泽成天游手好闲，直到积极向上的长子金基宇靠着伪造的文凭来到富豪朴社长的家应征家教，' +
              '两个天差地别的家庭因而被卷入一连串的意外事件之中的故事。 基宇（崔宇植 饰）出生在一个贫穷的家庭之中，和妹妹基婷（朴素丹 饰）' +
              '以及父母在狭窄的地下室里过着相依为命的日子。一天，基宇的同学上门拜访，他告诉基宇，自己在一个有钱人家里给他们的女儿做家教' +
              '，太太是一个头脑简单出手又阔绰的女人，因为自己要出国留学，所以将家教的职位暂时转交给基宇。就这样，基宇来到了朴社长（李善均 饰）家中' +
              '，并且见到了他的太太（赵汝贞 饰），' +
              '没过多久，基宇的妹妹和父母也如同寄生虫一般的进入了朴社长家里工作。然而，他们的野心并没有止步于此' +
              '，基宇更是和大小姐坠入了爱河。随着时间的推移，朴社长家里隐藏的秘密渐渐浮出了水面。',
          date: '2020-10-10',
        },
        {
          id: 2,
          name: 'test',
          image: require('../assets/interstellar2.png'),
          introduction: 'testtesttesttesttesttesttest',
          date: '2020-10-10',
        },
        {
          id: 3,
          name: 'test',
          image: require('../assets/interstellar2.png'),
          introduction: 'testtesttesttesttesttesttest',
          date: '2020-10-10',
        },
      ],
      actors: [],
      ratings: [5,5,5],
      stars: ["red"],
    }
  },
  watch: {
    '$route.query.query': function (newVal, oldVal) {
      if (newVal === oldVal) {
        return;
      }
      this.$emit('showSearchBar', newVal);
      this.refresh();
    }

  },
  methods: {
    async refresh() {
      let response = await searchMovie(
          {
            query: this.$route.query.query,
            limit: 100,
            offset: 1,
          }
      );
      if (response.status === 200) {
        this.movie_results = response.data.movies;
      }

      response = await searchActor(
          {
            query: this.$route.query.query,
            limit: 100,
            offset: 1,
          }
      );
      if (response.status === 200) {
        this.actors = response.data.celebrities;
      }

      let new_ratings = [];
      let l = this.movie_results.length;
      for (let i = 0; i < l; i++) {
        response = await queryMovieRatings('', this.movie_results[i].id);
        if (response.status === 200) {
          if (response.data.current_user !== null) {
            new_ratings.push(response.data.current_user.value / 2);
          } else {
            new_ratings.push(0);
          }
        }
      }
      this.ratings = new_ratings;

      let new_stars = [];
      for (let i = 0; i < l; i++) {
        response = await queryMovieStar('', this.movie_results[i].id);
        if (response.status === 200) {
          if (response.data.liked === true) {
            new_stars.push(true);
          } else {
            new_stars.push(false);
          }
        }
      }
      this.stars = new_stars;

    },


    jumpToMovie(movie) {
      this.$router.push({path: '/movie/' + movie.id});
    },



    async addReview() {
      let response = await addReview(
          {
            title: this.review_title,
            content: this.content
          },
          this.$route.params.id
      );
      console.log(response);
      this.$router.back();
    },

    async addStar(movie_id) {
      let user_id = this.$store.getters['user/id'];
      let response = await starMovie('', user_id, movie_id);
      response = await queryMovieStar('', movie_id);
      if (response.status === 200) {
        this.stared = response.data.liked;
        this.$message.success("收藏成功");
      }
      await this.refresh();
    },
    async cancelStar(movie_id) {
      let user_id = this.$store.getters['user/id'];
      let response = await unstarMovie('', user_id, movie_id);
      response = await queryMovieStar('', movie_id);
      if (response.status === 200) {
        this.$message.success("取消收藏");
        this.stared = response.data.liked;
      }
      await this.refresh();
    },

    async changeStar(movie_id) {
      let response = await queryMovieStar('', movie_id);
      let starred = false;
      if (response.status === 200) {
        starred = response.data.liked;
      }
      if (starred) {
        await this.cancelStar(movie_id);
      } else {
        await this.addStar(movie_id);
      }
    },

    async submitRating(i, movie_id) {
      let response = await submitMovieRating(
          {
            value: this.ratings[i] * 2,
            content: "该用户没有留下评论",
          },
          movie_id);
      if (response.status === 200) {
        console.log(this.ratings[i]);
        console.log(response);
        this.$message.success("评分成功");
        this.is_rating = false;
        await this.refresh();
      }
    },

    async heart_color(movie_id) {
      let response = await queryMovieStar('', movie_id);
      if (response.status === 200) {
        if (response.data.liked === true) return "red";
        else return "green";
      }
      await this.refresh();
    },

  },

  computed: {

  }
}
</script>