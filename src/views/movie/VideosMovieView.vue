<template>
  <div id="videosMovie">
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
              <video-player  class="video-player vjs-custom-skin"
                            ref="videoPlayer"
                            :playsinline="true"
                            :options="playerOptions"
              ></video-player>
              <v-sheet
                  class="mx-auto"
              >
                <v-slide-group
                    v-model="choose_video"
                    show-arrows
                    @change="changeVideo"
                    style="position: center;"
                >
                  <v-slide-item
                      v-for="n in videos.length"
                      :key="n"
                      :value="n"
                      v-slot="{ active, toggle }"
                  >
                    <v-btn
                        class="mx-2 mt-2"
                        :input-value="active"
                        active-class="purple white--text"
                        depressed
                        rounded
                        @click="toggle"
                    >
                      视频 {{ n }}
                    </v-btn>
                  </v-slide-item>
                </v-slide-group>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import {queryMovieImages, queryMovieVideos} from "@/api/movie";

export default {
  name: 'videosMovie',
  async mounted() {
    await this.refresh();
  },
  data() {
    return {
      choose_video: 1,
      playerOptions : {
        autoplay: true, //如果true,浏览器准备好时开始回放。
        muted: false, // 是否静音。
        loop: false, // 是否循环播放。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "video/mp4",//mp4格式视频,若为m3u8格式，type需设置为 application/x-mpegURL
          src: '',//url地址
        }],
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true  //是否显示全屏按钮
        }
      },
      choose_type: 1,
      activeIndex: 'tab-2',
      videos: [
        {"video_path":
              "https://vt1.doubanio.com/202211081423/00fd6e1f751fdfc40552287198d3d2c9/view/movie/M/301260575.mp4"},
        {"video_path":
          "https://vt1.doubanio.com/202211081423/75c5d28ebaa7b53680df6a65e735da71/view/movie/M/301370579.mp4"},
        {"video_path":
              "https://vt1.doubanio.com/202211081423/8a93c19f81f034cdf0d464106f634ec2/view/movie/M/402370922.mp4"},
        {"video_path":
              "https://vt1.doubanio.com/202211081438/e225e4e66799ca6c387b5c8c9f6f95f8/view/movie/M/301050966.mp4"}
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
      // !!大部分电影只有一个视频，想要测试多个视频播放，将下面部分注释掉即可!!
      response = await queryMovieVideos('', this.$route.params.id);
      if (response.status === 200) {
        this.videos = response.data.videos;
      }
      if (this.videos !== null && this.videos.length > 0) {
        this.playerOptions.sources[0].src = this.videos[0].video_path;
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
    changeVideo() {
      console.log(this.choose_video)
      this.playerOptions.sources[0].src = this.videos[this.choose_video-1].video_path;
    },
  },
  computed: {

  }
}
</script>