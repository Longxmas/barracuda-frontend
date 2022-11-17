<template>
  <div id="addReview">
    <v-container fluid class="mx-auto mt-5" style="width: 80%; min-height: 1000px; min-width:1000px;overflow: scroll">
      <v-row>
        <v-card flat>
          <v-card-title>
            <h2>写影评</h2>
          </v-card-title>
        </v-card>
      </v-row>

      <v-row>
        <v-col>
          <v-card elevation="5" class="mb-5" style="border-radius: 10px" width="100%">
            <v-card-text class="pa-0">
              <v-container fluid>
                <v-row>
                  <v-img :src="movie.image" max-width="150px"
                         style="border-bottom-left-radius: 10px; border-top-left-radius: 10px"
                  >
                  </v-img>

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
                          <a>
                            <h3 style="font-family: 微软雅黑,serif;font-size: 20px;color: black; line-height: normal"
                                class="ma-auto pa-0 "
                                @click="jumpToMovie">{{ movie.movie_name }}</h3>
                          </a>


                          <span>{{ movie.release_date }}</span>
                        </v-col>
                      </v-row>

                      <v-row class="pl-2">
                        <p style="text-overflow: ellipsis;
                                        overflow: hidden;
                                        display: -webkit-box;
                                        -webkit-box-orient: vertical;
                                        -webkit-line-clamp: 4;
                                        line-height: 20px;
                                        max-height: 80px;
                                        font-family: 微软雅黑,serif;
                                        font-size: 16px;
                                        color: black;
                                        min-height: 50px">
                          {{ movie.overview }} </p>
                      </v-row>

                      <v-row>
                        <v-col cols="8" sm="2" class="pa-0">
                          <v-btn icon color="pink" large>
                            <v-icon>mdi-heart</v-icon>
                          </v-btn>
                          <span
                              style="font-family: 微软雅黑, serif; font-size: 16px; color: #afb6b5">添加收藏</span>
                        </v-col>

                        <v-col cols="8" sm="2" class="pa-0">
                          <v-menu offset-x>
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
                                    v-model="user_rate"
                                    color="yellow darken-3"
                                    background-color="grey darken-1"
                                    empty-icon="$ratingFull"
                                    half-increments
                                    hover
                                ></v-rating>
                              </v-list-item>
                            </v-list>

                          </v-menu>

                          <span style="font-family: 微软雅黑, serif; font-size: 16px; color: #afb6b5">我的评分</span>

                        </v-col>
                      </v-row>
                    </v-container>
                  </v-col>
                </v-row>
              </v-container>

            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="pb-0">
        <v-col>
          <v-text-field
              single-line
              style="color: black; font-size: 25px; font-weight: bold"
              placeholder="请输入影评标题"
              :value="review_title"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <mavon-editor @imgAdd="imageAdd" ref="editor" v-model="content" :toolbars="toolbars"
                        style="min-height: 600px"/>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="d-flex flex-row-reverse">
          <v-btn @click="addReview">
            <v-icon>mdi-send</v-icon>
            发布
          </v-btn>
        </v-col>
      </v-row>

    </v-container>

  </div>
</template>

<script>
import {addReview, queryMovieDetail} from "@/api/movie";

export default {
  name: "addReview",
  async mounted() {
    await this.refresh();
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data: function () {
    return {
      name: "AddReview.vue",
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
        "genres": [{"id": 1, "name": "剧情"}, {"id": 2, "name": "家庭"}, {"id": 3, "name": "传记"}, {
          "id": 4,
          "name": "运动"
        }]
      },
      review_title: '',
      user_name: "flyinglandlord",
      user_avatar: "https://api.yimian.xyz/img?type=head",
      user_rate: 5,
      review_date: "2020-01-01",

      content: this.value,
      toolbars: {
        bold: true,
        italic: true,
        header: true,
        underline: true,
        strikethrough: true,
        mark: true,
        superscript: true,
        subscript: true,
        quote: true,
        ol: true,
        ul: true,
        link: true,
        imagelink: true,
        code: true,
        table: true,
        fullscreen: true,
        readmodel: true,
        htmlcode: true,
        help: true,
        undo: true,
        redo: true,
        trash: true,
        save: false,
        navigation: true,
        alignleft: true,
        aligncenter: true,
        alignright: true,
        subfield: true,
        preview: true
      }
    };
  },
  watch: {
    value: function (updated) {
      this.content = updated;
    },
    content: function (old, updated) {
      if (old !== updated) {
        this.$emit('input', this.content);
      }
    }
  },
  methods: {
    async refresh() {
      let response = await queryMovieDetail('', this.$route.params.id);
      if (response.status === 200) {
        this.movie = response.data;
      }
      console.log(this.movie);
    },
    async imageAdd(pos, file) {
      let formData = new FormData();
      formData.append('file', file);
    },
    jumpToMovie() {
      this.$router.push('/movie/' + this.$route.params.id);
    },
    addReview() {
      let response = addReview(
          {
            title: this.review_title,
            content: this.content
          },
          this.$route.params.id
      );
      console.log(response);
      this.refresh();
    }
  }
};
</script>

<style scoped>

</style>