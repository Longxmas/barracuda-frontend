<template>
  <div id="movieView" v-if="!loading">
    <v-tabs centered v-model="activeIndex">
      <v-tab :href="`#tab-1`">概览</v-tab>
      <v-tab @click="jumpToMedia" :href="`#tab-2`">媒体</v-tab>
      <v-tab @click="jumpToComment" :href="`#tab-3`">短评区</v-tab>
      <v-tab @click="jumpToReview" :href="`#tab-4`">影评区</v-tab>
    </v-tabs>

    <v-tabs-items v-model="activeIndex">
      <v-tab-item :value="`tab-1`"> <!--概览部分-->
        <v-container fluid style="width: 90%; min-width: 1200px; overflow: hidden">
          <v-row>
            <v-col cols="3">
              <v-img
                  min-height="400px"
                  max-height="1000px"
                  aspect-ratio="0.75"
                  contain
                  :src=movie.image
                  style="border-radius: 10px"
              ></v-img>
            </v-col>

            <v-col cols="8">
              <v-card-text>
                <v-row class="mt-0 pb-2">
                  <h1 style="font-size: 40px; height: auto; line-height: 50px">{{ movie.movie_name }} &ensp;
                    ({{ movie.release_date.substring(0, 4) }})</h1>
                </v-row>
                <v-row>
                  <h3 class="mt-2">{{ movie.release_date }} ({{ movie.region }})</h3>
                  <h1 class="mt-2">·</h1>
                  <h3 v-for="(tag,k) in movie.genres" :key="k">
                    <v-chip class="mt-0">
                      {{ tag.name }}
                    </v-chip>&ensp;
                  </h3>
                  <h1 class="mt-2">·</h1>
                  <h3 class="mt-2">{{ movie.duration }}</h3>
                </v-row>
                <v-row class="pt-5 pb-5">
                  <v-progress-circular
                      :value="movie.vote_average * 10"
                      color="#13C00DFF"
                      width="5"
                      size="60"
                      rotate="270"
                      style="background-color: #0b1c22; border-radius: 100%"
                      class="mr-3"
                  >
                    <span style="color: white; font-family: gotham-bold,serif; font-size: 25px">{{
                        Math.round(movie.vote_average * 10)
                      }}</span>
                  </v-progress-circular>
                  <h3 class="my-auto">用户评分</h3>
                  &ensp;

                  <v-chip
                      class="my-auto mx-10"
                      dark
                      color="primary"
                      text-color="white"
                      @click="changeStar"
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

                  <v-dialog v-model="is_rating" max-width="800px" scrollable>
                    <v-card>
                      <v-toolbar color="green lighten-3" class="text-h6" style="color: white">
                        <span class="pl-3">写短评</span>
                        <v-spacer></v-spacer>
                        <v-icon @click="is_rating = false;">
                          mdi-close
                        </v-icon>
                      </v-toolbar>

                      <v-card>
                        <v-card-text>
                          <h2 class="pl-3" style="color: black; font-size: 20px">评个分吧</h2>
                          <v-rating
                              v-model="rating"
                              color="yellow darken-3"
                              background-color="grey darken-1"
                              empty-icon="$ratingFull"
                              half-increments
                              large
                              hover
                          ></v-rating>
                        </v-card-text>
                      </v-card>

                      <v-card>
                        <v-card-text>
                          <textarea v-model="rating_content"
                                    placeholder="请留下您对这部电影的简短评论"
                                    class="ml-3"
                                    style="align-self: center; width: 100%; min-height: 150px;
                                        outline: none; resize: none"
                          >
                          </textarea>
                          <v-btn class="ml-2" color="green lighten-3" style="color: white"
                                 @click="submitRating"
                          > 提交
                          </v-btn>
                          <v-btn class="ml-2" color="red lighten-3" style="color: white"
                                 @click="deleteRating"
                          > 删除已有评分
                          </v-btn>
                        </v-card-text>
                      </v-card>

                    </v-card>
                  </v-dialog>


                </v-row>
                <v-row>
                  <h2 class="my-2">剧情简介</h2>
                </v-row>

                <v-row>
                  <p style="font-size: medium">{{ movie.overview }}</p>
                </v-row>

                <v-row>
                  <v-col class="pl-0 pt-6" cols="5">
                    <p style="font-size: medium; font-weight: bold; margin-bottom: 4px">导演</p>
                    <p style="font-size: medium">{{ director.celebrity_name }}</p>
                  </v-col>

                  <v-col class="pl-0 pt-6" cols="5">
                    <p style="font-size: medium; font-weight: bold; margin-bottom: 4px">编剧</p>
                    <p style="font-size: medium">{{ writer.celebrity_name }}</p>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-col>
          </v-row>
        </v-container>


        <v-container fluid style="width: 90%; min-width: 1200px" class="mx-auto">
          <v-row class="pl-0">
            <v-col cols="10" class="pl-0">

              <v-card style="margin:10px" elevation="0">
                <v-card-title><h3>主创团队</h3></v-card-title>
                <v-card-text>

                  <ul class="poster-ul">
                    <li v-for="(item,i) in actors"
                        :key="i"
                        style="display: inline-block;">
                      <v-card
                          elevation="0"
                          style="border-radius: 0; text-align: center"
                          :href="'/actor/'+item.id"
                      >
                        <img
                            alt="主演"
                            :src="item.image"
                            style="border-radius: 0;"
                            :style="calculateImageFitPattern(300,item.image)"/>
                        <v-card-text class="text--primary" style="padding: 8px; text-align: center">
                          <span>{{ item.celebrity_name }}</span>
                        </v-card-text>
                      </v-card>
                    </li>
                  </ul>

                  <!--<a><h3 style="color: black" class="mt-5">完整演职人员表</h3></a>-->
                </v-card-text>
              </v-card>

              <v-divider></v-divider>

              <v-card style="margin-top: 10px" elevation="0">
                <v-card-title class="pb-1"><h3>最新影评</h3>
                  <v-spacer></v-spacer>
                  <v-btn class="mr-4" @click="jumpToAddReview">
                    <v-icon>mdi-pen</v-icon>
                    &ensp;
                    我要写影评
                  </v-btn>
                </v-card-title>
                <v-card-text>
                  <v-list class="ml-0 pl-0 my-0">
                    <v-list-item
                        v-for="(review,i) in reviews"
                        :key=i
                        class="ml-0 pl-0"
                    >
                      <v-card elevation="2" class="mb-5" width="100%">
                        <v-card-text class="pa-0">
                          <v-container fluid>
                            <v-row>
                              <v-col class="pl-0">
                                <v-container fluid>

                                  <v-row class="pl-0">
                                    <v-avatar class="ml-5">
                                      <v-img :src="review.author_details.avatar"></v-img>
                                    </v-avatar>
                                    <a style="font-size: 16px" class="my-auto pl-3"
                                       @click="jumpToUserProfile(review.author_details.id)">
                                      {{ review.author_details.nickname }}</a>
                                    <span class="my-auto pl-3">{{ review.create_at }}</span>
                                  </v-row>

                                  <v-row class="pl-0">
                                    <v-col class="pl-5">
                                      <a @click="jumpToMovieReview(review)">
                                        <h2 style="font-family: 微软雅黑,serif;font-size: 20px;color: black; line-height: normal"
                                            class="my-2 pa-0 ">{{ review.title }}</h2>
                                      </a>
                                    </v-col>
                                  </v-row>

                                  <v-row class="pl-5">
                                    <p style="text-overflow: ellipsis;
                                        overflow: hidden;
                                        display: -webkit-box;
                                        -webkit-box-orient: vertical;
                                        -webkit-line-clamp: 3;
                                        line-height: 20px;
                                        max-height: 60px;
                                        font-family: 微软雅黑,serif;
                                        font-size: 14px;
                                        color: dimgray;">
                                      {{ review.content }} </p>
                                  </v-row>

                                  <v-row class="pl-5">
                                    <v-btn small class="mr-5" style="color: white;background-color: skyblue"
                                           @click="jumpToMovieReview(review)">
                                      <v-icon small class="my-auto"> mdi-heart</v-icon>
                                      &ensp;
                                      {{ review.likes }}
                                    </v-btn>

                                    <v-btn small class="mr-5" style="color: white;background-color: darkorange"
                                           @click="jumpToMovieReview(review)">
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

              <v-divider></v-divider>

              <v-card style="margin:10px" elevation="0">
                <v-card-title><h3>媒体</h3></v-card-title>
                <v-card-text>

                  <v-container fluid class="pl-0 ml-0">
                    <ul class="poster-ul">
                      <li v-for="(item,i) in pictures"
                          :key="i"
                          style="display: inline-block; height: 400px">
                        <v-card
                            elevation="10"
                            style="border-radius: 0"
                        >
                          <img
                              alt="媒体"
                              :src="item.image_path"
                              style="border-radius: 0;"
                              :style="calculateImageFitPattern(400,item.image_path)">
                        </v-card>
                      </li>
                    </ul>
                  </v-container>
                  <a @click="jumpToMedia"><h3 style="color: black" class="mt-5">查看全部媒体</h3></a>

                </v-card-text>
              </v-card>

              <v-divider></v-divider>

              <v-card style="margin-top: 10px" elevation="0">
                <v-card-title class="pb-1"><h3>最新短评</h3>
                  <v-spacer></v-spacer>
                  <v-btn class="mr-4" @click="is_rating=true">
                    <v-icon>mdi-pen</v-icon>
                    &ensp;
                    我要写短评
                  </v-btn>
                </v-card-title>

                <v-card-text class="pl-0 ml-0 pb-0 mb-0">

                  <v-container fluid class="pl-0 ml-0 pt-0 mt-0">
                    <v-list class="py-0">
                      <v-list-item
                          v-for="(comment, i) in ratings"
                          :key=i
                          :class=judgePosition(i)>
                        <v-container>
                          <v-row :class="judgePosition(i)">
                            <v-col cols="1" class="px-0">
                              <v-avatar tile class="ml-5 pt-2">
                                <v-img :src="comment.author_details.avatar"></v-img>
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
                                            <a style="font-size: 16px"
                                               class="my-auto pl-3"
                                               @click="jumpToUserProfile(comment.author_details.id)">
                                              {{ comment.author_details.nickname }}</a>
                                            <v-rating class="my-auto pl-3"
                                                      :value="comment.value / 2" color="amber" dense
                                                      half-increments readonly
                                                      size="18">
                                            </v-rating>
                                            <span class="my-auto pl-3">{{ comment.create_at }}</span>
                                          </v-row>

                                          <v-row class="pt-2 pl-3 pr-2" :class=judgePosition(i)>
                                            <p style="text-overflow: ellipsis;
                                        overflow: hidden;
                                        display: -webkit-box;
                                        -webkit-box-orient: vertical;
                                        -webkit-line-clamp: 3;
                                        line-height: 18px;
                                        max-height: 54px;
                                        font-family: 微软雅黑,serif;
                                        font-size: 14px;
                                        color: dimgray;
                                        margin-bottom: 0">
                                              {{ comment.content }} </p>
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
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import {
  deleteMovieRating,
  queryMovieDetail,
  queryMovieImages,
  queryMoviePositionStaff,
  queryMovieRatings,
  queryMovieReviews,
  queryMovieStaff, queryMovieStar, submitMovieRating
} from "@/api/movie";
import {starMovie, unstarMovie} from "@/api/user";
import {apiUrl} from "@/api/request";

export default {
  name: "movieDetail",
  async mounted() {
    await this.refresh();
  },
  data() {
    return {
      loading: true,
      name: "movieView",
      activeIndex: "tab-1",
      movie: {},
      actors: [],
      director: [],
      writer: [],
      reviewHeaders: [
        {text: "头像", value: "avatar"},
        {text: "标题", value: "title"},
        {text: "回复数", value: "reply_count"},
        {text: "点赞数", value: "like_count"},
        {text: "时间", value: "time"},
        {text: "用户", value: "user"},
      ],
      reviews: [],
      is_rating: false,
      rating: 5,
      rating_content: "",
      pictures: [],
      ratings: [],
      stared: false,
    };
  },
  methods: {
    async refresh() {
      let response = await queryMovieDetail('', this.$route.params.id);
      if (response.status === 200) {
        this.movie = response.data;
      }
      response = await queryMovieStaff('', this.$route.params.id);
      if (response.status === 200) {
        this.actors = response.data.celebrities;
      }
      response = await queryMovieReviews('', this.$route.params.id);
      if (response.status === 200) {
        let len1 = response.data.reviews.length;
        this.reviews = response.data.reviews.slice(len1 - 3, len1).reverse();
        for (let i = 0; i < this.reviews.length; i++) {
          this.reviews[i].author_details.avatar = apiUrl + this.reviews[i].author_details.avatar;
        }
      }
      response = await queryMovieRatings('', this.$route.params.id);
      if (response.status === 200) {
        let len2 = response.data.rating.length;
        this.ratings = response.data.rating.slice(len2 - 4, len2).reverse();
        if (response.data.current_user != null) {
          this.rating = response.data.current_user.value / 2;
          this.rating_content = response.data.current_user.content;
        }
        for (let i = 0; i < this.ratings.length; i++) {
          this.ratings[i].author_details.avatar = apiUrl + this.ratings[i].author_details.avatar;
        }
      }
      response = await queryMovieImages('', this.$route.params.id);
      if (response.status === 200) {
        this.pictures = response.data.images;
      }

      response = await queryMoviePositionStaff({position: 0,}, this.$route.params.id);
      if (response.status === 200) {
        this.director = response.data.staffs[0];
      }


      response = await queryMoviePositionStaff({position: 1,}, this.$route.params.id);
      if (response.status === 200) {
        this.writer = response.data.staffs[0];
      }

      response = await queryMovieStar('', this.$route.params.id);
      if (response.status === 200) {
        this.stared = response.data.liked;
      }
      this.loading = false
      //console.log(this.actors)
    },
    jumpToReview() {
      this.$router.push('/movie/' + this.$route.params.id + '/review');
    },
    jumpToMedia() {
      this.$router.push('/movie/' + this.$route.params.id + '/media/images');
    },
    jumpToComment() {
      this.$router.push('/movie/' + this.$route.params.id + '/comment');
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


    calculateImageFitPattern(fixedHeight, src) {
      let imgObj = new Image();
      imgObj.src = src;
      let ratio = imgObj.width / imgObj.height;
      return "width: " + fixedHeight * ratio + "px; height: " + fixedHeight + "px;";
    },
    judgePosition(i) {
      if (i % 2 === 1) {
        return "d-flex flex-row-reverse";
      } else {
        return "d-flex flex-row"
      }
    },
    async submitRating() {
      let content = this.rating_content === "" ? "该用户没有留下评论" : this.rating_content;
      let response = await submitMovieRating(
          {
            value: this.rating * 2,
            content: content,
          },
          this.$route.params.id);
      if (response.status === 200) {
        this.$message.success("评分成功");
        this.is_rating = false;
        await this.refresh();
      }
    },

    async deleteRating() {
      let response = await queryMovieRatings('', this.$route.params.id);
      if (response.data.current_user === null) {
        this.$message.error("您还没有评分");
        return;
      }
      response = await deleteMovieRating('', this.$route.params.id);
      if (response.status === 200) {
        this.$message.success("删除评分成功");
        this.is_rating = false;
        this.rating_content = "";
        this.rating = 5;
        await this.refresh();
      }
    },

    async addStar() {
      let user_id = this.$store.getters['user/id'];
      let response = await starMovie('', user_id, this.$route.params.id);
      response = await queryMovieStar('', this.$route.params.id);
      if (response.status === 200) {
        this.stared = response.data.liked;
        this.$message.success("收藏成功");
      }
      await this.refresh();
    },
    async cancelStar() {
      let user_id = this.$store.getters['user/id'];
      let response = await unstarMovie('', user_id, this.$route.params.id);
      response = await queryMovieStar('', this.$route.params.id);
      if (response.status === 200) {
        this.$message.success("取消收藏");
        this.stared = response.data.liked;
      }
      await this.refresh();
    },

    async changeStar() {
      if (this.stared) {
        await this.cancelStar();
      } else {
        await this.addStar();
      }
    },

  },
  computed: {
    heart_color: function () {
      if (this.stared) {
        return "red";
      } else {
        return "white";
      }
    },

  },
}

</script>

<style scoped>

.poster-ul {
  overflow-x: scroll;
  white-space: nowrap; /* ul中的内容不换行 */
}
</style>