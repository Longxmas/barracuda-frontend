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
                  <p>显示</p>
                  <v-radio-group
                      v-model="displayType"
                      mandatory
                  >
                    <v-radio
                        label="全部"
                        value="全部"
                    ></v-radio>
                    <v-radio
                        label="未观看的电影"
                        value="未观看的电影"
                    ></v-radio>
                    <v-radio
                        label="已观看的电影"
                        value="已观看的电影"
                    ></v-radio>
                  </v-radio-group>
                  <v-divider></v-divider>
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
                      v-model="movieLanguage"
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
                          :src="movie.poster"
                          contain
                      ></v-img>
                      <v-card-title>
                        {{ movie.title }}
                      </v-card-title>
                      <v-card-subtitle>
                        {{ movie.year }}
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
export default {
  name: 'allMovieView',
  data() {
    return {
      name: "allMovieView",
      sortType: [
        '按评分排序',
        '按时间排序',
        '按热度排序',
      ],
      selectSortType: '按热度排序',
      ratingSelector: 5,
      displayType: null,
      dates: ['2019-09-10', '2019-09-20'],
      movieType: [],
      durationSelector: [0, 300],
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
          id: 1,
          poster: 'https://lain.bgm.tv/pic/cover/l/e2/e7/328609_2EHLJ.jpg',
          title: 'ぼっち・ざ・ろっく！',
          year: '2022',
        },
        {
          id: 2,
          poster: 'https://lain.bgm.tv/pic/cover/l/64/5a/290980_Jju6q.jpg',
          title: 'ヤマノススメ Next Summit',
          year: '2022',
        },
        {
          id: 3,
          poster: 'https://lain.bgm.tv/pic/cover/c/0f/50/262897_d3555.jpg',
          title: 'ゆるキャン△ SEASON 2',
          year: '2021',
        },
        {
          id: 3,
          poster: 'https://lain.bgm.tv/pic/cover/l/e5/69/265_Z5Uou.jpg',
          title: '新世紀エヴァンゲリオン',
          year: '1995',
        },
        {
          id: 4,
          poster: 'https://lain.bgm.tv/pic/cover/l/73/26/110467_Fx9tT.jpg',
          title: 'SHIROBAKO ',
          year: '2014',
        },
        {
          id: 1,
          poster: 'https://lain.bgm.tv/pic/cover/l/e2/e7/328609_2EHLJ.jpg',
          title: 'ぼっち・ざ・ろっく！',
          year: '2022',
        },
        {
          id: 2,
          poster: 'https://lain.bgm.tv/pic/cover/l/64/5a/290980_Jju6q.jpg',
          title: 'ヤマノススメ Next Summit',
          year: '2022',
        },
        {
          id: 3,
          poster: 'https://lain.bgm.tv/pic/cover/c/0f/50/262897_d3555.jpg',
          title: 'ゆるキャン△ SEASON 2',
          year: '2021',
        },
        {
          id: 3,
          poster: 'https://lain.bgm.tv/pic/cover/l/e5/69/265_Z5Uou.jpg',
          title: '新世紀エヴァンゲリオン',
          year: '1995',
        },
        {
          id: 4,
          poster: 'https://lain.bgm.tv/pic/cover/l/73/26/110467_Fx9tT.jpg',
          title: 'SHIROBAKO ',
          year: '2014',
        },
        {
          id: 1,
          poster: 'https://lain.bgm.tv/pic/cover/l/e2/e7/328609_2EHLJ.jpg',
          title: 'ぼっち・ざ・ろっく！',
          year: '2022',
        },
        {
          id: 2,
          poster: 'https://lain.bgm.tv/pic/cover/l/64/5a/290980_Jju6q.jpg',
          title: 'ヤマノススメ Next Summit',
          year: '2022',
        },
        {
          id: 3,
          poster: 'https://lain.bgm.tv/pic/cover/c/0f/50/262897_d3555.jpg',
          title: 'ゆるキャン△ SEASON 2',
          year: '2021',
        },
        {
          id: 3,
          poster: 'https://lain.bgm.tv/pic/cover/l/e5/69/265_Z5Uou.jpg',
          title: '新世紀エヴァンゲリオン',
          year: '1995',
        },
        {
          id: 4,
          poster: 'https://lain.bgm.tv/pic/cover/l/73/26/110467_Fx9tT.jpg',
          title: 'SHIROBAKO ',
          year: '2014',
        },
        {
          id: 1,
          poster: 'https://lain.bgm.tv/pic/cover/l/e2/e7/328609_2EHLJ.jpg',
          title: 'ぼっち・ざ・ろっく！',
          year: '2022',
        },
        {
          id: 2,
          poster: 'https://lain.bgm.tv/pic/cover/l/64/5a/290980_Jju6q.jpg',
          title: 'ヤマノススメ Next Summit',
          year: '2022',
        },
        {
          id: 3,
          poster: 'https://lain.bgm.tv/pic/cover/c/0f/50/262897_d3555.jpg',
          title: 'ゆるキャン△ SEASON 2',
          year: '2021',
        },
        {
          id: 3,
          poster: 'https://lain.bgm.tv/pic/cover/l/e5/69/265_Z5Uou.jpg',
          title: '新世紀エヴァンゲリオン',
          year: '1995',
        },
        {
          id: 4,
          poster: 'https://lain.bgm.tv/pic/cover/l/73/26/110467_Fx9tT.jpg',
          title: 'SHIROBAKO ',
          year: '2014',
        },
      ]
    }
  },
  methods: {
    clearDate() {
      this.dates = []
    },
  },
  computed: {
    dateRangeText() {
      return this.dates.join('~')
    },
  },
}
</script>