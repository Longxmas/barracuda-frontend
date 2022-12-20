<template>
  <div id="reviewDetail">
    <v-container fluid style="width: 90%; margin-top: 10px;margin-left: 50px;
                            min-width:900px; overflow: scroll">
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
                  <a style="margin-top: 15px; margin-bottom: 15px; font-size: 16px" @click="jumpToUserProfile(author_details.id)">
                    {{ author_details.nickname }}</a>
                  &ensp;
                  <p style="margin-top: 15px; margin-bottom: 15px; font-size: 16px">评论</p>
                  &ensp;
                  <a style="margin-top: 15px; margin-bottom: 15px; font-size: 16px">{{ movie_details.movie_name }}</a>
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
                    &ensp;
                    已有点赞
                    &ensp;
                    {{ review.likes }}
                  </v-btn>

                  <v-btn large class="mr-5" style="color: white;background-color: darkorange" @click="toBottom">
                    <v-icon class="my-auto"> mdi-message</v-icon>
                    &ensp;
                    已有回复
                    &ensp;
                    {{ review.reply_count }}
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
                        <v-img :src="author_details.avatar"></v-img>
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
                      >添加回复</v-btn>
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

export default {
  name: 'reviewDetail',
  created() {
    this.breadcrumbs_items[1].text = this.review.movie_name;
    //console.log(this.breadcrumbs_items[1])
  },
  async mounted() {
    await this.refresh();
  },

  data() {
    return {
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
      review: {
        id: 1,
        movie_id: 1,
        movie_poster: require('../../assets/interstellar2.png'),
        movie_name: "星际穿越",
        movie_director: "克里斯托弗·诺兰",
        movie_actor:[
            "马修·麦康纳",
        ],
        movie_genre:[
          "科幻",
          "剧情",
          "冒险",
        ],
        movie_date: "2014-11-07",
        movie_duration: "169分钟",
        movie_country: "美国",
        user_name: "flyinglandlord",
        user_avatar: "https://api.yimian.xyz/img?type=head",
        user_rate: 5,
        review_date: "2020-01-01",
        review_title: "这是计组P8的教程",
        review_content:
            "**从拨码开关(`switch`)读入数据**：从拨码开关组B中读入一个无符号32bit数字，设该无符号32bit数字为$n$。\n" +
            "**用户定义开关(`user key`)触发操作**：将$n$显示在数码管上（8个十六进制数字），并通过UART将数码管上显示的数字以ASCII字符形式输出。\n",
        reply_count: 100,
      },
      author_details: {
        username: "flyinglandlord",
        avatar: "https://api.yimian.xyz/img?type=head",
        nickname: "飞翔的房东",
        id:1,
      },
      movie_details : {
        movie_name: "摔跤吧！爸爸 Dangal",
        movie_id: 1,
        movie_poster_path: "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2401676338.jpg"
      },
      replies: [
        {
          id: 1,
          user_name: "Longxmas",
          user_avatar: "https://img3.doubanio.com/icon/u1000001-1.jpg",
          reply_date: "2020-01-01",
          reply_content: "太菜了，我的评价是不如hys一根毛",
          reply_title: "啊对对对",
          reply_thumb: 100,
        },
        {
          id: 2,
          user_name: "Harahan",
          user_avatar: "https://img3.doubanio.com/icon/u1000001-1.jpg",
          reply_date: "2020-01-01",
          reply_content: "太菜了，确实不如我",
          reply_title: "啊对对对",
          reply_thumb: 100,
        },
      ],
      actors: [
        {
          "id": 85, "celebrity_name": "约翰·李·汉考克 John Lee Hancock", "biography": "",
          "image": "https://img2.doubanio.com/view/celebrity/raw/public/p39941.jpg",
          "birthday": "1956年12月15日", "place_of_birth":
              "美国,德克萨斯", "gender": 0, "career": "导演 / 编剧 / 制片人 / 演员 / 制片管理"
        },
        {
          "id": 86, "celebrity_name": "迈克尔·刘易斯 Michael Lewis", "biography": "",
          "image": "https://img2.doubanio.com/view/celebrity/raw/public/p1453114346.61.jpg", "birthday":
              "+1960年10月15日", "place_of_birth": "美国,路易斯安那州,新奥尔良", "gender": 1, "career": "编剧"
        }
      ],
      movie_director: "约翰·李·汉考克 John Lee Hancock",
      movie_id : 1,
      movie: {
        "id": 1,
        "movie_name": "摔跤吧！爸爸 Dangal",
        "overview": "\t马哈维亚（阿米尔·汗 Aamir Khan饰）曾经是一名前途无量的摔跤运动员，在放弃了职业生涯后，他最大的遗憾就是没有能够替国家赢得金牌。马哈维亚将这份希望寄托在了尚未出生的儿子身上，哪知道妻子接连给他生了两个女儿，取名吉塔（法缇玛·萨那·纱卡 Fatima Sana Shaikh饰）和巴比塔（桑亚·玛荷塔 Sanya Malhotra饰）。让马哈维亚没有想到的是，两个姑娘展现出了杰出的摔跤天赋，让他幡然醒悟，就算是女孩，也能够昂首挺胸的站在比赛场上，为了国家和她们自己赢得荣誉。\n\t就这样，在马哈维亚的指导下，吉塔和巴比塔开始了艰苦的训练，两人进步神速，很快就因为在比赛中连连获胜而成为了当地的名人。为了获得更多的机会，吉塔进入了国家体育学院学习，在那里，她将面对更大的诱惑和更多的选择。\n",
        "release_date": "2016-12-23",
        "duration": "2H41M",
        "image": "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2401676338.jpg",
        "region": "印度",
        "vote_average": 0.0,
        "vote_count": 0,
        "movie_director" : " ",
        "genres": [{"id": 1, "name": "剧情"}, {"id": 2, "name": "家庭"}, {"id": 3, "name": "传记"}, {
          "id": 4,
          "name": "运动"
        }]
      },
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
      }

      response = await queryMoviePositionStaff({ position: 0,}, this.movie_id);
      if (response.status === 200) {
        this.movie_director = response.data.staffs[0].celebrity_name;
      }

      response = await queryMoviePositionStaff({ position: 2,}, this.movie_id);
      if (response.status === 200) {
        this.actors = response.data.staffs.slice(0, 2);
      }

      response = await queryReviewLike('', this.$route.params.id);
      if (response.status === 200) {
        this.liked = response.data.liked;
      }

    },

    jumpToOverView() {
      this.$router.push('/movie');
    },
    jumpToMedia() {
      this.$router.push('/moviemedia');
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
        alert("回复成功");
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


  },
  computed: {
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