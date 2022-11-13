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
      <v-tab style="color: black">讨论</v-tab>
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
        您参与的讨论
      </v-tab-item>

      <!--片单-->
      <v-tab-item>
        <v-card elevation="0" width="90%" class="mx-auto">
          <v-card-title>
            <h2>我的收藏</h2>
          </v-card-title>
          <v-card-text style="padding: 0 0 0 0">
            <v-list>
              <v-list-item
                  v-for="(movie,i) in starsMovies"
                  :key=i
              >
                <v-card elevation="8" class="mb-5" style="border-radius: 10px">
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
                              <v-col cols="8" sm="2">
                                <v-btn icon color="pink" large>
                                  <v-icon>mdi-heart</v-icon>
                                </v-btn>
                                <span
                                    style="font-family: 微软雅黑, serif; font-size: 16px; color: #afb6b5">我的收藏</span>
                              </v-col>

                              <v-col cols="8" sm="2">
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

                              <v-col cols="8" sm="2">
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
                          :key=k>{{ item.text }}
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