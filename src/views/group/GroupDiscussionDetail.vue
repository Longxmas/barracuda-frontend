<template>
  <div id="groupDiscussionDetail">
    <v-container fluid style="width: 90%; margin-top: 10px;margin-left: 50px;
                            min-width:900px; overflow: scroll">
      <v-row>
        <v-col cols="9">
          <v-card elevation="0">
            <v-card-title>
              <v-container fluid class="pl-5">
                <v-row>
                  <h2>{{ discussion.title }}</h2>
                </v-row>
                <v-row class="pt-5">
                  <v-avatar>
                    <v-img :src="discussion.user_avatar" alt="Avatar"></v-img>
                  </v-avatar>
                  &ensp;
                  <p class="my-auto" style="font-size: 16px"> {{ discussion.date }} </p>
                </v-row>
              <v-row class="py-3">
                <mavon-editor
                    v-model="discussion.content"
                    :subfield="false" :toolbarsFlag="false" defaultOpen="preview"
                    box-shadow-style="0 0 0 0 rgba(0,0,0,0)"
                    preview-background="#fff"
                />
              </v-row>

              <v-row class="pl-5 pb-5" style="text-align: center">
                <v-col class="mx-auto">
                  <v-btn large class="mr-5" style="color: white;background-color: skyblue">
                    <v-icon class="my-auto"> mdi-heart</v-icon>
                    &ensp;
                    已有点赞
                    &ensp;
                    {{ discussion.thumb }}
                  </v-btn>

                  <v-btn large class="mr-5" style="color: white;background-color: darkorange">
                    <v-icon class="my-auto"> mdi-message</v-icon>
                    &ensp;
                    已有回复
                    &ensp;
                    {{ discussion.reply_count }}
                  </v-btn>
                </v-col>
              </v-row>
              </v-container>
            </v-card-title>
          </v-card>

          <v-divider></v-divider>

          <v-card class="mt-10" elevation="0" min-width="1000px" style="overflow: scroll;">
            <v-card-title><h3>回复</h3></v-card-title>

            <v-list class="py-0 pl-0" width="95%">
              <v-list-item
                  v-for="(comment, i) in discussion.reply"
                  :key=i
                  class="pl-0">
                <v-container>
                  <v-row class="pl-0">
                    <v-col cols="1" class="px-0">
                      <v-avatar tile class="ml-5 pt-2" size="55">
                        <v-img :src="comment.user_avatar"></v-img>
                      </v-avatar>
                    </v-col>
                    <v-col class="mx-1 pt-1">
                      <v-card elevation="0" class="mb-0 mx-0" width="90%">
                        <v-card-text class="pa-0">
                          <v-container fluid>
                            <v-row>
                              <v-col class="pl-0 ">
                                <v-container fluid>

                                  <v-row class="pl-0" style="background-color: #dff2fa">
                                    <a style="font-size: 16px; line-height: 25px"
                                       class="my-auto pl-3">{{ comment.user_name }}</a>
                                    <span class="my-auto pl-3">{{ comment.reply_date }}</span>
                                  </v-row>

                                  <v-row class="pt-2 pl-1 pr-2">
                                    <p style="text-overflow: ellipsis;
                                        overflow: hidden;
                                        display: -webkit-box;
                                        -webkit-box-orient: vertical;
                                        -webkit-line-clamp: 3;
                                        line-height: 20px;
                                        max-height: 60px;
                                        font-family: 微软雅黑,serif;
                                        font-size: 15px;
                                        color: black;
                                        margin-bottom: 0">
                                      {{ comment.reply_content }} </p>
                                  </v-row>

                                </v-container>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-list-item>

              <v-list-item class="pl-0">
                <v-container>
                  <v-row class="pl-0 py-0 my-0">
                    <v-col cols="1" class="px-0">
                      <v-avatar tile class="ml-5 pt-2" size="55">
                        <v-img :src="discussion.user_avatar"></v-img>
                      </v-avatar>
                    </v-col>
                    <v-col class="pt-0 py-0 my-0" cols="10">
                      <v-card-text class="pl-1 pb-0">
                        <v-textarea
                            class="ml-0 pl-0 py-0 my-0"
                            filled
                            auto-grow
                            row-height="20px"
                            value="先生所言极是！"
                            placeholder="添加回复"
                            background-color="green lighten-5"
                        >
                        </v-textarea>
                      </v-card-text>
                    </v-col>
                  </v-row>

                  <v-row class="py-0 my-0">
                    <v-col cols="9">
                      <span></span>
                    </v-col>
                    <v-col class="my-0 py-0">
                      <v-btn color="green lighten-3" style="color: white" class="ml-5 mt-0">添加回复</v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>

        <v-col cols="3">
          <v-card class="mt-10" flat>
            <v-card-title>
              <a>{{ group.name }}</a>
            </v-card-title>
            <v-card-text>
              <v-img :src="group.photo"
                     max-height="300px"></v-img>
              <v-container class="pt-8">
                <v-row>
                  <span>创建于： {{group.create_at}}</span>
                </v-row>
                <v-row>
                  <span>小组成员数：{{group.member_count}}</span>
                </v-row>
              </v-container>

            </v-card-text>
          </v-card>
        </v-col>


      </v-row>
    </v-container>

  </div>
</template>

<script>
import {getGroupDetail, getGroupDiscussionDetail, getGroupMember} from "@/api/group";

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
        reply_count: 100,
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
      },
      group: {
        id: 1,
        name: "科幻片yyds",
        introduction: "我们平等地热爱每一部优秀的科幻片" +
            "我们平等地热爱每一部优秀的科幻片" +
            "我们平等地热爱每一部优秀的科幻片" +
            "我们平等地热爱每一部优秀的科幻片",
        photo: require("../../assets/pics/syberpunk.jpg"),
        create_at: '2022-11-16',
        member_count: 3
      },
    }
  },
  async mounted() {
    await this.refresh();
  },
  methods: {
    async refresh() {
      let response = await getGroupDetail('', this.$route.params.id);
      if (response.status === 200) {
        this.group.id = response.data.id;
        this.group.photo = 'http://localhost:8080/api/' + response.data.avatar;
        this.group.create_at = response.data.create_at;
        this.group.introduction = response.data.introduction;
        this.group.name = response.data.name;
        response = await getGroupMember('', this.$route.params.id);
        this.group.member_count = response.data.group_members.length;
      }

      response = await getGroupDiscussionDetail('', this.$route.params.id, this.$route.params.discussionId);
      if (response.status === 200) {
        this.discussion.id = response.data.id;
        this.discussion.group_id = response.data.group.id;
        this.discussion.group_name = response.data.group.name;
        this.discussion.user_name = response.data.author.nickname;
        this.discussion.user_avatar = 'http://localhost:8080/api/' + response.data.author.avatar;
        this.discussion.date = response.data.create_at;
        this.discussion.title = response.data.title;
        this.discussion.content = response.data.content;
        this.discussion.thumb = response.data.likes;
        this.discussion.reply_count = response.data.reply_count;
      }
    }
  },
  computed: {

  }
}
</script>