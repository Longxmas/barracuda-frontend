<template>
  <div id="reviewMovieView">
    <v-tabs centered v-model="activeIndex">
      <v-tab @click="jumpToOverView" :href="`#tab-1`">概览</v-tab>
      <v-tab @click="jumpToMedia" :href="`#tab-2`">媒体</v-tab>
      <v-tab @click="jumpToComment" :href="`#tab-3`">短评区</v-tab>
      <v-tab :href="`#tab-4`">影评区</v-tab>
    </v-tabs>
    <v-tabs-items v-model="activeIndex">
      <v-tab-item :value="`tab-1`"></v-tab-item>
      <v-tab-item :value="`tab-2`"></v-tab-item>
      <v-tab-item :value="`tab-3`">
        <v-container fluid style="width: 90%; margin-top: 10px; margin-left: 50px">
        <h1>快来发表看法吧~</h1>
        <v-container fluid>
          <v-row>
            <v-col style="padding: 15px 50px 0 0">
              <v-breadcrumbs
                  :items="breadcrumbs_items"
                  large>
                <template v-slot:divider>
                  <v-icon>mdi-forward</v-icon>
                </template>
              </v-breadcrumbs>
            </v-col>
            <v-col class="d-flex flex-row-reverse" style="padding: 15px 50px 0 0">
              <v-btn>创建新讨论</v-btn>
            </v-col>
          </v-row>
        </v-container>
        <v-card>
          <v-card-text>
            <v-data-table
                :headers="discussionHeaders"
                :items="discussionItems"
                class="elevation-1"
                calculate-widths>
              <template v-slot:[`item.avatar`]="{ item }">
                <v-avatar>
                  <v-img :src="item.avatar" width="20px"></v-img>
                </v-avatar>
              </template>
              <template v-slot:[`item.last_reply`]="{ item }">
                <p style="white-space: nowrap;
                          overflow: hidden;
                          text-overflow: ellipsis;
                          text-align: right;">
                  于{{item.time}}
                </p>
                <p>由{{item.user}}最后回复</p>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
        </v-container>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  name: 'reviewMovieView',
  data() {
    return {
      activeIndex: 'tab-4',
      breadcrumbs_items: [
        {
          text: '电影',
          disabled: false,
          href: '/movie',
        },
        {
          text: '电影名称',
          disabled: false,
          href: '/moviereview',
        }
      ],
      discussionHeaders: [
        { text: "", value: "avatar", widths: '5%'},
        { text: "主题", value: "title"},
        { text: "回复数", value: "reply_count" },
        { text: "最后回复", value: "last_reply" },
      ],
      discussionItems: [
        {
          avatar: require("../../assets/logo.png"),
          title: "太好看了吧",
          reply_count: 100,
          time: "2020-10-10",
          user: "user1",
        },
        {
          avatar: require("../../assets/logo.png"),
          title: "太垃圾了吧",
          reply_count: 100,
          time: "2020-10-10",
          user: "user1",
        }
      ]
    }
  },
  methods: {
    jumpToOverView() {
      this.$router.push('/movie');
    },
    jumpToMedia() {
      this.$router.push('/moviemedia');
    },
    jumpToComment() {
      this.$router.push('/moviecomment');
    }
  },
  computed: {

  }
}
</script>