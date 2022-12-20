<template>
  <div id="commentMovie">
    <v-tabs centered v-model="activeIndex">
      <v-tab @click="jumpToOverView" :href="`#tab-1`">概览</v-tab>
      <v-tab @click="jumpToMedia" :href="`#tab-2`">媒体</v-tab>
      <v-tab :href="`#tab-3`">短评区</v-tab>
      <v-tab @click="jumpToReview" :href="`#tab-4`">影评区</v-tab>
    </v-tabs>

    <v-tabs-items v-model="activeIndex">
      <v-tab-item :value="`tab-3`">
        <v-container fluid style="width: 90%; margin-top: 0px; margin-left: 50px">

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
                                            <a style="font-size: 16px" class="my-auto pl-3">{{ comment.author_details.nickname}}</a>
                                            <v-rating class="my-auto pl-3"
                                                      :value="comment.value" color="amber" dense
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
                  <a>{{ movie.movie_name }}</a>
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

export default {
  name: 'CommentMovieView',
  async mounted() {
    await this.refresh();
  },
  data() {
    return {
      activeIndex: 'tab-3',
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
      all_comments: [
        {
          id: 1,
          avatar: require("../../assets/pics/anne.jpg"),
          introduction: "最强科幻片不过如此",
          rating: 4.0,
          time: "2022-10-12",
          user: "user2",
        },
        {
          id: 2,
          avatar: require("../../assets/pics/anne.jpg"),
          introduction: "最强科幻片不过如此 最强科幻片不过如此 最强科幻片不过如此" +
              "最强科幻片不过如此" +
              "最强科幻片不过如此" +
              "最强科幻片不过如此" +
              "最强科幻片不过如此" +
              "最强科幻片不过如此" +
              "最强科幻片不过如此最强科幻片不过如此最强科幻片不过如此最强科幻片不过如此最强科幻片不过如此" +
              "最强科幻片不过如此",
          rating: 4.0,
          time: "2022-10-12",
          user: "user2",
        },
        {
          id: 3,
          avatar: require("../../assets/pics/anne.jpg"),
          introduction: "最强科幻片不过如此",
          rating: 4.0,
          time: "2022-10-12",
          user: "user2",
        },
        {
          id: 4,
          avatar: require("../../assets/pics/anne.jpg"),
          introduction: "最强科幻片不过如此",
          rating: 4.0,
          time: "2022-10-12",
          user: "user2",
        }
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
          this.all_comments[i].author_details.avatar = "http://localhost:8080/api/" + this.all_comments[i].author_details.avatar;
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

      console.log(this.actors)
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