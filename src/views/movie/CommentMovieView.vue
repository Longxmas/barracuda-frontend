<template>
  <div id="commentMovie" v-if="!loading">
    <v-tabs centered v-model="activeIndex">
      <v-tab @click="jumpToOverView" :href="`#tab-1`">概览</v-tab>
      <v-tab @click="jumpToMedia" :href="`#tab-2`">媒体</v-tab>
      <v-tab :href="`#tab-3`">短评区</v-tab>
      <v-tab @click="jumpToReview" :href="`#tab-4`">影评区</v-tab>
    </v-tabs>

    <v-tabs-items v-model="activeIndex">
      <v-tab-item :value="`tab-3`">
        <v-container fluid style="width: 90%; margin-top: 0; margin-left: 50px">

          <v-row>
            <v-col class="px-0" cols="9">
              <v-card style="margin-top: 10px; overflow: scroll; min-width: 600px" elevation="0">
                <h1>所有短评</h1>
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
                                            <a style="font-size: 16px" class="my-auto pl-3" :href="'/user/' + comment.author_details.id">
                                              {{ comment.author_details.nickname}}
                                            </a>
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
                                        line-height: 15px;
                                        max-height: 45px;
                                        font-family: 微软雅黑,serif;
                                        font-size: 14px;
                                        color: dimgray;
                                        margin-bottom: 0">
                                              {{ comment.content}} </p>
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

            <v-col cols="3">
              <v-card flat class="mt-0">
                <v-card-title>
                  <a :href="'/movie/' + movie.id">{{ movie.movie_name }}</a>
                </v-card-title>
                <v-card-text>
                  <v-img :src="movie.image"
                         height="300px"
                         width="225px"></v-img>
                  <v-container class="pt-8">
                    <v-row>
                      <span>导演： {{ movie_director }}</span>
                    </v-row>
                    <v-row>
                      <span>主演：</span>
                      <span v-for="(actor, i) in actors" :key=i>{{ actor.celebrity_name }}</span>
                    </v-row>
                    <v-row>
                      <span>类型：</span>
                      <span v-for="(type, i) in movie.genres.slice(0,4)" :key=i>{{ type.name}} &ensp;</span>
                    </v-row>
                    <v-row>
                      <span>地区：{{ movie.region }}</span>
                    </v-row>
                    <v-row>
                      <span>上映时间：{{ movie.release_date }}</span>
                    </v-row>
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
  queryMovieDetail,
  queryMoviePositionStaff,
  queryMovieRatings,
} from "@/api/movie";
import {apiUrl} from "@/api/request";

export default {
  name: 'CommentMovieView',
  async mounted() {
    await this.refresh();
  },
  data() {
    return {
      loading: true,
      activeIndex: 'tab-3',
      movie: {},
      all_comments: [],
      actors: [],
      movie_director: "",
    }
  },
  methods: {
    async refresh() {
      let response = await queryMovieDetail('', this.$route.params.id);
      if (response.status === 200) {
        this.movie = response.data;
      }

      response = await queryMovieRatings('', this.$route.params.id);
      if (response.status === 200) {
        this.all_comments = response.data.rating.reverse();
        for (let i = 0 ; i < this.all_comments.length; i++) {
          this.all_comments[i].author_details.avatar = apiUrl + this.all_comments[i].author_details.avatar;
        }

      }

      response = await queryMoviePositionStaff({ position: 0,}, this.$route.params.id);
      if (response.status === 200) {
        this.movie_director = response.data.staffs[0].celebrity_name;
      }

      response = await queryMoviePositionStaff({ position: 2,}, this.$route.params.id);
      if (response.status === 200) {
        this.actors = response.data.staffs.slice(0, 2);
      }
      this.loading = false;
      //console.log(this.actors)
    },
    jumpToReview() {
      this.$router.push('/movie/' + this.$route.params.id + '/review');
    },
    jumpToMedia() {
      this.$router.push('/movie/' + this.$route.params.id + '/media/images');
    },
    jumpToOverView() {
      this.$router.push('/movie/' + this.$route.params.id);
    },
    judgePosition(i) {
      if (i % 2 === 1) {
        return "d-flex flex-row-reverse";
      } else {
        return "d-flex flex-row"
      }
    }
  },
  computed: {}
}
</script>