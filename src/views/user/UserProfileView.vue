<template>
  <div id="UserProfileView" v-if="!loading">

    <!-- user profile page-->
    <!-- avator -->
    <div class="user-background">
      <div class="inner_content">
        <v-container fluid>
          <v-row class="my-6">
            <v-avatar size="150px" style="margin-left: 8%" v-if="!checkPrivilege">
              <v-img :src="user.avatar"></v-img>
            </v-avatar>
            <v-tooltip bottom v-else>
              <template v-slot:activator="{ on, attrs }">
                <el-upload
                    name="avatar"
                    v-model="fileList"
                    :action="'http://localhost:8080/api/user/'"
                    :on-change="uploadAvatar"
                    :auto-upload="false"
                    size="150px"
                    :show-file-list="false"
                    style="margin-left: 8%"
                >
                  <v-avatar size="150px" style="margin-left: 8%" v-bind="attrs" v-on="on">
                    <v-img :src="user.avatar"></v-img>
                  </v-avatar>
                </el-upload>
              </template>
              <span>点击修改头像</span>
            </v-tooltip>


            <v-card style="background-color: transparent; margin-left: 5%" elevation="0" class="py-10">
              <v-card-text>
                <span class="user-name"> {{ user.nickname }}</span>
                <v-chip color="red" v-if="checkPrivilege && isAdmin" class="ml-5 mb-4">
                  Lv.6 管理员
              </v-chip>
              </v-card-text>
            </v-card>
          </v-row>
        </v-container>
      </div>
    </div>

    <v-tabs centered v-model="topTabName">
      <v-tab style="color: black">概览</v-tab>
      <v-tab style="color: black">影评</v-tab>
      <v-tab style="color: black">片单</v-tab>
      <v-tab style="color: black">关注影人</v-tab>
      <v-tab style="color: black">兴趣小组</v-tab>
    </v-tabs>


    <v-tabs-items v-model="topTabName">
      <v-tab-item>
        <!--概览部分-->
        <v-card class="mx-auto my-10" max-width="800px" max-height="800px">
          <v-img :src="user.infoBackground">

          </v-img>
          <v-container fluid>
            <v-row class="my-2">
              <v-col cols="4">
                <v-card-title class="pl-3 pt-1 pb-8"><h2>个人信息</h2></v-card-title>
                <v-card-text>

                  <h4 style="font-size: 19px">用户名</h4>
                  <span style="color: black; font-size: 17px; line-height: 30px">{{ user.username }}</span>
                  <br>
                  <br>
                  <h4 style="font-size: 19px">昵称</h4>
                  <span style="color: black; font-size: 17px; line-height: 30px">{{ user.nickname }}</span>
                  <br>
                  <br>
                  <h4 style="font-size: 19px">邮箱</h4>
                  <span style="color: black; font-size: 17px;  line-height: 30px">{{ user.email }}</span>
                  <br>
                  <br>
                  <h4 style="font-size: 19px">偏好的电影类型</h4>
                  <span style="color: black; font-size: 17px;  line-height: 30px"
                        v-for="(item,k) in user.prefers"
                        :key="k">
                    {{ item.name }}
                  </span>
                  <br>
                  <br>
                  <h4 style="font-size: 19px">注册时间</h4>
                  <span style="color: black; font-size: 17px;  line-height: 30px">{{ user.created_at }} </span>
                </v-card-text>
              </v-col>

              <v-col cols="8">
                <v-card-text style="margin-top: 10%; height: 100%">
                  <h4 style="font-size: 19px">个人描述</h4>
                  <br>
                  <span style="color: black; font-size: 17px">{{ user.description }} </span>

                  <br>
                  <br>


                </v-card-text>
              </v-col>
            </v-row>
          </v-container>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="red" class="my-auto" style="color: white" @click="logout" v-if="checkPrivilege">
              退出登陆
            </v-btn>
            <v-btn color="#41b2e2" style="margin-left: 70%; color: white"
                   class="flex-column-reverse"
                   @click.stop="editInfoDialog=true" v-if="checkPrivilege">
              <span>编辑个人资料</span>
            </v-btn>
          </v-card-actions>
        </v-card>

      </v-tab-item>

      <v-tab-item>
        <v-card elevation="0" width="90%" class="mx-auto">
          <v-card-title>
            <h2>{{ user.nickname }}的影评</h2>
          </v-card-title>
          <v-card-text v-if="reviews.length === 0">
            <h3>{{ user.nickname }}暂无撰写的影评</h3>
          </v-card-text>
          <v-card-text style="padding: 0 0 0 0">
            <v-list>
              <v-list-item
                  v-for="(review,i) in reviews"
                  :key=i
              >
                <v-card elevation="5" class="mb-5" style="border-radius: 10px" width="100%">
                  <v-card-text class="pa-0">

                    <v-container fluid>
                      <v-row>
                        <v-img :src="review.movie_picture" max-width="150px"
                               style="border-bottom-left-radius: 10px; border-top-left-radius: 10px"></v-img>
                        <v-col style="margin-left: 5px">
                          <v-container fluid>

                            <v-row class="pl-0 pt-3">

                              <v-col class="pa-0">
                                <a :href="'/review/' + review.id">
                                  <h3 style="font-family: 微软雅黑,serif;font-size: 20px;color: black; line-height: normal"
                                      class="ma-auto pa-0 "

                                  >{{ review.title }}</h3>
                                </a>

                              </v-col>
                            </v-row>

                            <v-row>
                              <a style="margin-top: 15px; margin-bottom: 15px; font-size: 16px"
                                 :href="'/user/' + user.id">{{ user.name }}</a>
                              &ensp;
                              <p style="margin-top: 15px; margin-bottom: 15px; font-size: 16px">评论</p>
                              &ensp;
                              <a style="margin-top: 15px; margin-bottom: 15px; font-size: 16px"
                                 :href="'/movie/' + review.movie_id">{{
                                  review.movie_name
                                }}</a>
                              &ensp;
                              <p class="my-auto" style="font-size: 16px"> {{ review.time }} </p>
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
                                {{ review.introduction }} </p>
                            </v-row>

                            <v-row>
                              <v-btn small class="mr-5" style="color: white;background-color: skyblue">
                                <v-icon small class="my-auto"> mdi-heart</v-icon>
                                &ensp;
                                {{ review.like_count }}
                              </v-btn>

                              <v-btn small class="mr-5" style="color: white;background-color: darkorange">
                                <v-icon small class="my-auto"> mdi-message</v-icon>
                                &ensp;
                                {{ review.reply_count }}
                              </v-btn>

                              <v-btn small class="mr-5" style="color: white;background-color: limegreen"
                                     @click="deleteReview(review)" v-if="checkPrivilege">
                                <v-icon small class="my-auto"> mdi-delete</v-icon>
                                &ensp;
                                <span class="my-auto">删除影评</span>
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
      </v-tab-item>

      <!--片单-->
      <v-tab-item>
        <v-card elevation="0" width="90%" class="mx-auto">
          <v-card-title>
            <h2>{{ user.nickname }}的收藏</h2>
          </v-card-title>
          <v-card-text v-if="starsMovies.length === 0">
            <h3>{{ user.nickname }}暂无收藏的电影</h3>
          </v-card-text>
          <v-card-text style="padding: 0 0 0 0">
            <v-list>
              <v-list-item
                  v-for="(movie,i) in starsMovies"
                  :key=i
              >
                <v-card elevation="5" class="mb-5" style="border-radius: 10px" width="100%">
                  <v-card-text class="pa-0">

                    <v-container fluid>
                      <v-row>
                        <v-img :src="movie.poster" max-width="150px"
                               style="border-bottom-left-radius: 10px; border-top-left-radius: 10px"></v-img>
                        <v-col style="margin-left: 5px">
                          <v-container fluid>

                            <v-row>
                              <v-progress-circular
                                  :value="80"
                                  color="#13C00DFF"
                                  width="3"
                                  size="40"
                                  rotate="270"
                                  class="ma-auto"
                                  style="background-color: #0b1c22; border-radius: 100%"
                              >
                                <span style="color: white; font-family: gotham-bold,serif; font-size: 20px">80</span>
                              </v-progress-circular>

                              <v-col>
                                <a :href="'/movie/' + movie.id">
                                  <h3 style="font-family: 微软雅黑,serif;font-size: 20px;color: black; line-height: normal"
                                      class="ma-auto pa-0 ">{{ movie.title }}</h3>
                                </a>
                                <span>{{ movie.datePublished }}</span>
                              </v-col>
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
                                {{ movie.introduction }} </p>
                            </v-row>


                            <v-row>
                              <v-col cols="8" sm="2" class="pa-0">
                                <v-menu offset-y>
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        color="indigo"
                                        icon
                                        large
                                        v-bind="attrs"
                                        v-on="on"
                                        @click="getCurrentRate(movie)"
                                    >
                                      <v-icon>mdi-star</v-icon>
                                    </v-btn>
                                  </template>

                                  <v-list>
                                    <v-list-item>
                                      <v-rating
                                          v-model="currentRate"
                                          color="yellow darken-3"
                                          background-color="grey darken-1"
                                          empty-icon="$ratingFull"
                                          half-increments
                                          hover
                                          large
                                          :readonly="!checkPrivilege"
                                          @input="changeRate(movie)"
                                      ></v-rating>
                                    </v-list-item>
                                  </v-list>

                                </v-menu>

                                <span style="font-family: 微软雅黑, serif; font-size: 16px; color: #afb6b5"
                                      v-if="checkPrivilege">我的评分</span>
                                <span style="font-family: 微软雅黑, serif; font-size: 16px; color: #afb6b5" v-else>他/她的评分</span>
                              </v-col>

                              <v-col cols="8" sm="2" class="pa-0">
                                <v-btn icon color="green" large @click="unstarMovie(movie)" v-if="checkPrivilege">
                                  <v-icon>mdi-delete</v-icon>
                                </v-btn>
                                <span style="font-family: 微软雅黑, serif; font-size: 16px; color: #afb6b5"
                                      v-if="checkPrivilege">取消收藏</span>
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
          </v-card-text>

        </v-card>
      </v-tab-item>

      <!-- 关注的影人 -->
      <v-tab-item>
        <v-card elevation="0" width="90%" class="mx-auto">
          <v-card-title>
            <h2>{{ user.nickname }}关注的影人</h2>
          </v-card-title>
          <v-card-text v-if="starsActors.length === 0">
            <h3>{{ user.nickname }}暂无关注的影人</h3>
          </v-card-text>
          <v-card-text style="padding: 0 0 0 0">
            <v-list>
              <v-list-item
                  v-for="(actor,i) in starsActors"
                  :key=i
              >
                <v-card elevation="5" class="mb-5" style="border-radius: 10px" width="100%">
                  <v-card-text class="pa-0">

                    <v-container fluid>
                      <v-row>
                        <v-img :src="actor.avatar" max-width="150px"
                               style="border-bottom-left-radius: 10px; border-top-left-radius: 10px"></v-img>
                        <v-col style="margin-left: 5px">
                          <v-container fluid>

                            <v-row>
                              <v-col>
                                <a :href="'/actor/' + actor.id">
                                  <h3 style="font-family: 微软雅黑,serif;font-size: 20px;color: black; line-height: normal"
                                      class="ma-auto pa-0 ">{{ actor.name }}</h3>
                                </a>

                                <span>{{ actor.birthtime }}</span>
                              </v-col>
                            </v-row>

                            <v-row class="pl-3">
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
                                {{ actor.introduction }} </p>
                            </v-row>


                            <v-row>
                              <v-col cols="8" sm="2" class="pa-0">
                                <v-btn icon color="green" large @click="unStarCelebrity(actor)" v-if="checkPrivilege">
                                  <v-icon>mdi-delete</v-icon>
                                </v-btn>
                                <span style="font-family: 微软雅黑, serif; font-size: 16px; color: #afb6b5"
                                      v-if="checkPrivilege">删除</span>
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
          </v-card-text>

        </v-card>
      </v-tab-item>

      <!--兴趣小组-->
      <v-tab-item>
        <v-card elevation="0" width="90%" class="mx-auto">
          <v-card-title>
            <h2>{{ user.nickname }}加入的兴趣小组</h2>
          </v-card-title>
          <v-card-text v-if="interest_groups.length === 0">
            <h3>{{ user.nickname }}暂无加入的兴趣小组</h3>
          </v-card-text>
          <v-card-text style="padding: 0 0 0 0">
            <v-list>
              <v-list-item
                  v-for="(group,i) in interest_groups"
                  :key=i
              >
                <v-card elevation="5" class="mb-5" style="border-radius: 10px" width="100%">
                  <v-card-text class="pa-0">

                    <v-container fluid>
                      <v-row>
                        <v-img :src="group.avatar" max-width="150px"
                               style="border-bottom-left-radius: 10px; border-top-left-radius: 10px"></v-img>
                        <v-col style="margin-left: 5px">
                          <v-container fluid>

                            <v-row>
                              <v-col>
                                <a :href="'/group/' + group.id">
                                  <h3 style="font-family: 微软雅黑,serif;font-size: 20px;color: black; line-height: normal"
                                      class="ma-auto pa-0 my-auto">{{ group.name }}</h3>
                                </a>
                                <span>创建于{{ group.created_at }}</span>
                              </v-col>
                            </v-row>

                            <v-row class="pl-3 pt-4">
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
                                {{ group.introduction }} </p>
                            </v-row>


                            <v-row>
                              <v-col cols="8" sm="2" class="pa-0">
                                <v-btn icon color="green" large @click="quitGroup(group)" v-if="checkPrivilege">
                                  <v-icon>mdi-delete</v-icon>
                                </v-btn>
                                <span style="font-family: 微软雅黑, serif; font-size: 16px; color: #afb6b5"
                                      v-if="checkPrivilege">退出兴趣小组</span>
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
          </v-card-text>

        </v-card>
      </v-tab-item>


    </v-tabs-items>


    <v-dialog v-model="editInfoDialog" max-width="800px">
      <v-card>
        <v-toolbar color="green lighten-3" class="text-h6">编辑个人资料</v-toolbar>
        <v-card-text>
          <v-form ref="editForm" v-model="editedItem.valid" class="mt-12 mb-1" lazy-validation>
            <v-row>
              <v-col cols="12" sm="8" md="6">
                <v-text-field color="success" v-model="editedItem.id" :label="user_headers[0].text"
                              disabled></v-text-field>
              </v-col>
              <v-col cols="12" sm="8" md="6">
                <v-text-field
                    color="success"
                    v-model="editedItem.nickname"
                    :label="user_headers[1].text"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="8" md="6">
                <v-text-field
                    color="success"
                    v-model="editedItem.email"
                    :label="user_headers[2].text"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="8" md="6">
                <v-text-field
                    color="success"
                    v-model="editedItem.created_at"
                    :label="user_headers[4].text"
                    disabled
                ></v-text-field>
              </v-col>

              <v-card-text>
                <h3 class="title mb-2">偏好的电影类型</h3>

                <v-chip-group
                    v-model="selectedAmenities"
                    column
                    multiple
                >
                  <!-- TODO:用列表进行展示-->
                  <v-chip filter outlined v-for="(item,k) in prefer_headers"
                          :key=k :input-value="item.id">
                    {{ item.text }}
                  </v-chip>
                </v-chip-group>

              </v-card-text>

              <v-col cols="12" sm="8" md="6">
                <v-textarea
                    color="success"
                    :label="user_headers[5].text"
                    v-model="editedItem.description"
                ></v-textarea>
              </v-col>

              <v-col cols="12" sm="8" md="6">
              </v-col>
            </v-row>

            <v-row>
              <v-btn class="ma-2 ml-3" color="success" @click="editInfoDialog = false">取消修改</v-btn>
              <v-btn class="ma-2 ml-3" color="error" @click="submitUserProfile">确认修改</v-btn>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import * as api from "@/api/request";
import {
  deleteReview,
  getJoinedGroups,
  getStarCelebrities,
  getStarMovies,
  getUserProfile,
  getWrittenReviews, quitGroup, unstarCelebrity, unstarMovie, updateProfile
} from "@/api/user";
import Axios from "axios";
import {queryMovieRatings} from "@/api/movie";
import {apiUrl} from "@/api/request";

export default {
  name: "UserProfileView",
  data() {
    return {
      loading: true,
      currentUserID: -1,
      user: {
        infoBackground: require("../../assets/pics/back.jpg")
      },
      editedItem: {},
      currentRate: 5,
      currentComment: "",
      selectedAmenities: [],
      fileList: [],
      editInfoDialog: false,
      avatarInput: null,
      topTabName: "overview",
      starsMovies: [],
      starsActors: [],
      reviews: [],
      interest_groups: [],
      prefer_headers: []
    }
  },

  async mounted() {
    await this.refresh();
  },

  methods: {
    async uploadAvatar(file, fileList) {
      fileList.slice(-1);
      let formData = new FormData();
      formData.append('avatar', file.raw);
      let res = await Axios.post(apiUrl + 'user/' + this.$route.params.id + '/uploadavatar/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*'
        }
      });
      this.fileList = [];
      if (res.status === 200) {
        this.$message.success('上传成功');
        let user_info = await api.getRequest('/userinfo/', '');
        this.$store.commit('user/setAvatar', apiUrl + user_info.data.avatar);
        this.user.avatar = apiUrl + user_info.data.avatar
        await this.refresh();
      } else {
        this.$message.error('上传失败');
      }
    },
    async refresh() {
      this.currentUserID = this.$store.getters["user/id"];
      console.log(this.currentUserID.toString());
      console.log(this.$route.params.id.toString())
      let response = await api.getRequest('/genre/', '');
      for (let i = 0; i < response.data.genres.length; i++) {
        this.prefer_headers[i] = {
          text: response.data.genres[i].name,
          value: response.data.genres[i].id
        }
      }
      response = await getUserProfile('', this.$route.params.id);
      if (response.status === 200) {
        this.user.id = response.data.id;
        this.user.username = response.data.username;
        this.user.nickname = response.data.nickname;
        this.user.avatar = apiUrl + response.data.avatar;
        this.user.email = response.data.email;
        this.user.created_at = response.data.create_at;
        this.user.description = response.data.introduction;
        this.user.prefers = response.data.prefer_types;
        this.user.created_at = response.data.create_at;
        this.editedItem = this.user;
      }
      this.editedItem = this.user;
      response = await getStarMovies('', this.$route.params.id);
      if (response.status === 200) {
        this.starsMovies = []
        for (let i = 0; i < response.data.length; i++) {
          this.starsMovies[i] = {
            id: response.data[i].id,
            introduction: response.data[i].overview,
            title: response.data[i].movie_name,
            poster: response.data[i].image,
            datePublished: response.data[i].release_date,
            rating: response.data[i].vote_average,
          }
        }
      }
      response = await getStarCelebrities('', this.$route.params.id);
      if (response.status === 200) {
        this.starsActors = []
        for (let i = 0; i < response.data.length; i++) {
          this.starsActors[i] = {
            id: response.data[i].id,
            name: response.data[i].celebrity_name,
            introduction: response.data[i].biography,
            avatar: response.data[i].image,
            birthtime: response.data[i].birthday,
          }
        }
      }
      response = await getJoinedGroups('', this.$route.params.id);
      if (response.status === 200) {
        this.interest_groups = []
        for (let i = 0; i < response.data.length; i++) {
          this.interest_groups[i] = {
            id: response.data[i].id,
            introduction: response.data[i].introduction,
            avatar: apiUrl + response.data[i].avatar,
            created_at: response.data[i].create_at,
            name: response.data[i].name,
          }
        }
      }
      response = await getWrittenReviews('', this.$route.params.id);
      if (response.status === 200) {
        this.reviews = []
        for (let i = 0; i < response.data.length; i++) {
          this.reviews[i] = {
            id: response.data[i].id,
            title: response.data[i].title,
            user_name: response.data[i].author_details.username,
            movie_name: response.data[i].movie_details.movie_name,
            movie_id: response.data[i].movie_details.movie_id,
            movie_picture: response.data[i].movie_details.movie_poster_path,
            rating: 5,
            time: response.data[i].create_at,
            like_count: response.data[i].likes,
            reply_count: response.data[i].reply_count,
            introduction: response.data[i].content,
          }
        }
      }
      this.loading = false;
      //console.log(this.reviews)
    },
    async logout() {
      let response = await api.getRequest('/logout/', '');
      if (response.status === 200) {
        this.$message.success('登出成功');
        this.$store.commit('user/setId', '');
        this.$store.commit('user/setUsername', '');
        this.$store.commit('user/setNickname', '');
        this.$store.commit('user/setEmail', '');
        this.$store.commit('user/setRole', '');
        this.$store.commit('user/setAvatar', '');
        this.$store.commit('user/setIslogin', '');
        await this.$router.push('/')
      }
    },
    async submitUserProfile() {
      let payload = {
        nickname: this.editedItem.nickname,
        introduction: this.editedItem.description,
        email: this.editedItem.email,
        prefer_types: []
      }
      for (let i = 0; i < this.selectedAmenities.length; i++) {
        payload.prefer_types[i] = this.prefer_headers[this.selectedAmenities[i]].text;
      }
      console.log(payload);
      let response = await updateProfile(payload, this.$route.params.id);
      console.log(response)
      if (response.status === 200) {
        this.editInfoDialog = false;
        this.$message.success('修改成功');
        await this.refresh();
      } else {
        this.$message.error('修改失败');
      }

    },
    async deleteReview(review) {
      let response = await deleteReview('', this.$route.params.id, review.id);
      if (response.status === 200) {
        this.$message.success('删除成功');
        await this.refresh();
      } else {
        this.$message.error('删除失败');
      }
    },
    async unstarMovie(movie) {
      let response = await unstarMovie('', this.$route.params.id, movie.id);
      if (response.status === 200) {
        this.$message.success('取消收藏成功');
        await this.refresh();
      } else {
        this.$message.error('取消收藏失败');
      }
    },
    async unStarCelebrity(actor) {
      let response = await unstarCelebrity('', this.$route.params.id, actor.id);
      if (response.status === 200) {
        this.$message.success('取消收藏成功');
        await this.refresh();
      } else {
        this.$message.error('取消收藏失败');
      }
    },
    async quitGroup(group) {
      let response = await quitGroup('', this.$route.params.id, group.id);
      if (response.status === 200) {
        this.$message.success('退出成功');
        await this.refresh();
      } else {
        this.$message.error('退出失败');
      }
    },
    async getCurrentRate(movie) {
      console.log(movie)
      let response = await queryMovieRatings('', movie.id);
      console.log(response.data)
      if (response.status === 200) {
        if (response.data.current_user === null) {
          this.currentRate = 0;
          this.currentComment = '';
        } else {
          this.currentRate = response.data.current_user.value / 2;
          this.currentComment = response.data.current_user.content;
        }
      } else {
        this.currentRate = 5;
        this.currentComment = '';
      }
    },
    async changeRate(movie) {
      if (this.$store.state.user.id.toString() !== this.$route.params.id.toString()) {
        return;
      }
      console.log(movie)
      console.log(this.currentRate)
      let payload = {
        value: this.currentRate * 2,
        content: this.currentComment,
      }
      console.log(payload)
      let response = await api.postRequest('/movie/' + movie.id + '/rating/', payload);
      console.log(response)
      if (response.status === 200) {
        this.$message.success('评分成功');
        await this.refresh();
      } else {
        this.$message.error('评分失败');
      }
    },
  },

  computed: {
    checkPrivilege() {
      console.log(this.currentUserID.toString() === this.$route.params.id.toString())
      return this.currentUserID.toString() === this.$route.params.id.toString();
    },
    isAdmin() {
      console.log("ROLE")
      console.log(this.$store.getters['user/role'])
      return this.$store.getters['user/role'] === 'admin';
    },
    user_headers() {
      return [
        {
          text: '用户ID',
          value: 'user_id'
        },
        {
          text: '昵称',
          value: 'nickname'
        },
        {
          text: '邮箱',
          value: 'email'
        },
        {
          text: '偏好的电影类型',
          value: 'prefers'
        },
        {
          text: '注册时间',
          value: 'created_at'
        },
        {
          text: '个人描述',
          value: 'description'
        },
        {
          text: '用户头像',
          value: 'avatar'
        }
      ];
    }
  }
}
</script>

<style scoped>

a {
  text-decoration: NONE
}

.user-background {

  background-image: radial-gradient(at 30% top, #073844 0%, rgba(3, 37, 65, 1) 70%);
}

.inner_content {
  background-image: url("@/assets/pics/userBackground.svg");
  background-color: transparent;
  background-repeat: no-repeat;
  background-position: center -250px;
  position: relative;
  top: 0;
  left: 0;
  z-index: 2;
  padding: 0;
}


.user-name {
  font-family: source-sans-pro-bold, sans-serif;
  font-size: 40px;
  color: white;
}


</style>