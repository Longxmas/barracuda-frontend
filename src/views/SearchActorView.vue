<template>
  <div id="searchMovieView">
    <v-container  fluid  style="width: 90%">
      <v-container  fluid>
        <v-row>
          <v-col lg="3"
                 md="3"
                 sm="6"
                 xs="8" style="margin-top: 0;">
            <v-card
                class="mx-auto rounded-lg"
                max-width="300"
            >
              <v-card color="#01b4e4">
                <v-card-title>
                  <h3 style="color: white"> “{{this.$route.query.query}}” 的搜索结果</h3>
                </v-card-title>
              </v-card>
              <v-list>
                <v-list-item-group color="primary" v-model="choose_type">
                  <v-list-item :href="'/search/movie?query=' + this.$route.query.query">
                    <v-list-item-content>
                      <v-container fluid>
                        <v-row align="center">
                          <v-col class="pt-0 pb-0">
                            <p class="my-auto">影片</p>
                          </v-col>
                          <v-col class="d-flex flex-row-reverse pt-0 pb-0">
                            <v-chip pill>{{ this.movie_results.length }}</v-chip>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item :href="'/search/actor?query=' + this.$route.query.query">
                    <v-list-item-content>
                      <v-list-item-title>
                        <v-container fluid>
                          <v-row align="center">
                            <v-col class="pt-0 pb-0">
                              <p class="my-auto">人物</p>
                            </v-col>
                            <v-col class="d-flex flex-row-reverse pt-0 pb-0">
                              <v-chip pill>{{ actors.length }}</v-chip>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                </v-list-item-group>
              </v-list>
            </v-card>
          </v-col>

          <v-col lg="9"
                 md="9"
                 sm="6"
                 xs="4" style="margin-top: 0;">
            <v-list>
              <v-list-item
                  v-for="(actor,i) in actors"
                  :key=i
              >
                <v-card elevation="5" class="mb-5" style="border-radius: 10px" width="100%">
                  <v-card-text class="pa-0">

                    <v-container fluid>
                      <v-row>
                        <v-img :src="actor.image" max-width="150px"
                               style="border-bottom-left-radius: 10px; border-top-left-radius: 10px"
                               @click="jumpToActor(actor)"
                        ></v-img>
                        <v-col style="margin-left: 5px">
                          <v-container fluid>

                            <v-row>
                              <v-col>
                                <a :href="'/actor/' + actor.id" style="text-decoration: none">
                                  <h3 style="font-family: 微软雅黑,serif;font-size: 20px;color: black; line-height: normal"
                                      class="ma-auto pa-0 "
                                  >
                                    {{ actor.celebrity_name }}</h3>
                                </a>

                                <span>{{ actor.birthday }}</span>
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
                                {{ actor.biography }} </p>
                            </v-row>


                            <v-row>
                              <v-col cols="8" sm="4" class="pa-0">
                                <v-btn icon color="pink" large @click="starActor(actor)">
                                  <v-icon>mdi-star</v-icon>
                                </v-btn>
                                <span
                                    style="font-family: 微软雅黑, serif; font-size: 16px; color: #afb6b5">添加关注</span>
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
          </v-col>
        </v-row>
      </v-container>

    </v-container>

  </div>
</template>

<script>
import {searchActor, starActor} from "@/api/celebrity";
import {searchMovie} from "@/api/movie";
import {getStarCelebrities} from "@/api/user";

export default {
  name: 'searchActorView',
  async mounted() {
    this.$emit('showSearchBar', this.$route.query.query);
    await this.refresh();
  },
  data() {
    return {
      choose_type: 1,
      actors: [
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
      movie_results: [],
    }
  },
  watch: {
    '$route.query.query': function (newVal, oldVal) {
      if (newVal === oldVal) {
        return;
      }
      this.$emit('showSearchBar', newVal);
      this.refresh();
    }
  },
  methods: {
    async refresh() {
      let response = await searchActor(
          {
            query: this.$route.query.query,
            limit: 100,
            offset: 1,
          }
      );
      if (response.status === 200) {
        this.actors = response.data.celebrities;
      }

      response = await searchMovie(
          {
            query: this.$route.query.query,
            limit: 100,
            offset: 1,
          }
      );
      if (response.status === 200) {
        this.movie_results = response.data.movies;
      }
    },
    jumpToActor(actor) {
      this.$router.push({path: '/actor/' + actor.id});
    },

    async checkStar(actor) {
      let response = await getStarCelebrities('', this.$store.getters["user/id"]);
      if (response.status === 200) {
        this.isStarred = false;
        console.log(response);
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].id.toString() === actor.id.toString()) {
            this.isStarred = true;
            break;
          }
        }
      }

    },



    async starActor(actor) {
      await this.checkStar(actor);
      if (this.isStarred) {
        this.$message.warning('虽然你很喜欢他/它，但是你也只能收藏一次捏~(￣▽￣)~*')
      } else {
        let response = await starActor('', this.$store.getters["user/id"], actor.id);
        if (response.status === 200) {
          this.$message.success('关注成功！')
          this.isStarred = true;
        }
      }
    },

  },
  computed: {

  }
}
</script>