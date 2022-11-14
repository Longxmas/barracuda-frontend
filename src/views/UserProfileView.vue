<template>
  <div id="UserProfileView">

    <!-- user profile page-->
    <!-- avator -->
    <div class="user-background">
      <div class="inner_content">
        <v-container fluid>
          <v-row class="my-6">
            <v-avatar size="150px" style="margin-left: 8%">
              <v-img :src="user.avatar"></v-img>
            </v-avatar>
            <v-card style="background-color: transparent; margin-left: 5%" elevation="0" class="py-10">
              <v-card-text>
                <span class="user-name"> {{ user.name }}</span>
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
                  <span style="color: black; font-size: 17px; line-height: 30px">{{ user.name }}</span>
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
                    {{ item }}
                  </span>
                  <br>
                  <br>
                  <h4 style="font-size: 19px">注册时间</h4>
                  <span style="color: black; font-size: 17px;  line-height: 30px">{{ user.created_at }} </span>
                  <br>
                  <br>
                </v-card-text>
              </v-col>

              <v-col cols="8">
                <v-card-text style="margin-top: 10%; height: 100%">
                  <h4 style="font-size: 19px">个人描述</h4>
                  <br>
                  <span style="color: black; font-size: 17px">{{ user.description }} </span>

                  <br>
                  <br>
                  <v-btn color="#41b2e2" style="margin-left: 70%;margin-top: 5%; color: white"
                         @click.stop="editInfoDialog=true">
                    <span>编辑个人资料</span>
                  </v-btn>


                </v-card-text>
              </v-col>
            </v-row>
          </v-container>
        </v-card>

      </v-tab-item>

      <v-tab-item>
        <v-card elevation="0" width="90%" class="mx-auto">
          <v-card-title>
            <h2>{{ user.name }}的影评</h2>
          </v-card-title>
          <v-card-text style="padding: 0 0 0 0">
            <v-list>
              <v-list-item
                  v-for="(review,i) in reviews"
                  :key=i
              >
                <v-card elevation="5" class="mb-5" style="border-radius: 10px" width="100%">
                  <v-card-text class="pa-0">

                    <v-container fluid >
                      <v-row>
                        <v-img :src="review.movie_picture" max-width="150px"
                               style="border-bottom-left-radius: 10px; border-top-left-radius: 10px"></v-img>
                        <v-col style="margin-left: 5px">
                          <v-container fluid>

                            <v-row class="pl-0 pt-3">

                              <v-col class="pa-0">
                                <a>
                                  <h3 style="font-family: 微软雅黑,serif;font-size: 20px;color: black; line-height: normal"
                                      class="ma-auto pa-0 ">{{ review.title }}</h3>
                                </a>

                              </v-col>
                            </v-row>

                            <v-row>
                              <a style="margin-top: 15px; margin-bottom: 15px; font-size: 16px">{{ user.name }}</a>
                              &ensp;
                              <p style="margin-top: 15px; margin-bottom: 15px; font-size: 16px">评论</p>
                              &ensp;
                              <a style="margin-top: 15px; margin-bottom: 15px; font-size: 16px">{{  review.movie_name}}</a>
                              <v-spacer></v-spacer>
                              <v-rating style="margin-top: 15px; margin-bottom: 15px"
                                        :value="review.rating" color="amber" dense half-increments readonly size="14">
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
                                {{ review.introduction }} </p>
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
            <h2>{{ user.name }}的收藏</h2>
          </v-card-title>
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
                        <v-img src="../assets/interstellar2.png" max-width="150px"
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
                                <h3 style="font-family: 微软雅黑,serif;font-size: 20px;color: black; line-height: normal"
                                    class="ma-auto pa-0 ">{{ movie.title }}</h3>
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
                                <v-btn icon color="pink" large>
                                  <v-icon>mdi-heart</v-icon>
                                </v-btn>
                                <span
                                    style="font-family: 微软雅黑, serif; font-size: 16px; color: #afb6b5">我的收藏</span>
                              </v-col>

                              <v-col cols="8" sm="2" class="pa-0">
                                <v-menu offset-y>
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn
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
                                          v-model="rating"
                                          color="yellow darken-3"
                                          background-color="grey darken-1"
                                          empty-icon="$ratingFull"
                                          half-increments
                                          hover
                                          large
                                      ></v-rating>
                                    </v-list-item>
                                  </v-list>

                                </v-menu>

                                <span
                                    style="font-family: 微软雅黑, serif; font-size: 16px; color: #afb6b5">我的评分</span>


                              </v-col>

                              <v-col cols="8" sm="2" class="pa-0">
                                <v-btn icon color="green" large>
                                  <v-icon>mdi-delete</v-icon>
                                </v-btn>
                                <span style="font-family: 微软雅黑, serif; font-size: 16px; color: #afb6b5">删除</span>
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
            <h2>{{ user.name }}关注的影人</h2>
          </v-card-title>
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
                                <h3 style="font-family: 微软雅黑,serif;font-size: 20px;color: black; line-height: normal"
                                    class="ma-auto pa-0 ">{{ actor.name }}</h3>
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
                                <v-btn icon color="pink" large>
                                  <v-icon>mdi-star</v-icon>
                                </v-btn>
                                <span
                                    style="font-family: 微软雅黑, serif; font-size: 16px; color: #afb6b5">我的关注</span>
                              </v-col>

                              <v-col cols="8" sm="2" class="pa-0">
                                <v-btn icon color="green" large>
                                  <v-icon>mdi-delete</v-icon>
                                </v-btn>
                                <span style="font-family: 微软雅黑, serif; font-size: 16px; color: #afb6b5">删除</span>
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
            <h2>{{ user.name }}加入的兴趣小组</h2>
          </v-card-title>
          <v-card-text v-if="interest_groups.length === 0">
            <h3>{{user.name}}暂无加入的兴趣小组</h3>
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
                                <h3 style="font-family: 微软雅黑,serif;font-size: 20px;color: black; line-height: normal"
                                    class="ma-auto pa-0 ">{{ group.name }}</h3>
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
                                <v-btn icon color="pink" large>
                                  <v-icon>mdi-heart</v-icon>
                                </v-btn>
                                <span
                                    style="font-family: 微软雅黑, serif; font-size: 16px; color: #afb6b5">我的兴趣小组</span>
                              </v-col>


                              <v-col cols="8" sm="2"  class="pa-0">
                                <v-btn icon color="green" large>
                                  <v-icon>mdi-delete</v-icon>
                                </v-btn>
                                <span style="font-family: 微软雅黑, serif; font-size: 16px; color: #afb6b5">删除</span>
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
                    v-model="editedItem.name"
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
                    v-model="amenities"
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
                <v-card-text class="pa-0">
                  {{ user_headers[5].text }}
                </v-card-text>
                <br>
                <v-text-field
                    color="success"
                    v-model="editedItem.description"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="8" md="6">
                <v-card-text class="pa-0 pb-5">
                  用户头像
                </v-card-text>
                <v-avatar>
                  <v-img :src="editedItem.avatar"></v-img>
                </v-avatar>

                <v-btn class="ml-10">
                  上传头像
                </v-btn>

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
export default {
  name: "UserProfileView",

  data() {
    return {
      user: {
        name: "longxmas",
        email: "1185267696@qq.com",
        description: "我喜欢看电影我喜欢看电影我喜欢看电影我喜欢看电影我喜欢看电影我喜欢看电影我喜欢看电影" +
            "我喜欢看电影我喜欢看电影我喜欢看电影" +
            "我喜欢看电影我喜欢看电影我喜欢看电影我喜欢看电影我喜欢看电影我喜欢看电影我喜欢看电影" +
            "我喜欢看电影我喜欢看电影我喜欢看电影我喜欢看电影我喜欢看电影我喜欢看电影我喜欢看电影",
        created_at: "2022-11-12",
        prefers: ["喜剧", "爱情", "动作"],
        avatar: require("../assets/pics/spiderman.jpg"),
        infoBackground: require("../assets/pics/back.jpg")
      },
      editedItem: {
        // TODO: 改成向后端请求user_profile后，这里就不用赋初值了
        id: '114514',
        name: '匿蝶',
        created_at: '2022-11-12',
        prefers: ["喜剧", "爱情", "动作"],
        email: '15807386853@qq.com',
        description: "我爱看电影",
        avatar: require("../assets/pics/spiderman.jpg"),
        valid: true
      },
      editInfoDialog: false,
      topTabName: "overview",
      starsMovies: [
        {
          id: 1,
          poster: 'https://lain.bgm.tv/pic/cover/l/e2/e7/328609_2EHLJ.jpg',
          title: '寄生虫',
          datePublished: '2019-05-30',
          introduction: '《寄生虫》是由奉俊昊执导，宋康昊、李善均、赵茹珍、崔宇植、朴素丹主演的剧情片，于2019年5月30日在韩国上映。' +
              '该片讲述了一家四口全是无业游民的爸爸金基泽成天游手好闲，直到积极向上的长子金基宇靠着伪造的文凭来到富豪朴社长的家应征家教，' +
              '两个天差地别的家庭因而被卷入一连串的意外事件之中的故事。 基宇（崔宇植 饰）出生在一个贫穷的家庭之中，和妹妹基婷（朴素丹 饰）' +
              '以及父母在狭窄的地下室里过着相依为命的日子。一天，基宇的同学上门拜访，他告诉基宇，自己在一个有钱人家里给他们的女儿做家教' +
              '，太太是一个头脑简单出手又阔绰的女人，因为自己要出国留学，所以将家教的职位暂时转交给基宇。就这样，基宇来到了朴社长（李善均 饰）家中' +
              '，并且见到了他的太太（赵汝贞 饰），' +
              '没过多久，基宇的妹妹和父母也如同寄生虫一般的进入了朴社长家里工作。然而，他们的野心并没有止步于此' +
              '，基宇更是和大小姐坠入了爱河。随着时间的推移，朴社长家里隐藏的秘密渐渐浮出了水面。'
        },
        {
          id: 1,
          poster: 'https://lain.bgm.tv/pic/cover/l/e2/e7/328609_2EHLJ.jpg',
          title: 'ぼっち・ざ・ろっく！',
          datePublished: '2019-05-30',
          introduction: '《寄生虫》是由奉俊昊执导，宋康昊、李善均、赵茹珍、崔宇植、朴素丹主演的剧情片，于2019年5月30日在韩国上映。' +
              '该片讲述了一家四口全是无业游民的爸爸金基泽成天游手好闲，直到积极向上的长子金基宇靠着伪造的文凭来到富豪朴社长的家应征家教，' +
              '两个天差地别的家庭因而被卷入一连串的意外事件之中的故事。 基宇（崔宇植 饰）出生在一个贫穷的家庭之中，和妹妹基婷（朴素丹 饰）' +
              '以及父母在狭窄的地下室里过着相依为命的日子。一天，基宇的同学上门拜访，他告诉基宇，自己在一个有钱人家里给他们的女儿做家教' +
              '，太太是一个头脑简单出手又阔绰的女人，因为自己要出国留学，所以将家教的职位暂时转交给基宇。就这样，基宇来到了朴社长（李善均 饰）家中' +
              '，并且见到了他的太太（赵汝贞 饰），' +
              '没过多久，基宇的妹妹和父母也如同寄生虫一般的进入了朴社长家里工作。然而，他们的野心并没有止步于此' +
              '，基宇更是和大小姐坠入了爱河。随着时间的推移，朴社长家里隐藏的秘密渐渐浮出了水面。'
        },
        {
          id: 1,
          poster: 'https://lain.bgm.tv/pic/cover/l/e2/e7/328609_2EHLJ.jpg',
          title: 'ぼっち・ざ・ろっく！',
          datePublished: '2019-05-30',
          introduction: '《寄生虫》是由奉俊昊执导，宋康昊、李善均、赵茹珍、崔宇植、朴素丹主演的剧情片，于2019年5月30日在韩国上映。' +
              '该片讲述了一家四口全是无业游民的爸爸金基泽成天游手好闲，直到积极向上的长子金基宇靠着伪造的文凭来到富豪朴社长的家应征家教，' +
              '两个天差地别的家庭因而被卷入一连串的意外事件之中的故事。 基宇（崔宇植 饰）出生在一个贫穷的家庭之中，和妹妹基婷（朴素丹 饰）' +
              '以及父母在狭窄的地下室里过着相依为命的日子。一天，基宇的同学上门拜访，他告诉基宇，自己在一个有钱人家里给他们的女儿做家教' +
              '，太太是一个头脑简单出手又阔绰的女人，因为自己要出国留学，所以将家教的职位暂时转交给基宇。就这样，基宇来到了朴社长（李善均 饰）家中' +
              '，并且见到了他的太太（赵汝贞 饰），' +
              '没过多久，基宇的妹妹和父母也如同寄生虫一般的进入了朴社长家里工作。然而，他们的野心并没有止步于此' +
              '，基宇更是和大小姐坠入了爱河。随着时间的推移，朴社长家里隐藏的秘密渐渐浮出了水面。'
        },
        {
          id: 1,
          poster: 'https://lain.bgm.tv/pic/cover/l/e2/e7/328609_2EHLJ.jpg',
          title: 'ぼっち・ざ・ろっく！',
          datePublished: '2019-05-30',
          introduction: '《寄生虫》是由奉俊昊执导，宋康昊、李善均、赵茹珍、崔宇植、朴素丹主演的剧情片，于2019年5月30日在韩国上映。' +
              '该片讲述了一家四口全是无业游民的爸爸金基泽成天游手好闲，直到积极向上的长子金基宇靠着伪造的文凭来到富豪朴社长的家应征家教，' +
              '两个天差地别的家庭因而被卷入一连串的意外事件之中的故事。 基宇（崔宇植 饰）出生在一个贫穷的家庭之中，和妹妹基婷（朴素丹 饰）' +
              '以及父母在狭窄的地下室里过着相依为命的日子。一天，基宇的同学上门拜访，他告诉基宇，自己在一个有钱人家里给他们的女儿做家教' +
              '，太太是一个头脑简单出手又阔绰的女人，因为自己要出国留学，所以将家教的职位暂时转交给基宇。就这样，基宇来到了朴社长（李善均 饰）家中' +
              '，并且见到了他的太太（赵汝贞 饰），' +
              '没过多久，基宇的妹妹和父母也如同寄生虫一般的进入了朴社长家里工作。然而，他们的野心并没有止步于此' +
              '，基宇更是和大小姐坠入了爱河。随着时间的推移，朴社长家里隐藏的秘密渐渐浮出了水面。'
        },
      ],
      starsActors: [
        {
          id: 0,
          name: '宋康昊',
          avatar: require('../assets/pics/songKangHao.jpg'),
          birthtime: "1985-6-17",
          introduction: '宋康昊（Kang-ho Song），1985年6月17日出生于韩国首尔，韩国男演员、导演、编剧。' +
              '2007年毕业于韩国演艺学院表演系。2007年至2008年，出演电视剧《爱情的故事》。2009年，出演电视剧《爱情的故事2》。' +
              '2010年，出演电视剧《爱情的故事3》。2011年，出演电视剧《爱情的故事4》。2012年，出演电视剧《爱情的故事5》。' +
              '2013年，出演电视剧《爱情的故事6》。2014年，出演电视剧《爱情的故事7》。2015年，出演电视剧《爱情的故事8》。' +
              '2016年，出演电视剧《爱情的故事9》。2017年，出演电视剧《爱情的故事10》。2018年，出演电视剧《爱情的故事11》。' +
              '2019年，出演电视剧《爱情的故事12》。2019年，出演电影《寄生虫》。'
        },
        {
          id: 1,
          name: '马修·麦康纳',
          avatar: require('../assets/maconar.jpg'),
          birthtime: "1969-11-04",
          introduction: '马修·麦康纳，美国演员。早先他没有对表演产生兴趣，而是立志要做一名律师，在德州大学的学习期间，\n' +
              '                受到一本名为《世界上最伟大的销售员》的灵感启发，从而改变志向，开始学习电影。他的表演生涯开始于1991年在学生的电影作品中出演角色，\n' +
              '                在1992年执导了一部短片。在早期马修·麦康纳的表演生涯中，他只是饰演一些追逐女孩子的花花公子角色，\n' +
              '                在1994年的电影《德州电锯杀人狂 4》饰演一个阴郁疯狂的嗜血杀手，开始转变戏路。在2000年他参与了电影《猎杀U-571》的表演。\n' +
              '                马修·麦康纳同是还在喜剧片中出演角色，如《缘分没法挡》、《十日拍拖手册》，他觉得最有意思的银幕角色是在《火焰末日》扮演一名美国战士。\n' +
              '                近两年麦康纳又出演了《撒哈拉骑兵》、《利欲两心》、《赖家王老五》等商业片，知名度和影响力直线上升。'
        },
        {
          id: 1,
          name: '马修·麦康纳',
          avatar: require('../assets/maconar.jpg'),
          birthtime: "1969-11-04",
          introduction: '马修·麦康纳，美国演员。早先他没有对表演产生兴趣，而是立志要做一名律师，在德州大学的学习期间，\n' +
              '                受到一本名为《世界上最伟大的销售员》的灵感启发，从而改变志向，开始学习电影。他的表演生涯开始于1991年在学生的电影作品中出演角色，\n' +
              '                在1992年执导了一部短片。在早期马修·麦康纳的表演生涯中，他只是饰演一些追逐女孩子的花花公子角色，\n' +
              '                在1994年的电影《德州电锯杀人狂 4》饰演一个阴郁疯狂的嗜血杀手，开始转变戏路。在2000年他参与了电影《猎杀U-571》的表演。\n' +
              '                马修·麦康纳同是还在喜剧片中出演角色，如《缘分没法挡》、《十日拍拖手册》，他觉得最有意思的银幕角色是在《火焰末日》扮演一名美国战士。\n' +
              '                近两年麦康纳又出演了《撒哈拉骑兵》、《利欲两心》、《赖家王老五》等商业片，知名度和影响力直线上升。'
        },
        {
          id: 1,
          name: '马修·麦康纳',
          avatar: require('../assets/maconar.jpg'),
          birthtime: "1969-11-04",
          introduction: '马修·麦康纳，美国演员。早先他没有对表演产生兴趣，而是立志要做一名律师，在德州大学的学习期间，\n' +
              '                受到一本名为《世界上最伟大的销售员》的灵感启发，从而改变志向，开始学习电影。他的表演生涯开始于1991年在学生的电影作品中出演角色，\n' +
              '                在1992年执导了一部短片。在早期马修·麦康纳的表演生涯中，他只是饰演一些追逐女孩子的花花公子角色，\n' +
              '                在1994年的电影《德州电锯杀人狂 4》饰演一个阴郁疯狂的嗜血杀手，开始转变戏路。在2000年他参与了电影《猎杀U-571》的表演。\n' +
              '                马修·麦康纳同是还在喜剧片中出演角色，如《缘分没法挡》、《十日拍拖手册》，他觉得最有意思的银幕角色是在《火焰末日》扮演一名美国战士。\n' +
              '                近两年麦康纳又出演了《撒哈拉骑兵》、《利欲两心》、《赖家王老五》等商业片，知名度和影响力直线上升。'
        }
      ],
      reviews: [
        {
          id: 1,
          title: '生如夏花之绚烂，死如秋叶之静美',
          user_name: 'longxmas',
          movie_name: '赛博朋克：边缘行者',
          movie_id: 2,
          /*movie_pic应当是后端查询后返回*/
          movie_picture: require('../assets/pics/syberpunk.jpg'),
          rating: '4.5',
          introduction:
              ' 每个人的一生都会有几个临界点，都会面对一次又一次的选择，黄色树林里分出的两条道路，你必然会选择其中的一条，而另一条的风景你注定是无法体验的，这就是生活，要得到必先懂得失去。最终我们都会面对人生的最后一个临界点，那就是生与死，而这次，我们没有选择。\n' +
              '         我们的生命被设定的时间是有限的，不论是生理上还是心理上。从最初什么也不知道到逐渐去认识一些事情，再到最终慢慢老去的记忆和身体器官。最终还是会离开，赤条条地来，什么也不带走地消逝。\n' +
              '         我们会按照一切人类自古以来的设定和程序去生活，没有人能够逃离。像离弦的剑，只有来路，没有归途。面对挫折和困难，只有向前走，生命的轨迹永远都是单向的。\n' +
              '         泰戈尔的诗句：生如夏花之绚烂。生活中有绚烂的时光就有大雨滂沱的历程。你得面对浅薄的时光，琐碎的日子，凌乱的步伐，看着生命一天天粗糙；你不得不承认，曾经有过时刻，你看到的天都是灰色的，而你必须得永恒地站在这里，哪怕下一秒就是你能预知的风险，因为这是躲不过去的；你得记得到那些脆弱和不安的岁月，你去从苦难中成长，但不一定要感谢苦难，因为值得感谢的是你心里的倔强还有那些生命中的温暖。\n' +
              '        时间让生命的一切有了局限也同时有了意义，我们的生命和生活是有局限的，但是，生命本该如夏花般绚烂，生命本来就在于突破和坚持。想到了小学课文里的一句话，人只不过是一根苇草，是自然界最脆弱的东西，但他是一根能思想的苇草，必然是自然界最坚强的存在。'
        },
        {
          id: 1,
          title: '生如夏花之绚烂，死如秋叶之静美',
          user_name: 'longxmas',
          movie_name: '赛博朋克：边缘行者',
          movie_id: 2,
          /*movie_pic应当是后端查询后返回*/
          movie_picture: require('../assets/pics/syberpunk.jpg'),
          rating: '4.5',
          introduction:
              ' 每个人的一生都会有几个临界点，都会面对一次又一次的选择，黄色树林里分出的两条道路，你必然会选择其中的一条，而另一条的风景你注定是无法体验的，这就是生活，要得到必先懂得失去。最终我们都会面对人生的最后一个临界点，那就是生与死，而这次，我们没有选择。\n' +
              '         我们的生命被设定的时间是有限的，不论是生理上还是心理上。从最初什么也不知道到逐渐去认识一些事情，再到最终慢慢老去的记忆和身体器官。最终还是会离开，赤条条地来，什么也不带走地消逝。\n' +
              '         我们会按照一切人类自古以来的设定和程序去生活，没有人能够逃离。像离弦的剑，只有来路，没有归途。面对挫折和困难，只有向前走，生命的轨迹永远都是单向的。\n' +
              '         泰戈尔的诗句：生如夏花之绚烂。生活中有绚烂的时光就有大雨滂沱的历程。你得面对浅薄的时光，琐碎的日子，凌乱的步伐，看着生命一天天粗糙；你不得不承认，曾经有过时刻，你看到的天都是灰色的，而你必须得永恒地站在这里，哪怕下一秒就是你能预知的风险，因为这是躲不过去的；你得记得到那些脆弱和不安的岁月，你去从苦难中成长，但不一定要感谢苦难，因为值得感谢的是你心里的倔强还有那些生命中的温暖。\n' +
              '        时间让生命的一切有了局限也同时有了意义，我们的生命和生活是有局限的，但是，生命本该如夏花般绚烂，生命本来就在于突破和坚持。想到了小学课文里的一句话，人只不过是一根苇草，是自然界最脆弱的东西，但他是一根能思想的苇草，必然是自然界最坚强的存在。'
        },
        {
          id: 1,
          title: '生如夏花之绚烂，死如秋叶之静美',
          user_name: 'longxmas',
          movie_name: '赛博朋克：边缘行者',
          movie_id: 2,
          /*movie_pic应当是后端查询后返回*/
          movie_picture: require('../assets/pics/syberpunk.jpg'),
          rating: '4.5',
          introduction:
              ' 每个人的一生都会有几个临界点，都会面对一次又一次的选择，黄色树林里分出的两条道路，你必然会选择其中的一条，而另一条的风景你注定是无法体验的，这就是生活，要得到必先懂得失去。最终我们都会面对人生的最后一个临界点，那就是生与死，而这次，我们没有选择。\n' +
              '         我们的生命被设定的时间是有限的，不论是生理上还是心理上。从最初什么也不知道到逐渐去认识一些事情，再到最终慢慢老去的记忆和身体器官。最终还是会离开，赤条条地来，什么也不带走地消逝。\n' +
              '         我们会按照一切人类自古以来的设定和程序去生活，没有人能够逃离。像离弦的剑，只有来路，没有归途。面对挫折和困难，只有向前走，生命的轨迹永远都是单向的。\n' +
              '         泰戈尔的诗句：生如夏花之绚烂。生活中有绚烂的时光就有大雨滂沱的历程。你得面对浅薄的时光，琐碎的日子，凌乱的步伐，看着生命一天天粗糙；你不得不承认，曾经有过时刻，你看到的天都是灰色的，而你必须得永恒地站在这里，哪怕下一秒就是你能预知的风险，因为这是躲不过去的；你得记得到那些脆弱和不安的岁月，你去从苦难中成长，但不一定要感谢苦难，因为值得感谢的是你心里的倔强还有那些生命中的温暖。\n' +
              '        时间让生命的一切有了局限也同时有了意义，我们的生命和生活是有局限的，但是，生命本该如夏花般绚烂，生命本来就在于突破和坚持。想到了小学课文里的一句话，人只不过是一根苇草，是自然界最脆弱的东西，但他是一根能思想的苇草，必然是自然界最坚强的存在。'
        },
        {
          id: 1,
          title: '生如夏花之绚烂，死如秋叶之静美',
          user_name: 'longxmas',
          movie_name: '赛博朋克：边缘行者',
          movie_id: 2,
          /*movie_pic应当是后端查询后返回*/
          movie_picture: require('../assets/pics/syberpunk.jpg'),
          rating: '4.5',
          introduction:
              ' 每个人的一生都会有几个临界点，都会面对一次又一次的选择，黄色树林里分出的两条道路，你必然会选择其中的一条，而另一条的风景你注定是无法体验的，这就是生活，要得到必先懂得失去。最终我们都会面对人生的最后一个临界点，那就是生与死，而这次，我们没有选择。\n' +
              '         我们的生命被设定的时间是有限的，不论是生理上还是心理上。从最初什么也不知道到逐渐去认识一些事情，再到最终慢慢老去的记忆和身体器官。最终还是会离开，赤条条地来，什么也不带走地消逝。\n' +
              '         我们会按照一切人类自古以来的设定和程序去生活，没有人能够逃离。像离弦的剑，只有来路，没有归途。面对挫折和困难，只有向前走，生命的轨迹永远都是单向的。\n' +
              '         泰戈尔的诗句：生如夏花之绚烂。生活中有绚烂的时光就有大雨滂沱的历程。你得面对浅薄的时光，琐碎的日子，凌乱的步伐，看着生命一天天粗糙；你不得不承认，曾经有过时刻，你看到的天都是灰色的，而你必须得永恒地站在这里，哪怕下一秒就是你能预知的风险，因为这是躲不过去的；你得记得到那些脆弱和不安的岁月，你去从苦难中成长，但不一定要感谢苦难，因为值得感谢的是你心里的倔强还有那些生命中的温暖。\n' +
              '        时间让生命的一切有了局限也同时有了意义，我们的生命和生活是有局限的，但是，生命本该如夏花般绚烂，生命本来就在于突破和坚持。想到了小学课文里的一句话，人只不过是一根苇草，是自然界最脆弱的东西，但他是一根能思想的苇草，必然是自然界最坚强的存在。'
        },
        {
          id: 1,
          title: '生如夏花之绚烂，死如秋叶之静美',
          user_name: 'longxmas',
          movie_name: '赛博朋克：边缘行者',
          movie_id: 2,
          /*movie_pic应当是后端查询后返回*/
          movie_picture: require('../assets/pics/syberpunk.jpg'),
          rating: '4.5',
          introduction: "我的瑞贝卡呜呜呜呜呜呜呜"
        }
      ],
      interest_groups: [
        {
          id: 1,
          name: '科幻片死忠粉',
          avatar: require('../assets/interstellar2.png'),
          created_at: '2022-11-13',
          introduction: '科幻片永远的神，欢迎大家分享喜欢的科幻电影，一起讨论科幻片的魅力！'
        },
        {
          id: 2,
          name: '爱情至上',
          avatar: require('../assets/pics/syberpunk.jpg'),
          created_at: '2022-11-15',
          introduction: '生命诚可贵，爱情价更高'
        },
        {
          id: 3,
          name: '动作片yyds',
          avatar: require('../assets/pics/syberpunk.jpg'),
          created_at: '2022-11-13',
          introduction: '我们喜欢看拳拳到肉的动作片，欢迎大家分享喜欢的动作片，一起讨论动作片的魅力！'
        }
      ]
    }
  },

  methods: {
    submitUserProfile() {
      /*this.$axios.post('/api/user_profile/', this.editedItem)
          .then(response => {
            console.log(response)
            this.editInfoDialog = false
          })
          .catch(error => {
            console.log(error)
          })*/
      this.editInfoDialog = false;
      console.log(this.editedItem);
      alert("修改成功");
    }
  },


  computed: {
    user_headers() {
      return [
        {
          text: '用户ID',
          value: 'user_id'
        },
        {
          text: '用户名',
          value: 'name'
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
    },
    prefer_headers() {
      return [
        {
          text: '喜剧',
          value: 'comedy'
        },
        {
          text: '爱情',
          value: 'romance'
        },
        {
          text: '动作',
          value: 'action'
        },
        {
          text: '科幻',
          value: 'science'
        },
        {
          text: '恐怖',
          value: 'horror'
        },
        {
          text: '剧情',
          value: 'drama'
        },
        {
          text: '动画',
          value: 'animation'
        },
        {
          text: '战争',
          value: 'war'
        },
        {
          text: '犯罪',
          value: 'crime'
        },
        {
          text: '惊悚',
          value: 'thriller'
        },
        {
          text: '悬疑',
          value: 'suspense'
        }
      ]
    }
  }


}
</script>

<style scoped>

.user-background {

  background-image: radial-gradient(at 30% top, #073844 0%, rgba(3, 37, 65, 1) 70%);
}

.inner_content {
  background-image: url("../assets/pics/userBackground.svg");
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