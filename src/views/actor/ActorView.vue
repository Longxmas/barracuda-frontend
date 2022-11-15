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
                :src="actor_information.image"
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
                <v-card-text align="right"> {{ actor_information.gender === 1 ? '男' : '女'}}</v-card-text>
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
                <v-card-text align="right"> {{ actor_information.birthday }}</v-card-text>
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
                <v-card-text align="right"> {{ actor_information.place_of_birth }}</v-card-text>
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
              {{ actor_information.celebrity_name}}
            </v-card-text>

            <p></p>
            <p></p>

            <v-card-text>
              <p class="personal-introduction-title">个人简介 </p>
              <p class="personal-introduction"> {{actor_information.biography}} </p>
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
                          :href="'/movie/' + item.id"
                          elevation="0"
                          style="margin-right: 10px">
                        <v-scale-transition>
                          <v-img
                              height="400px"
                              max-height="400px"
                              width="300px"
                              :src="item.image"

                          ></v-img>
                        </v-scale-transition>
                        <v-card-text style="text-align: center">
                          <span style="font-family: 黑体, serif; font-size: 20px; color: #0b1c22">{{ item.movie_name }}</span>
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

              <v-container fluid class="pl-0 ml-0">
                <ul class="photo-ul">
                  <li v-for="(item,i) in photos"
                      :key="i"
                      class="parent_center">
                    <v-card
                        class="mx-auto"
                        elevation="0"
                        style="text-align: center"
                    >
                      <img
                          alt="影人图片"
                          style="border-radius: 0;"
                          :style="calculateImageFitPattern(300, item.image_path)"
                          :src="item.image_path"
                      />

                      <v-card-text class="text--primary" style="padding: 1px !important;">
                        <div>{{ item.name }}</div>
                      </v-card-text>
                    </v-card>
                  </li>
                </ul>
              </v-container>

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
                      style="text-align: center"
                      :href="'/actor/' + item.id"
                  >
                    <img
                        alt="合作过的影人"
                        style="border-radius: 0;"
                        :style="calculateImageFitPattern(400,item.image)"
                        :src="item.image"
                    />

                    <v-card-text class="text--primary" style="padding: 1px !important;">
                      <div>{{ item.celebrity_name }}</div>
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
import {
  queryCelebrityCooperation,
  queryCelebrityDetail,
  queryCelebrityImages,
  queryCelebrityMovies
} from "@/api/celebrity";

export default {
  name: "actorView",
  data() {
    return {
      actor_information: {
        "id": 5,
        "celebrity_name": "阿米尔·汗 Aamir Khan",
        "biography": "\t阿米尔·汗，印度著名男演员。8岁时出演一部轰动印度全国的电影，是公认的很有前途的童星，但长大后他却坚决不愿从影，而一心去打网球，而且打得还不错，曾经获得过马哈拉施特拉邦的网球冠军。随着年纪的增长，才抛弃网球重回大银幕。阿米尔的罗曼史就是一部电影的好题材。\n\t他21岁的时候爱上了邻居家的女孩，但由于宗教原因（女孩家是印度教徒，他是一个正统的穆斯林），两方家长都坚决反对这桩婚事，两个年轻人决定私奔。现在他们过着幸福美满的生活，甚至常常被印度政府和印度政党拿来当作印度教和穆斯林和睦相处的典范。\n\t2006年元旦，象征新年开始的一个节日，印度“阿汤哥”阿米尔这一天在印度西部山区度假村举行婚礼，迎娶第二任妻子基琳·拉奥。41岁的阿米尔汗将与拉奥完婚。\n\t2001年阿米尔·汗出演的《印度往事》曾获得了奥斯卡最佳外语片提名。2005年，制作了电影《KetanMehta's The Rising》(2005)。2007年，阿米尔·汗开始尝试导演一职，并因导演影片《Taare Zameen par》获得Filmfare电影节最佳导演奖 。\n",
        "image": "https://img1.doubanio.com/view/celebrity/raw/public/p13628.jpg",
        "birthday": "1965年03月14日",
        "place_of_birth": "印度,孟买",
        "gender": 1,
        "career": "演员 / 制片人 / 导演 / 编剧 / 配音"
      },
      movies: [
        {
          "id": 54,
          "movie_name": "地球上的星星 Taare Zameen Par",
          "overview": "\t对于8岁的男孩伊夏（达席尔·萨法瑞 Darsheel Safary饰）来说，世界是充满了惊奇和快乐的万花筒，他正在用一切他能够想到的方式和这个陌生的世界进行着交流，同时也充分的享受着大地万物慷慨的赠与。可是，这样的伊夏却是成年人眼中的问题儿童，他的成绩不好，在班上的排名靠后，脑子里还充满了各种匪夷所思的鬼点子，在又一次闯下大祸后，忍无可忍的父母将他送往了寄宿学校。\n\t虽然伊夏的新生活并没有什么改变，但在内心里，和父母分离的生活让他感到闷闷不乐，这时，一位名叫尼克（阿米尔·汗 Aamir Khan饰）的美术老师走进了他的生活。和以往所见到的固守成规的老师不同，尼克主张让学生们保留自己的个性和思想，自由的发展。在和尼克相处的日子里，伊夏和尼克都慢慢的成熟了起来。\n", "release_date": "2007-12-21",
          "duration": "2H45M",
          "image": "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2197897857.jpg",
          "region": "印度",
          "vote_average": 0.0,
          "vote_count": 0
        }
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
          "id": 1,
          "celebrity_name": "涅提·蒂瓦里 Nitesh Tiwari",
          "biography": "",
          "image": "https://img9.doubanio.com/view/celebrity/raw/public/p1484120321.24.jpg",
          "birthday": "",
          "place_of_birth": "",
          "gender": 1,
          "career": "编剧 / 导演 / 制片人"
        },
        {
          "id": 2,
          "celebrity_name": "比于什·古普塔 Piyush Gupta",
          "biography": "",
          "image": "https://img1.doubanio.com/view/celebrity/raw/public/p1498636219.48.jpg",
          "birthday": "",
          "place_of_birth": "",
          "gender": 1,
          "career": "编剧"
        }
      ]
    }
  },


  methods: {
    async refresh() {
      let response = await queryCelebrityDetail('', this.$route.params.id);
      if (response.status === 200) {
        this.actor_information = response.data;
      }
      response = await queryCelebrityImages('', this.$route.params.id);
      if (response.status === 200) {
        this.photos = response.data.images;
      }
      response = await queryCelebrityCooperation('', this.$route.params.id);
      if (response.status === 200) {
        this.partners = response.data.celebrities;
      }
      response = await queryCelebrityMovies('', this.$route.params.id);
      if (response.status === 200) {
        this.movies = response.data.movies;
      }
      console.log(this.photos)
    },
    starActor() {
      alert('关注成功！')
    },
    deleteStarActor() {
      alert('您已取消关注！')
    },
    calculateImageFitPattern(fixedHeight, src) {
      let imgObj = new Image();
      imgObj.src = src;
      let ratio = imgObj.width / imgObj.height;
      return "width: " + fixedHeight * ratio + "px; height: " + fixedHeight + "px;";
    },
    async calculateImageWidthPattern(fixedHeight, src) {
      let imgObj = new Image();
      imgObj.src = src;
      let ratio = imgObj.width / imgObj.height;
      return fixedHeight * ratio;
    },
  },

  computed: {
  },

  async mounted() {
    await this.refresh();
  }
}
</script>

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