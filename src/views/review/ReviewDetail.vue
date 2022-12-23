<template>
  <div id="reviewDetail">
    <v-container fluid style="width: 90%; margin-top: 10px;margin-left: 50px;
                            min-width:900px; overflow: scroll" v-if="!loading">
      <v-row>
        <v-col cols="9">
          <v-card elevation="0">
            <v-card-title>
              <v-container fluid class="pl-5">
                <v-row>
                  <h2>{{ review.title }}</h2>
                </v-row>
                <v-row class="pt-5">
                  <v-avatar>
                    <v-img :src="author_details.avatar"></v-img>
                  </v-avatar>
                  &ensp;
                  <a style="margin-top: 15px; margin-bottom: 15px; font-size: 16px"
                     @click="jumpToUserProfile(author_details.id)">
                    {{ author_details.nickname }}</a>
                  &ensp;
                  <p style="margin-top: 15px; margin-bottom: 15px; font-size: 16px">评论</p>
                  &ensp;
                  <a style="margin-top: 15px; margin-bottom: 15px; font-size: 16px"
                     @click=jumpToMovie>{{ movie_details.movie_name }}</a>
                  &ensp;
                  <p class="my-auto" style="font-size: 16px"> {{ review.created_at }} </p>
                  <v-spacer></v-spacer>
                </v-row>


                <v-row class="py-3">
                  <mavon-editor
                      v-model="review.content"
                      :subfield="false" :toolbarsFlag="false" defaultOpen="preview"
                      box-shadow-style="0 0 0 0 rgba(0,0,0,0)"
                      preview-background="#fff"
                  />
                </v-row>

                <v-row class="pl-5 pb-5" style="text-align: center">
                  <v-col class="mx-auto">
                    <v-btn large class="mr-5" style="color: white;background-color: skyblue"
                           @click="changeLike()">
                      <v-icon class="my-auto" :color="heart_color"> mdi-heart</v-icon>
                      &ensp;已有点赞&ensp;
                      {{ review.likes }}
                    </v-btn>

                    <v-btn large class="mr-5" style="color: white;background-color: darkorange" @click="toBottom">
                      <v-icon class="my-auto"> mdi-message</v-icon>
                      &ensp;已有回复&ensp;
                      {{ review.reply_count }}
                    </v-btn>

                    <v-btn large class="mr-5" style="color: white;background-color: red"
                           @click="deleteReview()" v-if="isAdmin || checkPrivilege">
                      <v-icon class="my-auto"> mdi-delete</v-icon>
                      &ensp;删除这篇影评&ensp;
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-title>
          </v-card>

          <v-divider></v-divider>

          <v-card class="mt-10" elevation="0" min-width="1000px" style="overflow: scroll;">
            <v-card-title><h3>回复</h3></v-card-title>

            <v-list class="py-0 pl-0" width="95%">
              <v-list-item
                  v-for="(comment, i) in replies"
                  :key=i
                  class="pl-0">
                <v-container>
                  <v-row class="pl-0">
                    <v-col cols="1" class="px-0">
                      <v-avatar tile class="ml-5 pt-2" size="55">
                        <v-img :src="comment.author_details.avatar"></v-img>
                      </v-avatar>
                    </v-col>
                    <v-col class="mx-1 pt-1">
                      <v-card elevation="0" class="mb-0 mx-0" width="90%">
                        <v-card-text class="pa-0">
                          <v-container fluid>
                            <v-row>
                              <v-col class="pl-0 ">
                                <v-container fluid>

                                  <v-row class="pl-0" style="background-color: #dff2fa">
                                    <a style="font-size: 16px; line-height: 25px"
                                       class="my-auto pl-3" @click="jumpToUserProfile(comment.author_details.id)">
                                      {{ comment.author_details.nickname }}</a>
                                    <span class="my-auto pl-3">{{ comment.create_at }}</span>
                                    <v-btn text
                                           class="my-auto pl-3"
                                           v-if="isAdmin || currentUser === comment.author_details.id.toString()"
                                           @click="deleteComment(comment)">
                                      删除
                                    </v-btn>
                                  </v-row>

                                  <v-row class="pt-2 pl-1 pr-2">
                                    <p style="text-overflow: ellipsis;
                                        overflow: hidden;
                                        display: -webkit-box;
                                        -webkit-box-orient: vertical;
                                        -webkit-line-clamp: 3;
                                        line-height: 20px;
                                        max-height: 60px;
                                        font-family: 微软雅黑,serif;
                                        font-size: 15px;
                                        color: black;
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

              <v-list-item class="pl-0">
                <v-container>
                  <v-row class="pl-0 py-0 my-0">
                    <v-col cols="1" class="px-0">
                      <v-avatar tile class="ml-5 pt-2" size="55">
                        <v-img :src="this.$store.getters['user/avatar']"></v-img>
                      </v-avatar>
                    </v-col>
                    <v-col class="pt-0 py-0 my-0" cols="10">
                      <v-card-text class="pl-1 pb-0">
                        <v-textarea
                            class="ml-0 pl-0 py-0 my-0"
                            filled
                            auto-grow
                            row-height="20px"
                            placeholder="添加回复"
                            background-color="green lighten-5"
                            v-model="reply_cotent"
                        >
                        </v-textarea>
                      </v-card-text>
                    </v-col>
                  </v-row>

                  <v-row class="py-0 my-0">
                    <v-col cols="9">
                      <span></span>
                    </v-col>
                    <v-col class="my-0 py-0">
                      <v-btn color="green lighten-3" style="color: white" class="ml-5 mt-0"
                             @click="submitReply"
                      >添加回复
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>

        <v-col cols="3">
          <v-card class="mt-10" flat>
            <v-card-title>
              <a @click="jumpToMovie">{{ movie_details.movie_name }}</a>
            </v-card-title>
            <v-card-text>
              <v-img :src="movie_details.movie_poster_path"
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
                  <span v-for="(type, i) in movie.genres.slice(0,4)" :key=i>{{ type.name }} &ensp;</span>
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


  </div>
</template>

<script>
import {
  queryMovieDetail,
  queryMoviePositionStaff,
} from "@/api/movie";
import {
  addReviewLike,
  cancelReviewLike,
  queryReviewDetail,
  queryReviewLike,
  queryReviewReply,
  submitReviewReply
} from "@/api/review";
import {apiUrl, deleteRequest} from "@/api/request";

export default {
  name: 'reviewDetail',
  created() {
    this.breadcrumbs_items[1].text = this.review.movie_name;
  },
  async mounted() {
    await this.refresh();
  },

  data() {
    return {
      loading: true,
      activeIndex: 'tab-3',
      breadcrumbs_items: [
        {
          text: '电影',
          disabled: false,
          href: '/movie',
        },
        {
          text: '',
          disabled: false,
          href: '/moviereview',
        },
        {
          text: '一般讨论',
          disabled: true,
        }
      ],
      review: {},
      author_details: {},
      movie_details: {},
      replies: [],
      movie_director: "约翰·李·汉考克 John Lee Hancock",
      movie_id: 1,
      movie: {},
      reply_title: "影评回复",
      reply_cotent: "",
      liked: false,
    }

  },
  methods: {
    async refresh() {
      let response = await queryReviewDetail('', this.$route.params.id);
      if (response.status === 200) {
        this.review = response.data;
        this.author_details = response.data.author_details;
        this.author_details.avatar = apiUrl + this.author_details.avatar;
        this.movie_id = response.data.movie_details.movie_id;
        this.movie_details = response.data.movie_details;
      }

      response = await queryMovieDetail('', this.movie_id);
      if (response.status === 200) {
        this.movie = response.data;
      }

      response = await queryReviewReply('', this.$route.params.id);
      if (response.status === 200) {
        this.replies = response.data.replies;
        for (let i = 0; i < this.replies.length; i++) {
          this.replies[i].author_details.avatar = apiUrl + this.replies[i].author_details.avatar;
        }
      }

      response = await queryMoviePositionStaff({position: 0,}, this.movie_id);
      if (response.status === 200) {
        this.movie_director = response.data.staffs[0].celebrity_name;
      }

      response = await queryMoviePositionStaff({position: 2,}, this.movie_id);
      if (response.status === 200) {
        this.actors = response.data.staffs.slice(0, 2);
      }

      response = await queryReviewLike('', this.$route.params.id);
      if (response.status === 200) {
        this.liked = response.data.liked;
      }

      this.loading = false
    },

    jumpToOverView() {
      this.$router.push('/movie');
    },
    jumpToMedia() {
      this.$router.push('/movie/'+this.$route.params.id+'/media/images');
    },
    jumpToMovie() {
      this.$router.push('/movie/' + this.movie_id);
    },
    jumpToUserProfile(user_id) {
      this.$router.push('/user/' + user_id);
    },

    async submitReply() {
      let response = await submitReviewReply(
          {
            value: this.reply_title,
            content: this.reply_cotent,
          }, this.$route.params.id);
      if (response.status === 200) {
        this.$message.success("回复成功");
        this.reply_cotent = "";
        await this.refresh();
      }
    },
    async addLike() {
      let response = await addReviewLike('', this.$route.params.id);
      response = await queryReviewLike('', this.$route.params.id);
      if (response.status === 200) {
        this.liked = response.data.liked;
        console.log(response.data)
      }
      await this.refresh();
    },
    async cancelLike() {
      let response = await cancelReviewLike('', this.$route.params.id);
      response = await queryReviewLike('', this.$route.params.id);
      if (response.status === 200) {
        this.liked = response.data.liked;
      }
      await this.refresh();
    },

    async changeLike() {
      if (this.liked) {
        await this.cancelLike();
      } else {
        await this.addLike();
      }
    },

    toBottom() {
      window.scrollTo(0, 500000);
    },

    async deleteReview() {
      let response = await deleteRequest('/review/' + this.$route.params.id + '/', '');
      if (response.status === 200) {
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        await this.$router.push({path: '/movie/' + this.movie.id});
      }
    },

    async deleteComment(comment) {
      let response = await deleteRequest('/reply/' + comment.id + '/', '');
      if (response.status === 200) {
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        await this.refresh();
      }
    },

  },
  computed: {
    checkPrivilege() {
      let currentUserID = this.$store.getters['user/id'];
      console.log(currentUserID.toString() === this.$route.params.id.toString())
      console.log(JSON.stringify(this.author_details))
      return currentUserID.toString() === this.author_details.id.toString();
    },
    isAdmin() {
      console.log("ROLE")
      console.log(this.$store.getters['user/role'])
      return this.$store.getters['user/role'] === 'admin';
    },
    currentUser() {
      return this.$store.getters['user/id'].toString();
    },
    heart_color: function () {
      if (this.liked) {
        return "red";
      } else {
        return "white";
      }
    },
  }
}
</script>