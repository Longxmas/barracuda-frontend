<template>
  <div class="actor-view">
    <v-container class="mx-auto mt-10 pl-15" fluid >
      <v-row>
        <v-col col="4">
          <!-- actor pthoto-card-->
          <v-card
              class="actor-photo-card mx-auto"
              max-width="380"
              style="float:left"
          >
            <v-img
                class="white--text align-end"
                height="450px"
                width="350px"
                :src="actor_information.image"
            >
            </v-img>

            <v-card-actions>

              <v-chip
                  class="ma-2"
                  color="orange"
                  text-color="white"
                  @click="starActor"
              >
                关注
                <v-icon right color="yellow" v-if="this.isStarred">mdi-star</v-icon>
                <v-icon right v-else>mdi-star</v-icon>
              </v-chip>

              <v-spacer></v-spacer>

              <v-chip
                  class="ma-2"
                  color="orange"
                  text-color="white"
                  @click="deleteStarActor"
              >
                取消关注
                <v-icon right>mdi-delete</v-icon>
              </v-chip>
            </v-card-actions>
          </v-card>

          <v-card
              class="information-card"
              max-width="350"
          >
            <v-toolbar
                color="primary"
                dark
                dense
            >
              <v-app-bar-nav-icon></v-app-bar-nav-icon>

              <v-toolbar-title>影人信息</v-toolbar-title>

              <v-spacer></v-spacer>
            </v-toolbar>

            <v-list dense>
              <v-list-item style="min-height: 50px" class="mt-2">
                <v-chip
                    style="width: 100px"
                    color="primary"
                    label
                >
                  <v-icon left>mdi-account-circle-outline</v-icon>
                  性别
                </v-chip>
                <v-card-text align="right"> {{ actor_information.gender === 1 ? '男' : actor_information.gender === 2 ? '女' : ''}}</v-card-text>
              </v-list-item>

              <v-list-item style="min-height: 50px">
                <v-chip
                    style="width: 150px"
                    color="primary"
                    label
                >
                  <v-icon left>mdi-account-circle-outline</v-icon>
                  出生日期
                </v-chip>
                <v-card-text align="right"> {{ actor_information.birthday }}</v-card-text>
              </v-list-item>

              <v-list-item style="min-height: 50px">
                <v-chip
                    style="width: 130px"
                    color="primary"
                    label
                >
                  <v-icon left>mdi-account-circle-outline</v-icon>
                  出生地
                </v-chip>
                <v-card-text align="right"> {{ actor_information.place_of_birth }}</v-card-text>
              </v-list-item>

              <v-list-item style="min-height: 50px">
                <v-chip
                    style="width: 100px"
                    color="primary"
                    label
                >
                  <v-icon left>mdi-account-circle-outline</v-icon>
                  职业
                </v-chip>
                <v-card-text align="right"  style=""> {{ actor_information.career }}</v-card-text>
              </v-list-item>

            </v-list>
          </v-card>
        </v-col>

        <v-col col="9">
          <v-card
              class="introduction"
              elevation="0"

          >
            <v-card-text class="actor-name">
              {{ actor_information.celebrity_name}}
            </v-card-text>

            <p></p>
            <p></p>

            <v-card-text>
              <p class="personal-introduction-title">个人简介 </p>
              <p class="personal-introduction"> {{actor_information.biography}} </p>
            </v-card-text>


            <v-card style="margin:10px; width: min-content" elevation="0">
              <v-card-title> <span class="personal-introduction-title">代表作</span></v-card-title>
              <v-card-text>

                <v-sheet
                    class="mx-auto"
                    elevation="5"
                    style="padding-top: 2%;max-width: 800px; width: min-content; ">
                  <v-slide-group
                      class="pa-4"
                      center-active
                      show-arrows
                      style="width: min-content">
                    <v-slide-item
                        v-for="(item,i) in movies"
                        :key="i">
                      <v-card
                          :href="'/movie/' + item.id"
                          elevation="0"
                          style="margin-right: 10px; text-align: center">
                          <v-img
                              height="400px"
                              width="300px"
                              :src="item.image"
                              class="mx-auto"
                          ></v-img>

                        <v-card-text style="text-align: center">
                          <span style="font-family: 微软雅黑, serif; font-size: 16px; color: #0b1c22">{{ item.movie_name }}</span>
                        </v-card-text>
                      </v-card>
                    </v-slide-item>
                  </v-slide-group>
                </v-sheet>

              </v-card-text>
            </v-card>

              <v-card-text>
                <p></p>
                <p class="personal-introduction-title"> 影人图片 </p>
                <p></p>

                <ul class="photo-ul">
                  <li v-for="(item,i) in photos"
                      :key="i"
                      style="display: inline-block">
                    <v-card
                        elevation="0"
                        style="border-radius: 0"
                    >
                      <img
                          alt="影人图片"
                          :src="item.image_path"
                          style="border-radius: 0;"
                          :style="calculateImageFitPattern(200, item.image_path)"
                      />
                    </v-card>
                  </li>
                </ul>
              </v-card-text>


            <v-card-text>
              <p></p>
              <p class="personal-introduction-title"> 合作过的影人 </p>
              <p></p>

              <ul class="photo-ul">
                <li v-for="(item,i) in partners"
                    :key="i"
                    class="parent_center">
                  <v-card
                      class="mx-auto"
                      elevation="0"
                      style="text-align: center"
                      :href="'/actor/' + item.id"
                  >
                    <img
                        alt="合作过的影人"
                        style="border-radius: 0;"
                        :style="calculateImageFitPattern(200,item.image)"
                        :src="item.image"
                    />

                    <v-card-text class="text--primary" style="padding: 1px !important;">
                      <div>{{ item.celebrity_name }}</div>
                    </v-card-text>
                  </v-card>
                </li>
              </ul>


            </v-card-text>

          </v-card>

        </v-col>
      </v-row>

    </v-container>

  </div>




</template>

<script>
import {
  queryCelebrityCooperation,
  queryCelebrityDetail,
  queryCelebrityImages,
  queryCelebrityMovies, starActor, unstarActor
} from "@/api/celebrity";
import {getStarCelebrities} from "@/api/user";

export default {
  name: "actorView",
  data() {
    return {
      actor_information: {},
      movies: [],
      photos: [],
      partners: [],
      isStarred: false,
    }
  },
  methods: {
    async refresh() {
      let response = await queryCelebrityDetail('', this.$route.params.id);
      if (response.status === 200) {
        this.actor_information = response.data;
      }
      response = await queryCelebrityImages('', this.$route.params.id);
      if (response.status === 200) {
        this.photos = response.data.images;
      }
      response = await queryCelebrityCooperation('', this.$route.params.id);
      if (response.status === 200) {
        this.partners = response.data.celebrities;
      }
      response = await queryCelebrityMovies('', this.$route.params.id);
      if (response.status === 200) {
        this.movies = response.data.movies;
      }
      response = await getStarCelebrities('', this.$store.getters["user/id"]);
      console.log(response)
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].celebrity_name === this.actor_information.celebrity_name) {
          this.isStarred = true;
          break;
        }
      }
      console.log(this.isStarred);
    },
    async starActor() {
      if (this.isStarred) {
        this.$message.warning('虽然你很喜欢他/它，但是你也只能收藏一次捏~(￣▽￣)~*')
      } else {
        let response = await starActor('', this.$store.getters["user/id"], this.$route.params.id);
        if (response.status === 200) {
          this.$message.success('关注成功！')
          this.isStarred = true;
        }
      }
    },
    async deleteStarActor() {
      if (this.isStarred) {
        let response = await unstarActor('', this.$store.getters["user/id"], this.$route.params.id);
        if (response.status === 200) {
          this.$message.success('取消关注成功！')
          this.isStarred = false;
        }
      } else {
        this.$message.warning('哼(￢︿̫̿￢☆)，你根本没有收藏过他/她！')
      }
    },
    calculateImageFitPattern(fixedHeight, src) {
      let imgObj = new Image();
      imgObj.src = src;
      let ratio = imgObj.width / imgObj.height;
      return "width: " + fixedHeight * ratio + "px; height: " + fixedHeight + "px;";
    },
    async calculateImageWidthPattern(fixedHeight, src) {
      let imgObj = new Image();
      imgObj.src = src;
      let ratio = imgObj.width / imgObj.height;
      return fixedHeight * ratio;
    },
  },

  computed: {
  },

  async mounted() {
    await this.refresh();
  }
}
</script>

<style>
.actor-view{

}


.actor-photo-card {
  margin-left: 20px !important;
}

.information-card {
  margin-top: 600px;
}

.introduction {
  max-width: 900px !important;
}

.actor-name {
  color: black !important;
  font-family: 微软雅黑, 'Arial', sans-serif !important;
  font-weight: bold !important;
  font-size: 30px !important;
}

.personal-introduction-title {
  color: black;
  font-family: 微软雅黑, 'Arial', sans-serif;
  font-weight: bold;
  font-size: 25px;
  padding-bottom: 5px;
}

.personal-introduction {
  color: black;
  font-family: 微软雅黑, 'Arial', sans-serif;
  font-size: 18px;
  text-align: justify;
}

.parent_center {
  display: flex;
  justify-content: center;
}

.photo-ul {
  height: auto;
  overflow-x: scroll;
  white-space:nowrap;  /* ul中的内容不换行 */
}

.photo-ul li {
  width: auto;
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 15px;
}

/* 1,滚动条 */

::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background-color: #afb6b5;
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  border-radius: 10px;  /* 整体 圆角 */
}


</style>