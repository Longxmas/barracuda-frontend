<template>
  <div id="allGroupView">
    <v-container fluid style="width: 90%" class="mt-5">
      <v-row>
        <v-col lg="8" md="8" xs="12" style="margin-top: 0;">
          <h1>
            所有兴趣小组
            <v-btn color="green" style="color: white" class="mr-5" @click="showAddDialog=true">
            添加一个兴趣小组
          </v-btn>
          </h1>

          <v-item-group
              multiple class="mt-5 pl-0">
            <v-container fluid class="pl-0">
              <v-row>
                <v-col v-for="group in groups"
                       :key="group.id"
                       lg="6"
                       md="6"
                       sm="12"
                       xs="12"
                       align-self="start"
                       class="pt-0"
                >
                  <v-card style="margin-bottom: 20px">
                    <v-card-title>
                      <v-avatar rounded size="150">
                        <v-img :src="group.photo"
                        ></v-img>
                      </v-avatar>
                      <a class="mx-auto" :href="'/group/' + group.id">
                        <span class="mx-auto">{{ group.name }}</span>
                      </a>

                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-subtitle>
                      共有{{ group.member_count }}位成员
                      &ensp;
                      &ensp;
                      <span class="mx-auto"> 创建于{{ group.create_at }}</span>
                    </v-card-subtitle>
                    <v-card-text>
                      {{ group.introduction }}
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-item-group>
        </v-col>


        <v-col lg="4" md="4" xs="12">
          <v-card class="mt-16">
            <v-card-title>
              所有小组中的热门讨论
            </v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item v-for="discussion in discussions"
                             :key="discussion.id"
                             :href="'/group/' + discussion.group_id + '/discussion/' + discussion.id"
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ discussion.title }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      来自 {{ discussion.group }} 的讨论
                    </v-list-item-subtitle>
                    <v-list-item-action-text>
                      最后回复于 {{ discussion.lastReplyTime }}
                    </v-list-item-action-text>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="showAddDialog">
      <v-card>
        <v-card-title>
          添加一个兴趣小组
        </v-card-title>
        <v-card-text>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" text @click="showAddDialog=false">
            取消
          </v-btn>
          <v-btn color="green" text @click="showAddDialog=false">
            确定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import {getAllGroup, getRandomDiscussion} from "@/api/group";
import {apiUrl} from "@/api/request";

export default {
  name: 'allGroupView',
  data() {
    return {
      showAddDialog: false,
      pageNumber: 1,
      itemLength: 20,
      whichPage: 1,
      groups: [],
      discussions: []
    }
  },
  async mounted() {
    await this.refresh();
  },
  methods: {
    async refresh() {
      let response = await getAllGroup('');
      console.log(response)
      if (response.status === 200) {
        this.groups = [];
        for (let i = 0; i < response.data.groups.length; i++) {
          this.groups.push({
            id: response.data.groups[i].id,
            name: response.data.groups[i].name,
            introduction: response.data.groups[i].introduction,
            photo: apiUrl + response.data.groups[i].avatar,
            create_at: response.data.groups[i].create_at,
            member_count: response.data.groups[i].member_count,
          })
        }
      }

      response = await getRandomDiscussion('');
      if (response.status === 200) {
        this.discussions = [];
        for (let i = 0; i < response.data.length; i++) {
          this.discussions.push({
            id: response.data[i].id,
            title: response.data[i].title,
            content: response.data[i].content,
            group: response.data[i].group.group_name,
            group_id: response.data[i].group.id,
            lastReplyTime: response.data[i].update_at,
          })
        }
      }
    }
  },
  computed: {}
}
</script>