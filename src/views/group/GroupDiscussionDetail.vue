<template>
  <div id="groupDiscussionDetail">
    <v-container fluid style="width: 90%; margin-top: 10px;margin-left: 50px;
                            min-width:900px; overflow: scroll" v-if="!loading">
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
                  <a class="my-auto mr-5 ml-5" style="font-size: 16px" :href="'/user/' + discussion.user_id">
                    <p class="my-auto mr-5" style="font-size: 16px"> {{ discussion.user_name }} </p>
                  </a>
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
                    <v-btn large class="mr-5" style="color: white;background-color: skyblue" @click="likeDiscussion">
                      <v-icon class="my-auto" color="red" v-if="isStarred"> mdi-heart</v-icon>
                      <v-icon class="my-auto" v-else> mdi-heart</v-icon>
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

                    <v-btn large class="mr-5" style="color: white;background-color: red"
                           @click="deleteDiscussion()" v-if="isAdmin || checkPrivilege">
                      <v-icon class="my-auto"> mdi-delete</v-icon>
                      &ensp;
                      删除这篇讨论
                      &ensp;
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
                  v-for="(comment, i) in replies"
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
                                       class="my-auto pl-3"
                                       :href="'/user/' + comment.user_id">{{ comment.user_name }}</a>
                                    <span class="my-auto pl-3">{{ comment.reply_date }}</span>
                                    <v-btn text
                                           class="my-auto pl-3"
                                           v-if="isAdmin || currentUser === comment.user_id.toString()"
                                           @click="deleteComment(comment)">
                                      删除
                                    </v-btn>
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
                        <v-img :src="this.$store.getters['user/avatar']"></v-img>
                      </v-avatar>
                    </v-col>
                    <v-col class="pt-0 py-0 my-0" cols="10">
                      <v-card-text class="pl-1 pb-0">
                        <v-textarea
                            class="ml-0 pl-0 py-0 my-0"
                            filled
                            auto-grow
                            row-height="20px"
                            placeholder="先生所言极是！"
                            v-model="commentInput"
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
                      <v-btn color="green lighten-3" style="color: white" class="ml-5 mt-0" @click="postComment">
                        添加回复
                      </v-btn>
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
              <a :href="'/group/' + group.id">{{ group.name }}</a>
            </v-card-title>
            <v-card-text>
              <v-img :src="group.photo"
                     max-height="300px"></v-img>
              <v-container class="pt-8">
                <v-row>
                  <span>创建于： {{ group.create_at }}</span>
                </v-row>
                <v-row>
                  <span>小组成员数：{{ group.member_count }}</span>
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
import {
  addDiscussionComment, dislikeDiscussion,
  getDiscussionComment,
  getGroupDetail,
  getGroupDiscussionDetail,
  getGroupMember, getIsGroupMember, likeDiscussion
} from "@/api/group";
import {apiUrl, deleteRequest, getRequest} from "@/api/request";

export default {
  name: 'groupDiscussionDetail',
  data() {
    return {
      loading: true,
      isMember: false,
      isStarred: false,
      commentInput: "",
      discussion: {},
      group: {},
      replies: [],
    }
  },
  async mounted() {
    await this.refresh();
  },
  methods: {
    async likeDiscussion() {
      if (this.isStarred) {
        let response = await dislikeDiscussion('', this.discussion.id);
        if (response.status === 200) {
          this.$message.warning("取消点赞成功");
          await this.refresh();
        }
      } else {
        let response = await likeDiscussion('', this.discussion.id);
        if (response.status === 200) {
          this.$message.success("点赞成功");
          await this.refresh();
        }
      }
    },
    async refresh() {
      let response = await getGroupDetail('', this.$route.params.id);
      if (response.status === 200) {
        this.group.id = response.data.id;
        this.group.photo = apiUrl + response.data.avatar;
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
        this.discussion.user_id = response.data.author.id;
        this.discussion.user_avatar = apiUrl + response.data.author.avatar;
        this.discussion.date = response.data.create_at;
        this.discussion.title = response.data.title;
        this.discussion.content = response.data.content;
        this.discussion.thumb = response.data.likes;
        this.discussion.reply_count = response.data.reply_count;
      }
      //console.log(this.discussion);

      response = await getDiscussionComment('', this.$route.params.discussionId);
      if (response.status === 200) {
        this.discussion.reply = [];
        this.replies = [];
        for (let i = 0; i < response.data.length; i++) {
          this.discussion.reply.push({
            id: response.data[i].id,
            user_id: response.data[i].author.id,
            user_name: response.data[i].author.nickname,
            user_avatar: apiUrl + response.data[i].author.avatar,
            reply_date: response.data[i].create_at,
            reply_content: response.data[i].content,
          });
          this.replies.push({
            id: response.data[i].id,
            user_id: response.data[i].author.id,
            user_name: response.data[i].author.nickname,
            user_avatar: apiUrl + response.data[i].author.avatar,
            reply_date: response.data[i].create_at,
            reply_content: response.data[i].content,
          });
        }
      }

      response = await getRequest('/discussion/' + this.$route.params.discussionId + '/current_like/', '');
      if (response.status === 200) {
        this.isStarred = response.data.liked;
      }

      response = await getIsGroupMember('', this.$route.params.id);
      if (response.status === 200) {
        this.isMember = response.data.is_member;
      }

      this.loading = false
    },
    async postComment() {
      if (!this.isMember) {
        this.$message.warning("先成为小组成员再来发言吧~");
        return;
      }
      if (this.commentInput === "") {
        this.$message.warning("你怎么啥也不说啊╮(╯-╰)╭");
        return;
      }
      let payload = {
        content: this.commentInput
      }
      let response = await addDiscussionComment(payload, this.$route.params.discussionId);
      console.log(response)
      if (response.status === 200) {
        this.$message({
          message: '评论成功',
          type: 'success'
        });
        this.commentInput = ""
        await this.refresh();
      }
    },
    async deleteDiscussion() {
      let response = await deleteRequest('/discussion/' + this.$route.params.discussionId + '/', '');
      if (response.status === 200) {
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        await this.$router.push({path: '/group/' + this.$route.params.id});
      }
    },
    async deleteComment(comment) {
      let response = await deleteRequest('/comment/' + comment.id + '/', '');
      console.log(response)
      if (response.status === 200) {
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        await this.refresh();
      }
    },
  },
  computed: {
    checkPrivilege() {
      let currentUserID = this.$store.getters['user/id'];
      //console.log(currentUserID)
      console.log(this.discussion.user_id)
      return currentUserID.toString() === this.discussion.user_id.toString();
    },
    isAdmin() {
      //console.log("ROLE")
      //console.log(this.$store.getters['user/role'])
      return this.$store.getters['user/role'] === 'admin';
    },
    currentUser() {
      return this.$store.getters['user/id'].toString();
    },
  }
}
</script>

<style>
a {
  text-decoration: NONE
}
</style>