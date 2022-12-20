<template>
  <div id='groupDetailView'>
    <v-tabs centered v-model="topTabName">
      <v-tab style="color: black">概览</v-tab>
      <v-tab style="color: black">讨论</v-tab>
      <v-tab style="color: black">成员</v-tab>
    </v-tabs>
    <v-tabs-items v-model="topTabName">
      <v-tab-item>
        <v-container fluid style="width: 95%">
          <v-row>
            <v-col lg="9" md="6" sm="12" xs="12" style="margin-top: 0;">
              <v-card>
                <v-card-title>
                  <h1>{{ group_meta.name }}</h1>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-container fluid class="pl-0">
                    <v-row>
                      <v-col lg="3" md="6" sm="12" xs="12">
                        <v-avatar rounded size="200">
                          <v-img
                              aspect-ratio="1"
                              :src="group_meta.avatar">
                          </v-img>
                        </v-avatar>
                      </v-col>
                      <v-col lg="9" md="6" sm="12" xs="12">
                        <p>{{ group_meta.introduction }}</p>
                      </v-col>
                    </v-row>
                  </v-container>
                  <v-divider></v-divider>
                  <v-card-actions class="d-flex justify-space-between">
                    创建于 {{ group_meta.create_at }}
                    <v-btn color="green lighten-4">加入这个小组</v-btn>
                  </v-card-actions>
                </v-card-text>
              </v-card>
              <v-card>
                <v-card-title><h3>最新讨论</h3>
                <v-spacer></v-spacer>
                  <v-btn color="blue lighten-4">查看全部讨论</v-btn>
                </v-card-title>
                <v-card-text>
                  <v-data-table
                      :headers="discussionHeaders"
                      :items="recentDiscussionItems"
                      hide-default-footer
                      class="elevation-1">
                  </v-data-table>
                </v-card-text>


              </v-card>
            </v-col>
            <v-col lg="3" md="6" sm="12" xs="12">
              <v-card>
                <v-card-title>
                  <h3>最近加入的成员</h3>
                </v-card-title>
                <v-card-text>
                  <v-container fluid>
                    <v-item-group multiple>
                      <v-row>
                        <v-col v-for="member in recent_members"
                               :key="member.id"
                               lg="3"
                               md="4"
                               sm="6"
                               xs="12">
                          <v-container fluid>
                            <v-row justify="center">
                              <v-avatar rounded size="50" style="align-self: center">
                                <v-img :src="member.photo"></v-img>
                              </v-avatar>
                            </v-row>
                            <v-row justify="center">
                              <h3>{{ member.name }}</h3>
                            </v-row>
                          </v-container>
                        </v-col>
                      </v-row>
                    </v-item-group>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>

      <v-tab-item>
        <v-card class="mx-auto" width="95%" flat>
          <v-card-title>
            <v-container fluid >
              <v-row>
                <v-col>
                  <h3>小组讨论</h3>
                </v-col>
                <v-col class="d-flex flex-row-reverse">
                  <v-btn>创建新讨论</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-title>
          <v-card-text>
            <v-data-table
                :headers="discussionHeaders"
                :items="allDiscussionItems"
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
                  于{{ item.time }}
                </p>
                <p>由{{ item.user }}最后回复</p>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card class="mx-auto" width="95%" flat>
          <v-card-title>
            <h3>小组成员</h3>
          </v-card-title>
          <v-card-text class="pl-0">
            <v-item-group multiple>
              <v-container fluid>
                <v-row>
                  <v-col v-for="member in all_members"
                         :key="member.id"
                         class="pt-0"
                         lg="3"
                         md="6"
                         sm="6"
                         xs="6">
                    <v-card width="100%">
                      <v-card-text>
                        <v-container fluid>
                          <v-row>
                            <v-col lg="3" md="6" sm="12" xs="12">
                              <v-avatar rounded size="60">
                                <v-img :src="member.photo"></v-img>
                              </v-avatar>
                            </v-col>
                            <v-col lg="9" md="6" sm="12" xs="12">
                              <h3>{{ member.name }}</h3>
                              <p>加入于{{ member.join_time }}</p>
                            </v-col>
                          </v-row>
                          <v-row>
                            <p>{{ member.introduction }}</p>
                          </v-row>
                        </v-container>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-item-group>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import {getGroupDetail, getGroupDiscussion, getGroupMember} from "@/api/group";

export default {
  name: 'groupDetailView',
  data() {
    return {
      group_meta: {
        id: 1,
        avatar: "/media/Group/avatar/initial.jpg",
        create_at: "2022-12-21",
        introduction: "0",
        name: "group0"
      },
      topTabName: '',
      recent_members: [
        {
          id: 1,
          name: '张三',
          photo: require('../../assets/ruozhi.png'),
          introduction: '我是张三，我是弱智'
        },
        {
          id: 2,
          name: '李四',
          photo: require('../../assets/ruozhi.png'),
          introduction: '我是李四，我是弱智'
        }
      ],
      all_members: [
        {
          id: 1,
          name: '张三',
          join_time: '2020-01-01',
          photo: require('../../assets/ruozhi.png'),
          introduction: '我是张三，我是弱智'
        },
        {
          id: 2,
          name: '李四',
          join_time: '2020-01-01',
          photo: require('../../assets/ruozhi.png'),
          introduction: '我是李四，我是弱智'
        },
        {
          id: 3,
          name: '王五',
          join_time: '2020-01-01',
          photo: require('../../assets/ruozhi.png'),
          introduction: '我是王五，我是弱智'
        },
        {
          id: 6,
          name: '赵六',
          join_time: '2020-01-01',
          photo: require('../../assets/ruozhi.png'),
          introduction: '我是赵六，我是弱智'
        }
      ],
      discussionHeaders: [
        {text: "话题", value: "topic"},
        {text: "作者", value: "author"},
        {text: "回复", value: "reply_count"},
        {text: "最后回复", value: "last_reply_time"},
      ],
      recentDiscussionItems: [
        {
          topic: "每次我把垃圾扔到垃圾桶时，我都有一种大义灭亲的自豪感",
          author: '无垢的纯白',
          reply_count: "20",
          last_reply_time: "2022-2-22",
        },
        {
          topic: "地下赌马是不是也叫私密马赛？",
          author: '月夜魔术师',
          reply_count: "20",
          last_reply_time: "2022-2-22",
        },
      ],
      allDiscussionItems: [
        {
          topic: "每次我把垃圾扔到垃圾桶时，我都有一种大义灭亲的自豪感",
          author: '无垢的纯白',
          reply_count: 20,
          last_reply_time: "2022-2-22",
        },
        {
          topic: "地下赌马是不是也叫私密马赛？",
          author: '月夜魔术师',
          reply_count: 20,
          last_reply_time: "2022-2-22",
        },
        {
          topic: '我叫斧新，最近减肥瘦了两斤，你也可以叫我父亲',
          author: '动物园超级园长',
          reply_count: 22,
          last_reply_time: "2022-2-22",
        }
      ]
    }
  },
  async mounted() {
    await this.refresh();
  },
  methods: {
    async refresh() {
      let response = await getGroupDetail('', this.$route.params.id);
      if (response.status === 200) {
        this.group_meta.id = response.data.id;
        this.group_meta.avatar = 'http://localhost:8080/api/' + response.data.avatar;
        this.group_meta.create_at = response.data.create_at;
        this.group_meta.introduction = response.data.introduction;
        this.group_meta.name = response.data.name;
      }
      response = await getGroupMember('', this.$route.params.id);
      if (response.status === 200) {
        for (let i = 0; i < response.data.group_members.length; i++) {
          this.all_members[i] = {
            id: response.data.group_members[i].id,
            name: response.data.group_members[i].nickname,
            join_time: response.data.group_members[i].join_time,
            photo: 'http://localhost:8080/api/' + response.data.group_members[i].avatar,
            introduction: response.data.group_members[i].introduction
          };
        }
      }
      response = await getGroupDiscussion('', this.$route.params.id);
      if (response.status === 200) {
        for (let i = 0; i < response.data.group_discussions.length; i++) {
          this.allDiscussionItems[i] = {
            topic: response.data.group_discussions[i].title,
            author: response.data.group_discussions[i].author.nickname,
            reply_count: response.data.group_discussions[i].reply_count,
            last_reply_time: response.data.group_discussions[i].updated_at,
          }
        }
      }
    }
  },
  computed: {}
}
</script>