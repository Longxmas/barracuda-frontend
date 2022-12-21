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
                    <v-btn color="green lighten-4" v-if="!isMember" @click="joinGroup">加入这个小组</v-btn>
                    <v-btn color="red" v-else @click="quitGroup">退出这个小组</v-btn>
                  </v-card-actions>
                </v-card-text>
              </v-card>
              <v-card>
                <v-card-title><h3>最新讨论</h3>
                  <v-spacer></v-spacer>
                  <v-btn color="blue lighten-4" @click="jumpToAllDiscussion">查看全部讨论</v-btn>
                </v-card-title>
                <v-card-text>
                  <v-data-table
                      :headers="recentDiscussionHeaders"
                      :items="recentDiscussionItems"
                      class="elevation-1"
                      hide-default-footer
                      calculate-widths>
                    <template v-slot:[`item.topic`]="{ item }">
                      <a :href="'/group/' + group_meta.id + '/discussion/' + item.id">
                        {{ item.topic }}
                      </a>
                    </template>
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
                        于{{ item.last_reply_time }}
                      </p>
                      <p>由{{ item.user }}最后回复</p>
                    </template>
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
                              <a :href="'/user/' + member.id">
                                <h3>{{ member.name }}</h3>
                              </a>
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
            <v-container fluid>
              <v-row>
                <v-col>
                  <h3>小组讨论</h3>
                </v-col>
                <v-col class="d-flex flex-row-reverse">
                  <v-btn @click="showNewDiscussionDialog">创建新讨论</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-title>
          <v-card-text>
            <v-data-table
                :headers="discussionHeaders"
                :items="allDiscussionItems"
                class="elevation-1"
                :search="searchText"
                calculate-widths>
              <template v-slot:[`item.topic`]="{ item }">
                <a :href="'/group/' + group_meta.id + '/discussion/' + item.id">
                  {{ item.topic }}
                </a>
              </template>
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
                  于{{ item.last_reply_time }}
                </p>
                <p>由{{ item.user }}最后回复</p>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-dialog v-model="showNewDiscussion">
        <v-card>
        <v-card-title class="headline">发布一篇新讨论</v-card-title>

        <v-card-text>
          <v-container>
            <v-row class="pb-0">
        <v-col>
          <v-text-field
              single-line
              style="color: black; font-size: 25px; font-weight: bold"
              placeholder="请输入讨论标题"
              v-model="discussionTitle"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <mavon-editor ref="editor" v-model="discussionContent" :toolbars="toolbars"
                        style="min-height: 600px"/>
        </v-col>
      </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="red"
            text
            @click="giveUpEdit"
          >
            放弃
          </v-btn>

          <v-btn
            color="green"
            text
            @click="postDiscussion"
          >
            <v-icon>mdi-send</v-icon>
            发布
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>

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
                              <a :href="'/user/' + member.id">
                                <h3>{{ member.name }}</h3>
                              </a>
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
import {
  getGroupDetail,
  getGroupDiscussion,
  getGroupMember,
  getGroupRecentDiscussion,
  getGroupRecentMember, getIsGroupMember, joinGroup, postDiscussion, quitGroup
} from "@/api/group";
import {apiUrl} from "@/api/request";

export default {
  name: 'groupDetailView',
  data() {
    return {
      showNewDiscussion: false,
      isMember: false,
      searchText: '',
      group_meta: {},
      topTabName: '0',
      recent_members: [
      ],
      all_members: [],
      discussionHeaders: [
        {text: "话题", value: "topic"},
        {text: "作者", value: "author"},
        {text: "回复", value: "reply_count"},
        {text: "最后回复", value: "last_reply_time"},
      ],
      recentDiscussionHeaders: [
        {text: "话题", value: "topic"},
        {text: "作者", value: "author"},
        {text: "回复", value: "reply_count"},
        {text: "最后回复", value: "last_reply_time"},
      ],
      recentDiscussionItems: [],
      allDiscussionItems: [],
      toolbars: {
        bold: true,
        italic: true,
        header: true,
        underline: true,
        strikethrough: true,
        mark: true,
        superscript: true,
        subscript: true,
        quote: true,
        ol: true,
        ul: true,
        link: false,
        imagelink: false,
        code: true,
        table: true,
        fullscreen: true,
        readmodel: true,
        htmlcode: true,
        help: true,
        undo: true,
        redo: true,
        trash: true,
        save: false,
        navigation: true,
        alignleft: true,
        aligncenter: true,
        alignright: true,
        subfield: true,
        preview: true
      },
      discussionTitle: '',
      discussionContent: '',
    }
  },
  async created() {
    await this.refresh();
  },
  async mounted() {
    console.log('ok')
    await this.refresh();
  },
  methods: {
    async refresh() {
      let response = await getGroupDetail('', this.$route.params.id);
      if (response.status === 200) {
        this.group_meta.id = response.data.id;
        this.group_meta.avatar = apiUrl + response.data.avatar;
        this.group_meta.create_at = response.data.create_at;
        this.group_meta.introduction = response.data.introduction;
        this.group_meta.name = response.data.name;
      }
      console.log(this.group_meta);
      response = await getGroupMember('', this.$route.params.id);
      if (response.status === 200) {
        this.all_members=[];
        for (let i = 0; i < response.data.group_members.length; i++) {
          this.all_members.push({
            id: response.data.group_members[i].id,
            name: response.data.group_members[i].nickname,
            join_time: response.data.group_members[i].join_at,
            photo: apiUrl + response.data.group_members[i].avatar,
            introduction: response.data.group_members[i].introduction
          });
        }
      }

      response = await getGroupRecentMember('', this.$route.params.id);
      if (response.status === 200) {
        this.recent_members = [];
        for (let i = 0; i < response.data.length; i++) {
          this.recent_members.push({
            id: response.data[i].id,
            name: response.data[i].nickname,
            join_time: response.data[i].join_at,
            photo: apiUrl + response.data[i].avatar,
            introduction: response.data[i].introduction
          });
        }
      }

      response = await getGroupRecentDiscussion('', this.$route.params.id);
      if (response.status === 200) {
        this.recentDiscussionItems = [];
        for (let i = 0; i < response.data.length; i++) {
          this.recentDiscussionItems.push({
            id: response.data[i].id,
            topic: response.data[i].title,
            author: "author",
            reply_count: response.data[i].comment_count,
            last_reply_time: response.data[i].update_at,
          });
        }
      }

      response = await getGroupDiscussion('', this.$route.params.id);
      if (response.status === 200) {
        this.allDiscussionItems = [];
        for (let i = 0; i < response.data.discussions.length; i++) {
          this.allDiscussionItems.push({
            id: response.data.discussions[i].id,
            topic: response.data.discussions[i].title,
            author: response.data.discussions[i].author.nickname,
            reply_count: response.data.discussions[i].comment_count,
            last_reply_time: response.data.discussions[i].update_at,
          });
        }
      }

      response = await getIsGroupMember('', this.$route.params.id);
      if (response.status === 200) {
        this.isMember = response.data.is_member;
      }
    },
    jumpToAllDiscussion() {
      this.topTabName = 1;
    },
    async joinGroup() {
      let response = await joinGroup('', this.$route.params.id);
      if (response.status === 200) {
        this.$message.success('加入成功');
        await this.refresh();
      }
    },
    async quitGroup() {
      let response = await quitGroup('', this.$route.params.id);
      if (response.status === 200) {
        this.$message.success('退出成功');
        await this.refresh();
      }
    },
    showNewDiscussionDialog() {
      if (!this.isMember) {
        this.$message.error('需要先加入小组才能发表讨论(⊙o⊙)');
        return;
      }
      this.showNewDiscussion = true;
    },
    async postDiscussion() {
      let payload = {
        title: this.discussionTitle,
        content: this.discussionContent,
      };
      let response = await postDiscussion(payload, this.$route.params.id);
      if (response.status === 200) {
        this.$message.success('发表成功');
        this.showNewDiscussion = false;
        await this.refresh();
      }
    },
    giveUpEdit() {
      this.discussionTitle = '';
      this.discussionContent = '';
      this.showNewDiscussion = false;
    },
  },
  computed: {}
}
</script>