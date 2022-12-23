<template>
  <div id="allMovieView">

    <v-container fluid style="width: 90%; margin-top: 10px; margin-left: 50px" v-if="!loading">
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

                  <!--
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
                    > {{ tag.name }}
                    </v-chip>
                  </v-chip-group>
                  -->
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

            <v-btn rounded @click="refresh">
              筛选
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

    <div class="text-center" style="margin-top: 5px">
      <v-container>
        <v-row justify="center">
          <v-col cols="8">
            <v-container class="max-width">
              <v-pagination
                  v-model="page_offset"
                  class="my-4"
                  :length="page_count"
                  :total-visible="10"
              ></v-pagination>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </div>

  </div>
</template>

<script>
import {queryAllGenres, queryAllMovies} from "@/api/movie";

export default {
  name: 'allMovieView',
  async mounted() {
    await this.refresh();
  },
  data() {
    return {
      loading: true,
      name: "allMovieView",
      sortType: [
        '按评分排序',
        '按时间排序',
      ],
      ratingSelector: 0,
      selectSortType: '按热度排序',
      displayType: null,
      dates: ['1900-09-20', '2022-09-20'],
      movieType: [],
      durationSelector: [0, 300],
      selectedLanguage: [],
      page_offset:1,
      page_count: 20,
      languageTags: [],
      tags: [],
      movies: []
    }
  },
  methods: {
    clearDate() {
      this.dates = []
    },
    async refresh() {
      let response = await queryAllGenres("");
      if (response.status === 200) {
        this.tags = response.data.genres;
      }
      let range_at;
      if (this.selectSortType === "按热度排序") {
        range_at = 0;
      } else if (this.selectSortType === "按评分排序") {
        range_at = 2;
      } else if (this.selectSortType === "按时间排序") {
        range_at = 1;
      }

      let selectGenres = this.tags;
      for (let j = 0; j < this.movieType.length; j++) {
        let genre_id = this.movieType[j];
        for (let i = 0; i < this.tags.length; i++) {
          if (this.tags[i].id === genre_id + 1) {
            selectGenres.push(this.tags[i]);
          }
        }
      }

      response = await queryAllMovies({
        limit: 20,
        offset: this.page_offset,
        range_at: range_at,
        filter: {
          release_date_gap: this.dates,
          min_rating: this.ratingSelector,
          duration_gap: this.durationSelector,
        }
      });
      if (response.status === 200) {
        this.page_count = response.data.meta.total_page;
        this.movies = response.data.movies;
      }
      this.loading = false
      //console.log(this.movies);
    },
  },
  computed: {
    dateRangeText() {
      return this.dates.join('~')
    },

  },

  watch: {
    page_offset: function () {
      this.refresh();
    },
    page_count: function () {
      this.refresh();
    },

  }
}
</script>