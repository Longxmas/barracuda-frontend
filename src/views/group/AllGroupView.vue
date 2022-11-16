<template>
  <div id="allGroupView">
    <v-container fluid style="width: 90%" class="mt-5">
      <v-row>
        <v-col lg="8" md="8" xs="12" style="margin-top: 0;">
          <h1>所有兴趣小组</h1>
          <v-divider></v-divider>
          <v-item-group
              multiple class="mt-5 pl-0" >
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
                      <span class="mx-auto">{{ group.name }}</span>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-subtitle>
                      共有{{ group.members.length }}位成员
                      &ensp;
                      &ensp;
                      <span class="mx-auto"> 创建于{{group.create_at}}</span>
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
                             :to="{name: 'discussion', params: {id: discussion.id}}"
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
                    <v-list-item-action-text>
                      {{discussion.content}}
                    </v-list-item-action-text>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'allGroupView',
  data() {
    return {
      pageNumber: 1,
      itemLength: 20,
      whichPage: 1,
      groups: [
        {
          id: 1,
          name: "科幻片yyds",
          introduction: "我们平等地热爱每一部优秀的科幻片" +
              "我们平等地热爱每一部优秀的科幻片" +
              "我们平等地热爱每一部优秀的科幻片" +
              "我们平等地热爱每一部优秀的科幻片",
          photo: require("../../assets/pics/syberpunk.jpg"),
          create_at: '2022-11-16',
          members: [
            {
              id: 1,
              name: "成员1",
              introduction: "这是一个成员",
              photo: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
            },
            {
              id: 2,
              name: "成员2",
              introduction: "这是一个成员",
              photo: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
            },
            {
              id: 3,
              name: "成员3",
              introduction: "这是一个成员",
              photo: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
            },
          ]
        },
        {
          id: 2,
          name: "小组2",
          introduction: "这是一个小组",
          photo: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
          members: [
            {
              id: 1,
              name: "成员1",
              introduction: "这是一个成员",
              photo: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
            },
            {
              id: 2,
              name: "成员2",
              introduction: "这是一个成员",
              photo: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
            },
            {
              id: 3,
              name: "成员3",
              introduction: "这是一个成员",
              photo: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
            },
          ]
        },
        {
          id: 3,
          name: "小组3",
          introduction: "这是一个小组",
          photo: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
          members: [
          ]
        },
        {
          id: 4,
          name: "小组4",
          introduction: "这是一个小组",
          photo: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
          members: [
          ]
        },
        {
          id: 5,
          name: "小组5",
          introduction: "这是一个小组",
          photo: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
          members: [
          ]
        },{
          id: 4,
          name: "小组4",
          introduction: "这是一个小组",
          photo: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
          members: [
          ]
        },{
          id: 4,
          name: "小组4",
          introduction: "这是一个小组",
          photo: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
          members: [
          ]
        },
      ],
      discussions: [
        {
          id: 1,
          title: "我做了一个1：1的地球仪，你往窗外看就能看见了",
          group: "弱智吧",
          lastReplyTime: "2020-12-12 12:12:12",
          content: "我做了一个1：1的地球仪，你往窗外看就能看见了"
        },
        {
          id: 2,
          title: "人只有醒来后才知道自己睡了一觉",
          group: "弱智吧",
          lastReplyTime: "2020-12-12 12:12:12",
          content: "人只有睡着了才会醒来"
        },
        {
          id: 3,
          title: '天生的哑巴，是不是也可以叫初音未来？',
          group: "弱智吧",
          lastReplyTime: "2020-12-12 12:12:12",
          content: "如题"
        }
      ]
    }
  },
  methods: {

  },
  computed: {

  }
}
</script>