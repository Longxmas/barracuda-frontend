<template>
  <div id="allMovieView">

    <v-container fluid style="width: 90%; margin-top: 10px; margin-left: 50px">
      <h1>所有电影</h1>
      <v-container fluid>
        <v-row>
          <v-col lg="4"
                 md="4"
                 sm="6"
                 xs="8"
                 style="padding: 15px 50px 0 0">
            <v-expansion-panels style="margin-bottom: 20px;">
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <h3>排序</h3>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  结果排序
                  <v-select
                      :items="sortType"
                      v-model="selectSortType"
                      label="排序方式"
                  ></v-select>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>

            <v-expansion-panels style="margin-bottom: 20px">
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <h3>筛选</h3>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <p style="margin-top: 20px">发行日期</p>
                  <v-text-field
                      v-model="dateRangeText"
                      label="Date range"
                      prepend-icon="mdi-calendar"
                      readonly
                      clearable
                      style="font-size: 15px"
                      @click:clear="clearDate"
                  ></v-text-field>
                  <v-date-picker
                      v-model="dates"
                      range
                      full-width
                  ></v-date-picker>
                  <v-divider></v-divider>
                  <p style="margin-top: 20px">类型</p>
                  <v-chip-group
                      v-model="movieType"
                      column
                      multiple
                      active-class="primary--text"
                  >
                    <v-chip
                        v-for="tag in tags"
                        :key="tag"
                        :label="tag"
                    > {{ tag }}
                    </v-chip>
                  </v-chip-group>

                  <v-divider></v-divider>
                  <p style="margin-top: 20px">语言</p>
                  <v-chip-group
                      v-model="selectedLanguage"
                      column
                      multiple
                      active-class="primary--text">
                    <v-chip
                        v-for="languageTag in languageTags"
                        :key="languageTag"
                        :label="languageTag">
                      {{ languageTag }}
                    </v-chip>
                  </v-chip-group>

                  <v-divider></v-divider>
                  <p style="margin-top: 20px">评分</p>
                  <v-slider
                      v-model="ratingSelector"
                      :max="10"
                      :min="0"
                      :step="0.5"
                      :ticks="true"
                      thumb-label="always"
                      thumb-color="primary"
                      track-color="primary"
                      style="margin-top: 40px"
                  >
                  </v-slider>

                  <v-divider></v-divider>
                  <p style="margin-top: 20px">时长</p>
                  <v-range-slider
                      v-model="durationSelector"
                      :max="300"
                      :min="0"
                      :step="10"
                      :ticks="true"
                      thumb-label="always"
                      thumb-color="primary"
                      track-color="primary"
                      style="margin-top: 40px">

                  </v-range-slider>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>

            <v-btn rounded>
              搜索
            </v-btn>
          </v-col>

          <v-col lg="8"
                 md="8"
                 sm="6"
                 xs="4" style="margin-top: 0;">
            <v-item-group>
              <v-container fluid>
                <v-row>
                  <v-col
                      v-for="movie in movies"
                      :key="movie.id"
                      class="pt-0"
                      lg="3"
                      md="4"
                      sm="6"
                      xs="12"
                  >
                    <v-card
                        :href="'/movie/' + movie.id"
                        style="margin-bottom: 20px"
                        max-width="180px"
                    >
                      <v-img
                          :src="movie.image"
                          contain
                      ></v-img>
                      <v-card-title>
                        {{ movie.movie_name }}
                      </v-card-title>
                      <v-card-subtitle>
                        {{ movie.release_date }}
                      </v-card-subtitle>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-item-group>
          </v-col>
        </v-row>
      </v-container>
    </v-container>

  </div>
</template>

<script>
import {queryAllMovies} from "@/api/movie";

export default {
  name: 'allMovieView',
  async mounted() {
    await this.refresh();
  },
  data() {
    return {
      name: "allMovieView",
      sortType: [
        '按评分排序',
        '按时间排序',
      ],
      selectSortType: '按热度排序',
      ratingSelector: 5,
      displayType: null,
      dates: ['2019-09-10', '2019-09-20'],
      movieType: [],
      durationSelector: [0, 300],
      selectedLanguage: [],
      languageTags: [
        '英语',
        '中文',
        '日语',
        '韩语',
        '法语',
        '德语',
        '西班牙语',
        '意大利语',
        '俄语',
        '葡萄牙语',
        '泰语',
        '阿拉伯语',
        '其他',
      ],
      tags: ['Work',
        'Home Improvement',
        'Vacation',
        'Food',
        'Drawers',
        'Shopping',
        'Art',
        'Tech',
        'Creative Writing',],
      movies: [
          {
            "id": 1,
            "movie_name": "摔跤吧！爸爸 Dangal",
            "overview": "\t马哈维亚（阿米尔·汗 Aamir Khan饰）曾经是一名前途无量的摔跤运动员，在放弃了职业生涯后，他最大的遗憾就是没有能够替国家赢得金牌。马哈维亚将这份希望寄托在了尚未出生的儿子身上，哪知道妻子接连给他生了两个女儿，取名吉塔（法缇玛·萨那·纱卡 Fatima Sana Shaikh饰）和巴比塔（桑亚·玛荷塔 Sanya Malhotra饰）。让马哈维亚没有想到的是，两个姑娘展现出了杰出的摔跤天赋，让他幡然醒悟，就算是女孩，也能够昂首挺胸的站在比赛场上，为了国家和她们自己赢得荣誉。\n\t就这样，在马哈维亚的指导下，吉塔和巴比塔开始了艰苦的训练，两人进步神速，很快就因为在比赛中连连获胜而成为了当地的名人。为了获得更多的机会，吉塔进入了国家体育学院学习，在那里，她将面对更大的诱惑和更多的选择。\n",
            "release_date": "2016-12-23",
            "duration": "2H41M",
            "image": "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2401676338.jpg",
            "region": "印度",
            "vote_average": 0.0,
            "vote_count": 0,
            "genres": [{"id": 1, "name": "剧情"}, {"id": 2, "name": "家庭"}, {"id": 3, "name": "传记"}, {"id": 4, "name": "运动"}]
          },
        {
            "id": 2,
            "movie_name": "何以为家 كفرناحوم",
            "overview": "\t法庭上，十二岁的男孩赞恩向法官状告他的亲生父母，原因是，他们给了他生命。是什么样的经历让一个孩子做出如此不可思议的举动？故事中，赞恩的父母在无力抚养和教育的状况下依然不停生育，作为家中的长子赞恩，弱小的肩膀承担了无数生活的重压。当妹妹被强行卖给商贩为妻时，赞恩愤怒离家，之后遇到一对没有合法身份的母子，相互扶持勉强生活。然而生活并没有眷顾赞恩，重重磨难迫使他做出了令人震惊的举动……\n",
            "release_date": "2018-05-17",
            "duration": "2H6M",
            "image": "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2555295759.jpg",
            "region": "黎巴嫩 / 美国 / 法国 / 塞浦路斯 / 卡塔尔 /英国",
            "vote_average": 0.0,
            "vote_count": 0,
            "genres": [{"id": 1, "name": "剧情"}]}
      ]
    }
  },
  methods: {
    clearDate() {
      this.dates = []
    },
    async refresh() {
      let response = await queryAllMovies('');
      if (response.status === 200) {
        this.movies = response.data;
      }
      console.log(this.movies);
    },
  },
  computed: {
    dateRangeText() {
      return this.dates.join('~')
    },
  },
}
</script>