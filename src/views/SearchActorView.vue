<template>
  <div id="searchActorView">
    <h1> “{{this.$route.query.query}}” 的搜索结果</h1>
    <v-divider></v-divider>
    <v-container fluid>
      <v-row>
        <v-col lg="4"
               md="4"
               sm="6"
               xs="8" style="margin-top: 0;">
          <v-card
              class="mx-auto rounded-lg"
              max-width="300"
          >
            <v-card color="#01b4e4">
              <v-card-title>
                <h3 style="color: white">搜索结果</h3>
              </v-card-title>
            </v-card>
            <v-list>
              <v-list-item-group color="primary" v-model="choose_type">
                <v-list-item :href="'/search/movie?query=' + this.$route.query.query">
                  <v-list-item-content>
                    <v-container fluid>
                      <v-row align="center">
                        <v-col class="pt-0 pb-0">
                          <p class="pt-2">影片</p>
                        </v-col>
                        <v-col class="d-flex flex-row-reverse pt-0 pb-0">
                          <v-chip pill>114514</v-chip>
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
                            <p class="pt-2">人物</p>
                          </v-col>
                          <v-col class="d-flex flex-row-reverse pt-0 pb-0">
                            <v-chip pill>114514</v-chip>
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

        <v-col lg="8"
               md="8"
               sm="6"
               xs="4" style="margin-top: 0;">
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'searchActorView',
  mounted() {
    this.$emit('showSearchBar', this.$route.query.query);
  },
  data() {
    return {
      choose_type: 1,
    }
  },
  methods: {

  },
  computed: {

  }
}
</script>