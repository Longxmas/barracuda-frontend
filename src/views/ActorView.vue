<template>
  <div class="actor-view">
    <v-container class="actor-container">

      <!-- actor pthoto-card-->
      <v-card
          class="actor-photo-card mx-auto"
          max-width="400"
          style="float:left"
      >
        <v-img
            class="white--text align-end"
            height="450px"
            width="310px"
            src="../assets/maconar.jpg"
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


        <v-card-text>
          <p class="personal-introduction-title"> 代表作 </p>
        </v-card-text>

        <v-card elevation="0">
          <div class="parent_center">
            <v-carousel class="movie_photo">
              <v-carousel-item
                  v-for="(item,i) in movies"
                  :key="i"
                  :href="item.src"
                  reverse-transition="fade-transition"
                  transition="fade-transition"
              >
                <v-img :src="item.src" contain width="100%">
                </v-img>
              </v-carousel-item>
            </v-carousel>
          </div>

        </v-card>


        <v-card-text>
          <p></p>
          <p class="personal-introduction-title"> 影人图片 </p>
          <p></p>

          <v-container fluid>
            <v-row>
              <v-col
                  v-for="(item,i) in photos"
                  :key="i"
                  :href="item.src"
              >
                <v-card class="parent_center">
                  <v-img :src="item.src" class="actor-photo"></v-img>
                </v-card>

              </v-col>
            </v-row>
          </v-container>


        </v-card-text>


      </v-card>


    </v-container>

  </div>


</template>

<script>
export default {
  name: "ActorView.vue",
  data() {
    return {
      movies: [
        {
          name: "星际穿越",
          src: require("../assets/interstellar2.png"),
        },
        {
          name: "真探",
          src: require("../assets/p2.webp"),
        }

      ],

      photos: [
        {
          src: require("../assets/interstellar2.png"),
        },
        {
          src: require("../assets/interstellar2.png"),
        },
        {
          src: require("../assets/interstellar2.png"),
        },
        {
          src: require("../assets/interstellar2.png"),
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
.actor-container {
  margin: 60px;
  max-width: 100%;
}

.actor-photo-card {
  margin-left: 20px !important;
}

.introduction {
  margin-left: 400px;
  max-width: 800px !important;
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
  width: 400px !important;
  align-content: center;
}

.actor-photo {
  height: 200px;
  width: 150px;
}

</style>