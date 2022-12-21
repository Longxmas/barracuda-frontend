<template>
  <div id="mainView">
    <v-container fluid style="padding-top: 0;">
      <v-card max-height="800px">
        <v-img src="../assets/mainpage_background.png" max-height="300px">
          <v-card-text class="home-search-box">
            <h1 style="color: white" class="main-h1">欢迎。</h1>
            <br>
            <h2 id="main-h2" style="color: white" class="main-h2">这里有海量的电影、剧集和人物等你来发现。快来探索吧！</h2>
            <v-container fluid style="margin-top: 45px">
              <v-row>
                <v-col cols="10" style="padding-left: 0">
                  <v-text-field
                      label="搜索电影、剧集、人物..."
                      solo
                      color="white"
                      style="border-radius: 30px"
                      v-model="query"
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-btn rounded color="warning" light large @click="searchNow()">
                    搜索
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-img>
      </v-card>
    </v-container>

    <v-container fluid>
      <v-row>
        <v-col cols="12" class="mx-auto">
          <v-card elevation="0">
            <v-card-title>
              <h3>热门电影</h3>
            </v-card-title>
            <v-card-text>

              <ul style="width: auto" class="photo-ul">
                <li v-for="(item,i) in hotMovies"
                    :key="i"
                    class="parent_center">
                  <v-card
                      class="mx-auto "
                      elevation="0"
                      max-width="200"
                      style="text-align: center"
                      :href="'/movie/' + item.id"
                  >
                    <v-img
                        :src="item.image"
                        max-width="200px"
                        height="300px"
                    >
                    </v-img>

                    <!-- TODO::VALUE应当是评分-->
                    <v-progress-circular
                        :value="item.vote_average * 10"
                        color="#13C00DFF"
                        width="3"
                        size="40"
                        rotate="270"
                        style="margin-top: -30px; margin-right: 115px; background-color: #0b1c22; border-radius: 100%"
                    >
                      <span style="color: white; font-family: gotham-bold,serif; font-size: 18px">{{ Math.round(item.vote_average * 10) }}</span>
                    </v-progress-circular>

                    <v-card-text class="text--primary" style="padding: 3px !important;">
                      <div><h4>{{ item.movie_name }}</h4></div>
                    </v-card-text>

                  </v-card>
                </li>
              </ul>

            </v-card-text>
          </v-card>


          <v-card elevation="0">
            <v-card-title>
              <h3>经典电影</h3>
            </v-card-title>
            <v-card-text>

              <ul style="width: auto" class="photo-ul">
                <li v-for="(item,i) in classicMovies"
                    :key="i"
                    class="parent_center">
                  <v-card
                      class="mx-auto"
                      elevation="0"
                      max-width="400"
                      style="text-align: center"
                      :href="'/movie/' + item.id"
                  >
                    <v-img
                        :src="item.image"
                        max-width="200px"
                        height="300px"
                    >
                    </v-img>

                    <!-- TODO::VALUE应当是评分-->
                    <v-progress-circular
                        :value="item.vote_average * 10"
                        color="#13C00DFF"
                        width="3"
                        size="40"
                        rotate="270"
                        style="margin-top: -30px; margin-right: 115px; background-color: #0b1c22; border-radius: 100%"
                    >
                      <span style="color: white; font-family: gotham-bold,serif; font-size: 18px">{{ Math.round(item.vote_average * 10) }}</span>
                    </v-progress-circular>

                    <v-card-text class="text--primary" style="padding: 3px !important;">
                      <div><h3>{{ item.movie_name }}</h3></div>
                    </v-card-text>

                  </v-card>
                </li>
              </ul>

            </v-card-text>
          </v-card>


          <v-card elevation="0">
            <v-card-title>
              <h3>今日推荐</h3>
            </v-card-title>

            <v-card-text>
              <v-container style="padding: 0 0 0 0">
                <v-row style="padding-left: 0">
                  <v-col cols="9" class="mx-auto">

                    <v-carousel
                        cycle
                        height="400px"
                        hide-delimiter-background
                        hide-delimiters
                        show-arrows-on-hover
                    >

                      <v-carousel-item
                          v-for="(item, i) in suggests"
                          :key="i"
                      >
                        <v-container
                            height="400px"
                            class="pa-0"
                        >
                          <v-row no-gutters>
                            <v-col cols="4" class="pa-0">
                              <a>
                                <v-img :src="item.image" height="100%" aspect-ratio="1"
                                       @click="jumpToMovie(item.id)">
                                </v-img>
                              </a>


                            </v-col>

                            <v-col cols="8" class="pa-0">
                              <v-card
                                  max-height="400"
                                  style="background-color: ghostwhite;"
                                  height="400"
                                  @click="jumpToMovieMedia(item.id)"
                              >
                                <v-card style="padding: 15% 10% 0 10%; background: transparent" elevation="0">
                                  <span style="font-family: 微软雅黑,serif; font-size: 20px; line-height: normal; ">
                                    {{ item.movie_name }}
                                  </span>
                                  <br>
                                  <br>
                                  <span
                                      style="font-family: 微软雅黑, serif; font-size: 15px; line-height: normal; color: #afb6b5">
                                    {{ suggest_contents[i].content }}
                                  </span>
                                </v-card>
                              </v-card>
                            </v-col>
                          </v-row>

                        </v-container>
                      </v-carousel-item>
                    </v-carousel>
                  </v-col>
                </v-row>

              </v-container>
            </v-card-text>
          </v-card>


          <v-card elevation="0" width="100%" >
            <v-card-title>
              <h3>最新影评</h3>
            </v-card-title>
            <v-card-text class="pl-10">
              <v-list  class="pl-0">
                <v-list-item
                    v-for="(review,i) in reviews"
                    :key=i
                    class="pl-0"
                >
                  <v-card elevation="5" class="mb-5" style="border-radius: 10px" width="100%">
                    <v-card-text class="pa-0">
                      <v-container fluid >
                        <v-row>
                          <v-img :src="review.movie_details.image" max-width="150px"
                                 style="border-bottom-left-radius: 10px; border-top-left-radius: 10px"></v-img>
                          <v-col style="margin-left: 5px">
                            <v-container fluid>

                              <v-row class="pl-0 pt-0">
                                <v-col class="pa-0">
                                  <a :href="'/review/'+review.id" style="text-decoration: none" @click="jumpToMovieReview(review)">
                                    <h3 style="font-family: 微软雅黑,serif;font-size: 20px;color: black; line-height: normal"
                                        class="ma-auto pa-0 ">{{ review.title }}</h3>
                                  </a>
                                </v-col>
                              </v-row>

                              <v-row class="py-4">
                                <v-avatar>
                                  <v-img :src="review.author_details.avatar" alt="Avatar"></v-img>
                                </v-avatar>
                                &ensp;
                                <a style="margin-top: 15px; margin-bottom: 15px; font-size: 16px" @click="jumpToUserProfile(review.author_details.id)">{{ review.author_details.nickname }}</a>
                                &ensp;
                                <p style="margin-top: 15px; margin-bottom: 15px; font-size: 16px">评论</p>
                                &ensp;
                                <a style="margin-top: 15px; margin-bottom: 15px; font-size: 16px" @click="jumpToMovie(review.movie_details.id)">
                                  {{  review.movie_details.movie_name}}
                                </a>
                                &ensp;
                                <p class="my-auto" style="font-size: 16px"> {{review.create_at}} </p>
                                <v-spacer></v-spacer>
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
                                  {{ review.content }} </p>
                              </v-row>

                              <v-row>
                                <v-btn small class="mr-5" style="color: white;background-color: skyblue"  @click="jumpToMovieReview(review)">
                                  <v-icon small class="my-auto"> mdi-heart</v-icon>
                                  &ensp;
                                  {{review.likes}}
                                </v-btn>

                                <v-btn small class="mr-5" style="color: white;background-color: darkorange"  @click="jumpToMovieReview(review)">
                                  <v-icon small class="my-auto"> mdi-message</v-icon>
                                  &ensp;
                                  {{review.reply_count}}
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
        </v-col>

      </v-row>
    </v-container>
  </div>
</template>

<script>
import {queryLatestReview} from "@/api/review";
import {queryMovieDetail} from "@/api/movie";

export default {
  name: "mainView",
  async mounted() {
    await this.refresh();
  },
  data() {
    return {
      name: "mainView",
      query: '',
      background_image: require("../assets/mainpage_background.png"),

      hotMovies: [
        {
          id: 1,
          name: "星际穿越",
          src: require("../assets/interstellar2.png"),
        },
        {
          name: "真探",
          src: require("../assets/p2.webp"),
        },
        {
          name: "星际穿越",
          src: require("../assets/interstellar2.png"),
        },
        {
          name: "真探",
          src: require("../assets/p2.webp"),
        },
        {
          name: "星际穿越",
          src: require("../assets/interstellar2.png"),
        },
        {
          name: "真探",
          src: require("../assets/p2.webp"),
        },
        {
          name: "星际穿越",
          src: require("../assets/interstellar2.png"),
        },
        {
          name: "真探",
          src: require("../assets/p2.webp"),
        },
        {
          name: "星际穿越",
          src: require("../assets/interstellar2.png"),
        },
        {
          name: "真探",
          src: require("../assets/p2.webp"),
        },
      ],
      classicMovies: [],
      reviews: [
        {
          "id": 1250,
          "title": "test33",
          "content": "我觉得这部电影非常的好看！我觉得这部电影非常的好看！我觉得这部电影非常的好看！我觉得这部电影非常的好看！我觉得这部电影非常的好看！我觉得这部电影非常的好看！我觉得这部电影非常的好看！我觉得这部电影非常的好看！我觉得这部电影非常的好看！我觉得这部电影非常的好看！我觉得这部电影非常的好看！我觉得这部电影非常的好看！我觉得这部电影非常的好看！我觉得这部电影非常的好看！我觉得这部电影非常的好看！我觉得这部电影非常的好看！我觉得这部电影非常的好看！我觉得这部电影非常的好看！我觉得这部电影非常的好看！我觉得这部电影非常的好看！我觉得这部电影非常的好看！我觉得这部电影非常的好看！我觉得这部电影非常的好看！我觉得这部电影非常的好看！",
          "create_at": "2022-12-21 10:45:09",
          "update_at": "2022-12-21 10:45:09",
          "likes": 0,
          "reply_count": 5,
          "author_details": {
            "id": 33,
            "username": "test33",
            "nickname": "test33",
            "introduction": "test_introduction33",
            "avatar": "/media/User/avatar/initial.jpg",
            "email": "",
            "create_at": "2022-12-21 10:44:46"
          },
          "movie_details": {
            "id": 250,
            "movie_name": "上帝之城 Cidade de Deus",
            "image": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p455677490.jpg",
            "region": "巴西 / 法国",
            "vote_sum": 32,
            "vote_count": 5,
            "duration": "130分钟",
            "vote_average": 6.4,
            "overview": "\t巴西里约热内卢的贫民窟，这里是“上帝之城”，更是魔鬼也会叹息着转身的地方。\n\t阿炮（Alexandre Rodrigues 饰）带着我们到了这里，他见证了这里二十多年来被残暴、贪婪、复仇、野心、背叛、掠夺所裹挟的混乱生活以及最终导致的一场灾难性的黑帮争斗。虽然从小就要 辗转于匪徒间求生存，但胆小怕事的性格与自我保护的本能却使他一直能平安度日。\n\t60年代初，阿毛、阿夹和阿呆是这里的“少年三侠”，在抢劫完旅馆之后，他们三人分道扬镳，阿夹重回上帝的怀抱，而阿呆和阿毛纷纷付出了生命的代价。\n\t70年，当年“少年三侠”手下的小弟小豆子（Douglas Silva 饰）靠着自己的心狠手辣，不停地吞并别人的地盘，成为了贫民区的“小霸王”，生意也从抢劫升级到了更为暴利的毒品买卖，和他一起飞黄腾达的还有班尼（Phellipe Haagensen 饰）。\n\t班尼认识了美丽的安...\n",
            "release_date": "2002-05-18"
          }
        }
      ],
      suggests: [
        {
          movie: {

          },
          suggest_title: "",
          suggest_cotent: ""
        }
      ],
      suggest_titles : [
          "知己难求",
          ""
      ],
      suggest_contents : [
        {
          content:"每个人都至少有这么一个挚友，你和他/她在人生的拐点遇到，惊叹于彼此的不同或者相似," +
              " 有过不少平淡无奇却值得纪念的时光，ta会将心比心，为你的哀伤扼腕，为你的快慰击节，更会在ta的心里，" +
              "为你留下那么一块永恒的位置，任白云苍狗，风云变幻。只叹今生，得缘遇见你。"
        },
        {
          content:"当李奥纳多从梦中醒来之后，他向四周望去，曾经在梦中和他一起出生入死的伙伴都在，大家心照不宣眼神，这比梦还美好的一刻，你永远无法在梦中体会得到。"
        },
        {
          content:"在姜文的电影里，理想有时是一种很虚很模糊的东西。张麻子的理想是打土豪分田地，" +
              "张麻子的理想却又不是打土豪分田地。张麻子的理想是什么？恐怕他自己也说不清楚。理想在内心最深处，" +
              "在远处的青山和夕阳里。你知道它在那儿，却永远不知道如何去追寻它。可是当碉楼已破黄四郎已擒，" +
              "你们抽着烟聊着天的时候，你就明白它依然在那儿等着你。"
        },
        {
          content:"  犹记得瑞梅尔残破的桥头，霍瓦斯中士面对着米勒上尉，柔和的眼神融化在夕阳的余晖里：" +
              " “有一天我们回首往事，会觉得拯救大兵瑞恩是我们在这个战火纷飞的年代里，完成的一件杰作。”"
        },
        {
          content:" 其实在麦克心里，弗雷多是他最想去保护的兄弟。他送弗雷多去拉斯维加斯，外人看起来是一种放逐，" +
              "其实麦克深知二哥的性格不适合在帮派中担任要职，他希望二哥远离权力核心，远离帮派斗争，过平静幸福的生活。" +
              "但弗雷多未能理解弟弟的苦心。"
        },
        {
          content:"那个屋子永远不会衰老，它站在瀑布边站成了回忆时的美好与自然的注脚。" +
          "Pixar反复刻画的声色是我们遥遥在望的日暮和未曾来临的清晨。影片开头的十几分钟就已经泪流满面，" +
              "只觉得平平淡淡值得珍贵， Carl和Ellie相守芳菲不尽，初遇到黄昏，相看两不厌，尘世多么美。"
        },
        {
          content:"世界上哪一种功夫最强？不是如来神掌，不是蛤蟆功，不是太极或者狮子吼。" +
              "世界上最强的功夫在《功夫》中有生动的诠释，就是阿星被火云邪神打得没头没脸之时，" +
              "用比火柴棒稍粗的木棍对火云邪神的迎头轻轻一击。这轻轻一击，意味着他天良未泯，" +
              "终于选择善良需要极大的勇气，而在具备了这样的勇气之后，反抗恶势力——哪怕是最强的,也是顺理成章的事情。"
        },


      ],
    };
  },
  methods: {
    async refresh() {
       let response = await queryLatestReview('');
       if (response.status === 200) {
         this.reviews = response.data.slice(0, 5);
       }
       for (let i = 0 ; i < this.reviews.length; i++) {
         this.reviews[i].author_details.avatar = "http://localhost:8080/api/" + this.reviews[i].author_details.avatar;
       }

       let new_hotMovies = [];
       let hotMovies_ids = [1, 2, 10, 11, 12, 13, 14, 18, 22, 23, 24, 26, 30, 33, 35]
       for (let i = 1;i <= 15; i++) {
         response = await queryMovieDetail('',hotMovies_ids[i - 1]);
         let movie = response.data;
         new_hotMovies.push(movie);
       }
       this.hotMovies = new_hotMovies;


      new_hotMovies = [];
      let classicMovies_ids = [61, 64, 68, 70, 74, 75, 76, 77, 79, 80, 83, 84, 86, 87, 90]
      for (let i = 1;i <= 15; i++) {
        response = await queryMovieDetail('',classicMovies_ids[i - 1]);
        let movie = response.data;
        new_hotMovies.push(movie);
      }
      this.classicMovies = new_hotMovies;

      let suggest_ids = [140, 139, 137, 111, 116, 117, 120]
      new_hotMovies = [];
      for (let i = 0;i < 7; i++) {
        response = await queryMovieDetail('',suggest_ids[i]);
        let movie = response.data;
        new_hotMovies.push(movie);
      }
      this.suggests = new_hotMovies;




    },

    async searchNow() {
      console.log('search');
      if (this.query === this.$route.query.query) {
        return;
      }
      await this.$router.push('/search/movie?query=' + this.query);
    },

    jumpToMovieReview(review) {
      this.$router.push('/review/' + review.id);
    },
    jumpToUserProfile(user_id) {
      this.$router.push('/user/' + user_id);
    },
    jumpToMovie(movie_id) {
      this.$router.push('/movie/' + movie_id);
    },
    jumpToMovieMedia(movie_id) {
      this.$router.push('/movie/' + movie_id + '/media/videos/');
    },



  },
  computed: {}
}
</script>

<style scoped>
.main-h1 {
  font-family: 微软雅黑, serif;
  font-size: 45px;
}

.main-h2 {
  font-family: 微软雅黑, serif;
  font-size: 30px;
  line-height: normal;
}

.home-search-box {
  padding: 60px 0 0 70px;

}

.outer-up {
  color: white;
  font-size: 1px !important;
  vertical-align: text-top !important;
}
</style>