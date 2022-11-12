<template>
    <div id="movieView">
        <v-tabs centered v-model="topTabName">
            <v-tab>概览</v-tab>
            <v-tab>媒体</v-tab>
            <v-tab>讨论区</v-tab>
        </v-tabs>

        <v-tabs-items v-model="topTabName">
        <v-tab-item> <!--概览部分-->
            <v-container fluid> 
                <v-row>
                    <v-col cols="3">
                        <v-img
                            height="400px"
                            max-height="400px"
                            width="300px"
                            src="../../assets/interstellar2.png"
                        ></v-img>
                    </v-col>
                    <v-col cols="8">
                        <v-card-text>
                            <v-row style="height:50px">
                                <h1>Interstellar</h1>
                                <h1>(2014)</h1>
                            </v-row>
                            <v-row>
                                <h3>2014-11-06 (HK)</h3>
                                <h3>冒险, 剧情, 科幻</h3>
                                <h3>2h 49m</h3>
                            </v-row>
                            <v-row>
                                <v-rating
                                :value="4.5"
                                color="amber"
                                dense
                                half-increments
                                readonly
                                size="14"></v-rating>
                                <div class="grey--text ms-4">4.5 (413)</div>
                                <v-btn icon>
                                    <v-icon>mdi-heart</v-icon>
                                </v-btn>
                                <v-btn icon>
                                    <v-icon>mdi-star</v-icon>
                                </v-btn>
                            </v-row>
                            <v-row>
                                <h1>剧情简介</h1>
                                <p>世界在历经极端气候与粮食危机，地球濒临末日之际，一位电机工程师与一群专业研究者还有顶尖太空人，扛起人类史上最重要的任务，越过已知的银河，在星际间寻找未来出路。同时必须先割舍无法与家人见面的亲情牵绊，在爱与勇气、生存与挑战中，跨越星际拯救人类。</p>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <p>Christopher Nolan</p>
                                    <p>Director</p>
                                </v-col>
                            </v-row>
                        </v-card-text>
                   </v-col>
                </v-row>
            </v-container>
            <v-container fluid>
                <v-row>
                <v-col cols="9">
                    <v-card style="margin:10px">
                        <v-card-title>主演</v-card-title>
                        <v-card-text>
                            <v-sheet
                            class="mx-auto"
                            elevation="8">
                                <v-slide-group
                                class="pa-4"
                                center-active
                                show-arrows>
                                    <v-slide-item
                                        v-for="n in 15"
                                        :key="n">
                                            <v-card
                                            outlined>
                                                <v-scale-transition>
                                                    <v-img
                                                    height="400px"
                                                    max-height="400px"
                                                    width="300px"
                                                    src="../../assets/interstellar2.png"
                                                    ></v-img>
                                                </v-scale-transition>
                                                <v-card-text>
                                                    <p>比利·海灵顿</p>
                                                </v-card-text>
                                            </v-card>
                                        </v-slide-item>
                                    </v-slide-group>
                            </v-sheet>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn>完整演职员表</v-btn>
                        </v-card-actions>
                    </v-card>
                    <v-divider></v-divider>
                    <v-card style="margin:10px">
                        <v-card-title>讨论</v-card-title>
                        <v-card-text>
                            <v-data-table
                            :headers="discussionHeaders"
                            :items="discussionItems"
                            hide-default-header
                            hide-default-footer
                            class="elevation-1">
                            <template v-slot:[`item.avatar`]="{ item }">
                                <v-img :src="item.avatar" width="20px"></v-img>
                            </template>
                            </v-data-table>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn>查看全部讨论</v-btn>
                        </v-card-actions>
                    </v-card>
                    <v-divider></v-divider>
                    <v-card style="margin:10px">
                        <v-card-title>媒体</v-card-title>
                        <v-card-text>
                            <v-sheet
                            class="mx-auto"
                            elevation="8">
                                <v-slide-group
                                class="pa-4"
                                center-active
                                show-arrows>
                                    <v-slide-item
                                        v-for="n in 15"
                                        :key="n">
                                            <v-card
                                            outlined>
                                                <v-scale-transition>
                                                    <v-img
                                                    height="400px"
                                                    max-height="400px"
                                                    width="300px"
                                                    src="../../assets/interstellar2.png"
                                                    ></v-img>
                                                </v-scale-transition>
                                                <v-card-text>
                                                    <p>比利·海灵顿</p>
                                                </v-card-text>
                                            </v-card>
                                        </v-slide-item>
                                    </v-slide-group>
                            </v-sheet>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn>查看全部媒体</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col cols="3">
                    <v-card style="margin:20px">
                        <v-card-text>
                            <v-row>
                                <h3>原产地片名</h3>
                            </v-row>
                            <v-row>
                                <p>Interstellar</p>
                            </v-row>
                            <v-row>
                                <h4>状态</h4>
                            </v-row>
                            <v-row>
                                <p>已上映</p>
                            </v-row>
                            <v-row>
                                <h4>原始语言</h4>
                            </v-row>
                            <v-row>
                                <p>英语</p>
                            </v-row>
                            <v-row>
                                <h4>预算</h4>
                            </v-row>
                            <v-row>
                                <p>$165,000,000.00</p>
                            </v-row>
                            <v-row>
                                <h4>票房</h4>
                            </v-row>
                            <v-row>
                                <p>$701,729,206.00</p>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
                </v-row>
            </v-container>
        </v-tab-item>
        <v-tab-item> <!--媒体部分-->
            <h1> 媒体 </h1>
        </v-tab-item>
        <v-tab-item> <!--影评部分-->
            <h1> 影评 </h1>
        </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: "movieView",
            topTabName: "overview",
            discussionHeaders: [
                { text: "头像", value: "avatar"},
                { text: "标题", value: "title" },
                { text: "回复数", value: "reply_count" },
                { text: "时间", value: "time" },
                { text: "用户", value: "user" },
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
        };
    },
    methods: {
    },
    computed: {

    },
}
</script>

<style scoped>

</style>