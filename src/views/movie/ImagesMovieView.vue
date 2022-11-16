<template>
  <div id="imageMovie">
    <v-tabs centered v-model="activeIndex">
      <v-tab @click="jumpToOverView" :href="`#tab-1`">概览</v-tab>
      <v-tab :href="`#tab-2`">媒体</v-tab>
      <v-tab @click="jumpToComment"  :href="`#tab-3`">短评区</v-tab>
      <v-tab @click="jumpToReview" :href="`#tab-4`">影评区</v-tab>
    </v-tabs>
    <v-tabs-items v-model="activeIndex">
      <v-tab-item :value="`tab-2`">
        <v-container fluid style="width: 90%">
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
                    <h3 style="color: white">所有媒体</h3>
                  </v-card-title>
                </v-card>
                <v-list>
                  <v-list-item-group color="primary" v-model="choose_type">
                    <v-list-item :href="'/movie/' + this.$route.params.id + '/media/images'">
                      <v-list-item-content>
                        <v-container fluid>
                          <v-row align="center">
                            <v-col class="pt-0 pb-0">
                              <p class="pt-2">图片</p>
                            </v-col>
                            <v-col class="d-flex flex-row-reverse pt-0 pb-0">
                              <v-chip pill>{{images.length}}</v-chip>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item :href="'/movie/' + this.$route.params.id + '/media/videos'">
                      <v-list-item-content>
                        <v-list-item-title>
                          <v-container fluid>
                            <v-row align="center">
                              <v-col class="pt-0 pb-0">
                                <p class="pt-2">视频</p>
                              </v-col>
                              <v-col class="d-flex flex-row-reverse pt-0 pb-0">
                                <v-chip pill>{{videos.length}}</v-chip>
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
              <v-item-group>
                <v-container fluid>
                  <v-row>
                    <v-col
                        v-for="(image, i) in images"
                        :key="i"
                        class="pt-0"
                        lg="3"
                        md="4"
                        sm="6"
                        xs="12"
                    >
                      <v-card
                          style="margin-bottom: 20px"
                          @click="showImageDialog(image.image_path)"
                      >
                        <v-img
                            :src="image.image_path"
                        ></v-img>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-item-group>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs-items>
    <v-dialog v-model="showImage" max-width="400px">
      <v-img
          :src="dialog_image_path"
          max-width="100%"
      ></v-img>
    </v-dialog>
  </div>
</template>

<script>
import {queryMovieImages, queryMovieVideos} from "@/api/movie";

export default {
  name: 'imageMovie',
  async mounted() {
    await this.refresh();
  },
  data() {
    return {
      showImage: false,
      dialog_image_path: '',
      choose_type: 0,
      activeIndex: 'tab-2',
      videos: [

      ],
      images: [
        {"image_path": "https://img9.doubanio.com/view/photo/m/public/p443396084.jpg"},
        {"image_path": "https://img9.doubanio.com/view/photo/m/public/p1779186376.jpg"},
        {"image_path": "https://img1.doubanio.com/view/photo/m/public/p443394198.jpg"},
        {"image_path": "https://img1.doubanio.com/view/photo/m/public/p443396637.jpg"},
        {"image_path": "https://img1.doubanio.com/view/photo/m/public/p2152544798.jpg"},
        {"image_path": "https://img9.doubanio.com/view/photo/m/public/p1779181635.jpg"},
      ]
    }
  },
  methods: {
    async refresh() {
      let response = await queryMovieImages('', this.$route.params.id);
      if (response.status === 200) {
        this.images = response.data.images;
      }
      response = await queryMovieVideos('', this.$route.params.id);
      if (response.status === 200) {
        this.videos = response.data.videos;
      }
    },
    jumpToOverView() {
      this.$router.push({path: `/movie/${this.$route.params.id}`});
    },
    jumpToComment() {
      this.$router.push({path: `/movie/${this.$route.params.id}/comment`});
    },
    jumpToReview() {
      this.$router.push({path: `/movie/${this.$route.params.id}/review`});
    },
    showImageDialog(path) {
      this.dialog_image_path = path;
      this.showImage = true;
    }
  }
}
</script>