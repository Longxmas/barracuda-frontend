<template>
  <div id="groupDiscussionDetail">
    <v-breadcrumbs
        :items="breadcrumbs_items"
        large>
      <template v-slot:divider>
        <v-icon>mdi-forward</v-icon>
      </template>
    </v-breadcrumbs>
    <v-card>
      <v-card-title>
        <v-container fluid>
          <v-row>
            <v-avatar>
              <v-img :src="discussion.user_avatar"></v-img>
            </v-avatar>
            <p class="text-h5">{{discussion.title}}</p>
          </v-row>
          <v-row>
            <v-col class="d-flex flex-row-reverse">
              <p class="text-body-1">由{{discussion.user_name}}发表于{{discussion.date}}</p>
            </v-col>
          </v-row>
        </v-container>
        <v-divider></v-divider>
        <v-card-text>
          <mavon-editor
              v-model="discussion.content"
              :subfield="false" :toolbarsFlag="false" defaultOpen="preview"
              style="min-height: auto;"
          />
          <v-divider></v-divider>
          <v-btn>已有 {{discussion.thumb}} 点赞</v-btn>
        </v-card-text>
      </v-card-title>
    </v-card>
    <p>共计有 {{discussion.reply_count}} 条回复</p>
    <v-card
        v-for="reply in discussion.reply"
        :key="reply.id">
      <v-card-title>
        <v-container fluid>
          <v-row>
            <v-avatar>
              <v-img :src="reply.user_avatar"></v-img>
            </v-avatar>
            <p class="text-h5">{{reply.reply_title}}</p>
          </v-row>
          <v-row>
            <v-col class="d-flex flex-row-reverse">
              <p class="text-body-1">由{{reply.user_name}}发表于{{reply.reply_date}}</p>
            </v-col>
          </v-row>
        </v-container>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <mavon-editor
            v-model="reply.reply_content"
            :subfield="false" :toolbarsFlag="false" defaultOpen="preview"
            style="min-height: auto;"
        />
        <v-divider></v-divider>
        <v-btn>已有 {{reply.reply_thumb}} 点赞</v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'groupDiscussionDetail',
  data() {
    return {
      breadcrumbs_items: [
        {
          text: 'XXX小组',
          disabled: false,
          href: '/movie',
        },
        {
          text: '小组讨论',
          disabled: false,
          href: '/moviereview',
        }
      ],
      discussion: {
        id: 1,
        group_id: 1,
        group_name: "小组1",
        user_name: "flyinglandlord",
        user_avatar: "https://api.yimian.xyz/img?type=head",
        date: "2020-01-01",
        title: "分子构成物质，环境决定人的成长方位那么我炸书，周围就...",
        content: "分子构成物质，环境决定人的成长方位那么我炸书，周围就会充满了知识分子",
        thumb: 100,
        count: 100,
        reply: [
          {
            id: 1,
            user_name: "Longxmas",
            user_avatar: "https://img3.doubanio.com/icon/u1000001-1.jpg",
            reply_date: "2020-01-01",
            reply_content: "你会进化成恐怖分子",
            reply_title: "",
            reply_thumb: 100,
          },
          {
            id: 2,
            user_name: "Harahan",
            user_avatar: "https://img3.doubanio.com/icon/u1000001-1.jpg",
            reply_date: "2020-01-01",
            reply_content: "书中自有黄金屋，你把书炸了，不是得被黄金埋了嘛",
            reply_title: "",
            reply_thumb: 100,
          },
          {
            id: 3,
            user_name: "Harahan",
            user_avatar: "https://img3.doubanio.com/icon/u1000001-1.jpg",
            reply_date: "2020-01-01",
            reply_content: "()的恐怖分子被炸了那是不是就会出现更多的恐怖分子",
            reply_title: "",
            reply_thumb: 100,
          },
          {
            id: 4,
            user_name: "Harahan",
            user_avatar: "https://img3.doubanio.com/icon/u1000001-1.jpg",
            reply_date: "2020-01-01",
            reply_content: "众所周知正所谓，书山书山。所以你炸书=炸山。而炸山很费钱，所以你很有钱。",
            reply_title: "",
            reply_thumb: 100,
          },
        ]
      }
    }
  },
  methods: {

  },
  computed: {

  }
}
</script>