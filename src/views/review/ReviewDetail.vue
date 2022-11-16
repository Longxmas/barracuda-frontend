<template>
  <div id="reviewDetail">
    <v-container fluid style="width: 90%; margin-top: 10px;margin-left: 50px;
                            min-width:900px; overflow: scroll">
      <v-row>
        <v-col cols="9">
          <v-card elevation="0">
            <v-card-title>
              <v-container fluid class="pl-5">
                <v-row>
                  <h2>{{ review.review_title }}</h2>
                </v-row>
                <v-row class="pt-5">
                  <v-avatar>
                    <v-img :src="review.user_avatar" alt="Avatar"></v-img>
                  </v-avatar>
                  &ensp;
                  <a style="margin-top: 15px; margin-bottom: 15px; font-size: 16px">{{ review.user_name }}</a>
                  &ensp;
                  <p style="margin-top: 15px; margin-bottom: 15px; font-size: 16px">评论</p>
                  &ensp;
                  <a style="margin-top: 15px; margin-bottom: 15px; font-size: 16px">{{ review.movie_name }}</a>
                  &ensp;
                  <p class="my-auto" style="font-size: 16px"> {{ review.review_date }} </p>
                  <v-spacer></v-spacer>
                  <v-rating style="margin-top: 15px; margin-bottom: 15px"
                            :value="review.user_rate" color="amber" dense half-increments readonly
                            size="14">
                  </v-rating>
                </v-row>
              </v-container>
              <v-row class="py-3">
                <mavon-editor
                    v-model="review.review_content"
                    :subfield="false" :toolbarsFlag="false" defaultOpen="preview"
                    box-shadow-style="0 0 0 0 rgba(0,0,0,0)"
                    preview-background="#fff"
                />
              </v-row>

              <v-row class="pl-5 pb-5" style="text-align: center">
                <v-col class="mx-auto">
                  <v-btn large class="mr-5" style="color: white;background-color: skyblue"
                         @click="like_review(review)">
                    <v-icon class="my-auto"> mdi-heart</v-icon>
                    &ensp;
                    已有点赞
                    &ensp;
                    {{ review.review_thumb }}
                  </v-btn>

                  <v-btn large class="mr-5" style="color: white;background-color: darkorange">
                    <v-icon class="my-auto"> mdi-message</v-icon>
                    &ensp;
                    已有回复
                    &ensp;
                    {{ review.reply_count }}
                  </v-btn>
                </v-col>
              </v-row>

            </v-card-title>
          </v-card>

          <v-divider></v-divider>

          <v-card class="mt-10" elevation="0" min-width="1000px" style="overflow: scroll;">
            <v-card-title><h3>回复</h3></v-card-title>

            <v-list class="py-0 pl-0" width="95%">
              <v-list-item
                  v-for="(comment, i) in review.reply"
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
                        <v-img :src="review.user_avatar"></v-img>
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
              <a>{{ review.movie_name }}</a>
            </v-card-title>
            <v-card-text>
              <v-img :src="review.movie_poster"
                     height="300px"
                     width="225px"></v-img>
              <v-container class="pt-8">
                <v-row>
                  <span>导演： {{review.movie_director}}</span>
                </v-row>
                <v-row>
                  <span>主演：</span>
                  <span v-for="(actor, i) in review.movie_actor" :key=i>{{actor}}</span>
                </v-row>
                <v-row>
                  <span>类型：</span>
                  <span v-for="(type, i) in review.movie_genre" :key=i>{{type}}</span>
                </v-row>
                <v-row>
                  <span>地区：{{review.movie_country}}</span>
                </v-row>
                <v-row>
                  <span>上映时间：{{review.movie_date}}</span>
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
export default {
  name: 'reviewDetail',
  created() {
    this.breadcrumbs_items[1].text = this.review.movie_name;
    //console.log(this.breadcrumbs_items[1])
  },
  data() {
    return {
      activeIndex: 'tab-3',
      breadcrumbs_items: [
        {
          text: '电影',
          disabled: false,
          href: '/movie',
        },
        {
          text: '',
          disabled: false,
          href: '/moviereview',
        },
        {
          text: '一般讨论',
          disabled: true,
        }
      ],
      review: {
        id: 1,
        movie_id: 1,
        movie_poster: require('../../assets/interstellar2.png'),
        movie_name: "星际穿越",
        movie_director: "克里斯托弗·诺兰",
        movie_actor:[
            "马修·麦康纳",
        ],
        movie_genre:[
          "科幻",
          "剧情",
          "冒险",
        ],
        movie_date: "2014-11-07",
        movie_duration: "169分钟",
        movie_country: "美国",
        user_name: "flyinglandlord",
        user_avatar: "https://api.yimian.xyz/img?type=head",
        user_rate: 5,
        review_date: "2020-01-01",
        review_title: "这是计组P8的教程",
        review_content:
            "通过阅读本文，您肯定做不出P8，本文也仅限于介绍很少一部分P8的思路以及实现\n" +
            "P8作为FPGA实验，需要详细参考教程，本文仅供参考\n" +
            "P8的主要内容是对Verilog搭建的MIPS微系统进行综合，并使其能够运行在FPGA上\n" +
            "课上课下会要求编写汇编代码实现一些功能\n" +
            "\n" +
            "## 课下部分\n" +
            "\n" +
            "坚持到最后感觉还是写点东西吧，这个系列最好不要半途而废，这里是P8的一些做法和提示，详细的等到有时间再慢慢写\n" +
            "\n" +
            "首先是P8怎么做，P8很范围很广，看起来很复杂，但是其实如果P7写的好，那么把乘除槽注释掉之后过综合不是问题，然后按照要求添加约束文件，换IP核之后就完成了很多工作了\n" +
            "\n" +
            "然后需要修改的只有顶层模块和桥bridge两块，主要是按照要求添加外设\n" +
            "\n" +
            "外设中有很多好添加的比如LED、按动开关和拨动开关，尤其复杂的是串口通信和数码管\n" +
            "\n" +
            "数码管建议对着我的代码看看，然后再去仔细看看教程，搞清楚数码管是四个一组，每一次刷新两个8的位置，利用视觉暂留原理显示图像\n" +
            "\n" +
            "串口通信我也没太搞明白，总之按我的设计文档加一个中断就完了，但是据助教说这样有问题，需要考虑一下read_over这个信号，因为P8选做，我也没细看，留个坑等以后看懂了再填\n" +
            "\n" +
            "后面附的有设计文档\n" +
            "\n" +
            "## 课上部分\n" +
            "\n" +
            "课上的话三选一，下面就是三道题目，解法就不放了，毕竟这个汇编各自有各自的写法，但是一定注意一下beq后面一定要手写一个nop，否则就会出锅，个人觉得UART最难没选，计时器肯定最简单，然后第三题就没看了\n" +
            "\n" +
            "另：今年的P8可以带自己的笔记本，不知道以后还是不是这样\n" +
            "\n" +
            "### 可变速计时器\n" +
            "\n" +
            "从拨码开关(switch)读入数据： 在计数器进行计数时触发读入操作。拨码开关组A中读入一个无符号 32 bit 数字，设该无符号32 bit数字为$n$，实现以下功能\n" +
            "\n" +
            "**控制计时器计数时间间隔**：$n$即为计时器计数的时间间隔秒数，并有以下限制：\n" +
            "\n" +
            "- 若$n=0$，计数器不工作，数码管显示为自定义初始值（该值有且仅有一种，形如\"00000000\"）；\n" +
            "- 若$0<n\\leq2$，计数器每隔大约n秒进行一次计数的操作，并在数码管上显示；\n" +
            "- 若$n>2$，视$n=2$，计数器每隔大约2秒进行一次计数的操作。时间间隔可以不精确，但需要使记数速度的差异可以被分辨。\n" +
            "\n" +
            "**循环计数**：在计时器工作时，计数器从0计数至9，之后又回到0重新从0至9计数。计时器任意一个工作时刻所记的数需要在数码管上显示。\n" +
            "\n" +
            "**举例**：拨码开关1设置为`00000000000000000000000000000010`，则每隔大约2秒数码管上的数值加1。特别地，当要更新数码管数值时，数码管显示数值为9，则更新数码管显示数值为0。\n" +
            "\n" +
            "### 十六进制数串口输出\n" +
            "在不改变外部设备代码设计的情况下，编写`mips`汇编程序，实现以下功能。\n" +
            "\n" +
            "**从拨码开关(`switch`)读入数据**：从拨码开关组B中读入一个无符号32bit数字，设该无符号32bit数字为$n$。\n" +
            "**用户定义开关(`user key`)触发操作**：将$n$显示在数码管上（8个十六进制数字），并通过UART将数码管上显示的数字以ASCII字符形式输出。\n",
        review_thumb: 100,
        reply_count: 100,
        reply: [
          {
            id: 1,
            user_name: "Longxmas",
            user_avatar: "https://img3.doubanio.com/icon/u1000001-1.jpg",
            reply_date: "2020-01-01",
            reply_content: "太菜了，我的评价是不如hys一根毛",
            reply_title: "啊对对对",
            reply_thumb: 100,
          },
          {
            id: 2,
            user_name: "Harahan",
            user_avatar: "https://img3.doubanio.com/icon/u1000001-1.jpg",
            reply_date: "2020-01-01",
            reply_content: "太菜了，确实不如我",
            reply_title: "啊对对对",
            reply_thumb: 100,
          },
        ]
      }
    }
  },
  methods: {
    jumpToOverView() {
      this.$router.push('/movie');
    },
    jumpToMedia() {
      this.$router.push('/moviemedia');
    },
    like_review(review) {
      review.review_thumb += 1;
      alert("点赞成功");
    }
  },
  computed: {}
}
</script>