<template>
  <div id="allActorView" class="align-content-center" >
    <v-container fluid style="width: 90%;  margin-top: 10px; min-width: 800px; overflow: scroll" >
      <h1>热门人物</h1>
      <v-item-group
          multiple
      >
        <v-container fluid>
          <v-row>
            <v-col v-for="actor in actors"
                   :key="actor.id"
                   cols="2"
                   >
              <v-card :href="'/actor/' + actor.id">
                <v-img :src="actor.image"
                ></v-img>
                <v-card-title>
                  {{ actor.celebrity_name }}
                </v-card-title>
                <v-card-subtitle>
                  {{ actor.birthday }}
                </v-card-subtitle>
                <v-card-text>
                  {{ actor.career }}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-item-group>

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
    </v-container>


  </div>
</template>

<script>
import {queryAllCelebrities} from "@/api/celebrity";

export default {
  name: 'allActorView',
  async mounted() {
    await this.refresh();
  },
  data() {
    return {
      name: "allActorView",
      page_offset: 1,
      page_count: 20,
      actors: [
        {
          "id": 1,
          "celebrity_name": "涅提·蒂瓦里 Nitesh Tiwari",
          "biography": "",
          "image": "https://img9.doubanio.com/view/celebrity/raw/public/p1484120321.24.jpg",
          "birthday": "",
          "place_of_birth": "",
          "gender": 1,
          "career": "编剧 / 导演 / 制片人"
        },
        {
          "id": 2,
          "celebrity_name": "比于什·古普塔 Piyush Gupta",
          "biography": "",
          "image": "https://img1.doubanio.com/view/celebrity/raw/public/p1498636219.48.jpg",
          "birthday": "",
          "place_of_birth": "",
          "gender": 1,
          "career": "编剧"
        },
      ]
    };
  },
  methods: {
    async refresh() {
      let response = await queryAllCelebrities({
        limit: 24,
        offset: this.page_offset,
      });
      if (response.status === 200) {
        this.page_count = response.data.meta.total_page;
        this.actors = response.data.celebrities;
      }
      //console.log(this.actors);
    }
  },
  watch:{
    page_offset: function () {
      this.refresh();
    },
    page_count: function () {
      this.refresh();
    }
  },

  computed: {

  }
}
</script>