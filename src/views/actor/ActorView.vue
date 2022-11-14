<template>
  <div class="actor-view">
    <v-container class="actor-container">
      <v-row>
        <v-col style="max-width: 450px">
          <!-- actor pthoto-card-->
          <v-card
              class="actor-photo-card mx-auto"
              max-width="380"
              style="float:left"
          >
            <v-img
                class="white--text align-end"
                height="450px"
                width="350px"
                src="../../assets/maconar.jpg"
            >
            </v-img>

            <v-card-actions>

              <v-chip
                  class="ma-2"
                  color="orange"
                  text-color="white"
                  @click="starActor"
              >
                关注
                <v-icon right>mdi-star</v-icon>
              </v-chip>

              <v-spacer></v-spacer>

              <v-chip
                  class="ma-2"
                  color="orange"
                  text-color="white"
                  @click="deleteStarActor"
              >
                取消关注
                <v-icon right>mdi-delete</v-icon>
              </v-chip>
            </v-card-actions>
          </v-card>

          <v-card
              class="information-card"
              max-width="350"
          >
            <v-toolbar
                color="indigo"
                dark
                dense
            >
              <v-app-bar-nav-icon></v-app-bar-nav-icon>

              <v-toolbar-title>影人信息</v-toolbar-title>

              <v-spacer></v-spacer>
            </v-toolbar>

            <v-list dense>
              <v-list-item>
                <v-chip
                    style="width: 100px"
                    color="primary"
                    label
                >
                  <v-icon left>mdi-account-circle-outline</v-icon>
                  性别
                </v-chip>
                <v-card-text align="right"> {{ actor_information.sex }}</v-card-text>
              </v-list-item>

              <v-list-item>
                <v-chip
                    style="width: 150px"
                    color="primary"
                    label
                >
                  <v-icon left>mdi-account-circle-outline</v-icon>
                  出生日期
                </v-chip>
                <v-card-text align="right"> {{ actor_information.birthtime }}</v-card-text>
              </v-list-item>

              <v-list-item>
                <v-chip
                    style="width: 130px"
                    color="primary"
                    label
                >
                  <v-icon left>mdi-account-circle-outline</v-icon>
                  出生地
                </v-chip>
                <v-card-text align="right"> {{ actor_information.birthplace }}</v-card-text>
              </v-list-item>

              <v-list-item>
                <v-chip
                    style="width: 100px"
                    color="primary"
                    label
                >
                  <v-icon left>mdi-account-circle-outline</v-icon>
                  职业
                </v-chip>
                <v-card-text align="right" style=""> {{ actor_information.career }}</v-card-text>
              </v-list-item>

            </v-list>
          </v-card>
        </v-col>

        <v-col>
          <v-card
              class="introduction"
              elevation="0"

          >
            <v-card-text class="actor-name">
              马修·麦康纳
              <p></p>
              Matthew McConaughey
            </v-card-text>

            <p></p>
            <p></p>

            <v-card-text>
              <p class="personal-introduction-title">个人简介 </p>
              <p class="personal-introduction"> 马修·麦康纳，美国演员。早先他没有对表演产生兴趣，而是立志要做一名律师，在德州大学的学习期间，
                受到一本名为《世界上最伟大的销售员》的灵感启发，从而改变志向，开始学习电影。他的表演生涯开始于1991年在学生的电影作品中出演角色，
                在1992年执导了一部短片。在早期马修·麦康纳的表演生涯中，他只是饰演一些追逐女孩子的花花公子角色，
                在1994年的电影《德州电锯杀人狂 4》饰演一个阴郁疯狂的嗜血杀手，开始转变戏路。在2000年他参与了电影《猎杀U-571》的表演。
                马修·麦康纳同是还在喜剧片中出演角色，如《缘分没法挡》、《十日拍拖手册》，他觉得最有意思的银幕角色是在《火焰末日》扮演一名美国战士。
                近两年麦康纳又出演了《撒哈拉骑兵》、《利欲两心》、《赖家王老五》等商业片，知名度和影响力直线上升。</p>
            </v-card-text>


            <v-card style="margin:10px" elevation="0">
              <v-card-title> <span class="personal-introduction-title">代表作</span></v-card-title>
              <v-card-text>
                <v-sheet
                    class="mx-auto"
                    elevation="5"
                    style="padding-top: 2%">
                  <v-slide-group
                      class="pa-4"
                      center-active
                      show-arrows>
                    <v-slide-item
                        v-for="(item,i) in movies"
                        :key="i">
                      <v-card
                          elevation="0"
                          style="margin-right: 10px">
                        <v-scale-transition>
                          <v-img
                              height="400px"
                              max-height="400px"
                              width="300px"
                              :src="item.src"

                          ></v-img>
                        </v-scale-transition>
                        <v-card-text style="text-align: center">
                          <span style="font-family: 黑体, serif; font-size: 20px; color: #0b1c22">{{ item.name }}</span>
                        </v-card-text>
                      </v-card>
                    </v-slide-item>
                  </v-slide-group>
                </v-sheet>
              </v-card-text>
            </v-card>


            <v-card-text>
              <p></p>
              <p class="personal-introduction-title"> 影人图片 </p>
              <p></p>

              <ul class="photo-ul">
                <li v-for="(item,i) in photos"
                    :key="i"
                    class="parent_center">
                  <v-card
                      class="mx-auto"
                      elevation="0"
                      max-width="400"
                      style="text-align: center"
                  >
                    <v-img
                        :src="item.src" class="actor-photo"
                    >
                    </v-img>

                    <v-card-text class="text--primary" style="padding: 1px !important;">
                      <div>{{ item.name }}</div>
                    </v-card-text>
                  </v-card>
                </li>
              </ul>


            </v-card-text>

            <v-card-text>
              <p></p>
              <p class="personal-introduction-title"> 合作过的影人 </p>
              <p></p>

              <ul class="photo-ul">
                <li v-for="(item,i) in partners"
                    :key="i"
                    class="parent_center">
                  <v-card
                      class="mx-auto"
                      elevation="0"
                      max-width="400"
                      style="text-align: center"
                  >
                    <v-img
                        :src="item.src" class="actor-photo"
                    >
                    </v-img>

                    <v-card-text class="text--primary" style="padding: 1px !important;">
                      <div>{{ item.name }}</div>
                    </v-card-text>
                  </v-card>
                </li>
              </ul>


            </v-card-text>

          </v-card>

        </v-col>
      </v-row>

    </v-container>

  </div>




</template>

<script>
export default {
  name: "ActorView.vue",
  data() {
    return {
      actor_information: {
        id: 1,
        name:'马修·麦康纳',
        sex: "男",
        birthtime: "1969年11月04日",
        birthplace: "美国,得克萨斯州,尤瓦尔迪",
        career: "演员/制片人/配音",
        imdbCode: "nm0000190",
      },

      movies: [
        {
          name: "星际穿越",
          src: require("../../assets/interstellar2.png"),
        },
        {
          name: "真探",
          src: require("../../assets/p2.webp"),
        },
        {
          name: "真探",
          src: require("../../assets/background.jpg"),
        },

      ],

      photos: [
        {
          src: require("../../assets/interstellar2.png"),
        },
        {
          src: require("../../assets/interstellar2.png"),
        },
        {
          src: require("../../assets/interstellar2.png"),
        },
        {
          src: require("../../assets/interstellar2.png"),
        },
      ],


      partners: [
        {
          name: "麦克雷",
          src: require("../../assets/interstellar2.png"),
        },
        {
          name: "麦克雷",
          src: require("../../assets/interstellar2.png"),
        },
        {
          name: "麦克雷",
          src: require("../../assets/interstellar2.png"),
        },
        {
          name: "麦克雷",
          src: require("../../assets/interstellar2.png"),
        },
        {
          name: "麦克雷",
          src: require("../../assets/interstellar2.png"),
        },
        {
          name: "麦克雷",
          src: require("../../assets/interstellar2.png"),
        },
        {
          name: "麦克雷",
          src: require("../../assets/interstellar2.png"),
        },
        {
          name: "麦克雷",
          src: require("../../assets/interstellar2.png"),
        },
        {
          name: "麦克雷",
          src: require("../../assets/interstellar2.png"),
        },
        {
          name: "麦克雷",
          src: require("../../assets/interstellar2.png"),
        },
      ]
    }
  },


  methods: {
    starActor() {
      alert('关注成功！')
    },
    deleteStarActor() {
      alert('您已取消关注！')
    },
  },

  mounted() {
  }
}
</script>

<style scoped>

</style>

<style>
.actor-view{

}


.actor-container {
  margin: 60px;
  max-width: 100%;
}

.actor-photo-card {
  margin-left: 20px !important;
}

.information-card {
  margin-top: 600px;
}

.introduction {
  max-width: 900px !important;
}

.actor-name {
  color: black !important;
  font-family: 微软雅黑, 'Arial', sans-serif !important;
  font-weight: bold !important;
  font-size: 30px !important;
}

.personal-introduction-title {
  color: black;
  font-family: 微软雅黑, 'Arial', sans-serif;
  font-weight: bold;
  font-size: 25px;
  padding-bottom: 5px;
}

.personal-introduction {
  color: black;
  font-family: 微软雅黑, 'Arial', sans-serif;
  font-size: 18px;
  text-align: justify;
}

.parent_center {
  display: flex;
  justify-content: center;
}

.movie_photo {
  align-self: center;
  height: 400px !important;
  width: 300px !important;
  align-content: center;
}

.actor-photo {
  height: 200px;
  width: 130px;
}

.photo-ul {
  height: auto;
  overflow-x: scroll;
  white-space:nowrap;  /* ul中的内容不换行 */
}

.photo-ul li {
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 15px;
}

/* 1,滚动条 */

::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background-color: #afb6b5;
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  border-radius: 10px;  /* 整体 圆角 */
}


</style>