<template>
  <div id="reviewDetail">
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
              <v-img :src="review.user_avatar"></v-img>
            </v-avatar>
            <h1>{{review.review_title}}</h1>
          </v-row>
          <v-row>
            <v-col class="d-flex flex-row-reverse">
              <p>由{{review.user_name}}发表于{{review.review_date}}</p>
            </v-col>
          </v-row>
        </v-container>
        <v-divider></v-divider>
        <v-card-text>
          <mavon-editor
              v-model="review.review_content"
              :subfield="false" :toolbarsFlag="false" defaultOpen="preview"
          />
          <v-divider></v-divider>
          <v-btn>已有 {{review.review_thumb}} 点赞</v-btn>
        </v-card-text>
      </v-card-title>
    </v-card>
    <p>共计有 {{review.reply_count}} 条回复</p>
    <v-card
        v-for="reply in review.reply"
        :key="reply.id">
      <v-card-title>
        <v-container fluid>
          <v-row>
            <v-avatar>
              <v-img :src="reply.user_avatar"></v-img>
            </v-avatar>
            <h1>{{reply.reply_title}}</h1>
          </v-row>
          <v-row>
            <v-col class="d-flex flex-row-reverse">
              <p>由{{reply.user_name}}发表于{{reply.reply_date}}</p>
            </v-col>
          </v-row>
        </v-container>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <mavon-editor
            v-model="reply.reply_content"
            :subfield="false" :toolbarsFlag="false" defaultOpen="preview"
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
      activeIndex: 'tab-3',
      review: {
        id: 1,
        movie_id: 1,
        movie_poster: require('../../assets/interstellar2.png'),
        movie_name: "计算机组成原理",
        user_name: "flyinglandlord",
        user_avatar: "https://api.yimian.xyz/img?type=head",
        user_rate: 5,
        review_date: "2020-01-01",
        review_title: "计组P8的教程",
        review_content: "## T1 奇偶校验\n" +
            "\n" +
            "输入一个32位的二进制数据，再用一位输入告诉你是要做奇校验还是偶校验，输出完成奇偶校验后的二进制数据，本题中最高位即第31位为奇偶校验位\n" +
            "\n" +
            "所谓奇偶校验，就是检验数据中`1`的个数是奇数个还是偶数个，如果与要求不符，则通过改变最高位使数据符合要求\n" +
            "\n" +
            "记得应该是`funct`为`0`时偶校验，为`1`时奇校验（~~反正无所谓，题意最重要~~）\n" +
            "\n" +
            "| 端口名称 | 输入端/输出端 | 长度   |\n" +
            "| -------- | ------------- | ------ |\n" +
            "| data     | I             | [31:0] |\n" +
            "| funct    | I             | [0:0]  |\n" +
            "| result   | O             | [31:0] |\n" +
            "\n" +
            "正解应该是将`data`的进行按位异或，结果是1就是奇数个1，为0是偶数个1，然后根据这个结果去改变`result[31]`的值\n" +
            "\n" +
            "其实可以设一个计数器cnt，遇到1加一，然后判断是不是偶数，但是我考场上脑子抽了，以为组合逻辑没法把cnt清零，因此卡了半天，等到仿佛全世界都过了T1，当时确实心里非常慌...可以说差点栽在T1上了\n" +
            "\n" +
            "## T2 心情电路\n" +
            "\n" +
            "题目描述挺复杂，而且没有形式化的题面，根据往年经验，T2貌似都是描述很复杂的状态机，2020年好像是炒菜啥的，但是写起来出人意料的简单，下面尝试描述一下题意\n" +
            "\n" +
            ":::danger\n" +
            "下面的题意记的不是很清楚，不一定正确\n" +
            ":::\n" +
            "\n" +
            "有5个状态，已经给你标好了序号，分别是ASLEEP(000)，BUSY(001)，SAD(010)，CLUELESS(011)，HAPPY(100)\n" +
            "\n" +
            "有4种不同的输入，也已经给你标好了序号，分别是ALARM，FAIL，SUCCESS，IDEA\n" +
            "\n" +
            "~~当你在做计组题目时~~：\n" +
            "\n" +
            "- 如果你是ASLEEP状态，ALARM会把你吵醒，你会变成BUSY状态\n" +
            "- 如果你是BUSY状态，FAIL会让你变成SAD状态，SUCCESS会让你变成HAPPY状态；\n" +
            "- 如果你连续BUSY3个时钟周期，你会回到ASLEEP状态；\n" +
            "- 如果你是CLUELESS状态，IDEA会让你变成BUSY状态；如果你连续CLUELESS3个时钟周期，你会变成ASLEEP状态\n" +
            "- 如果你连续SAD2个时钟周期，你会变成CLUELESS状态\n" +
            "\n" +
            "**以上时钟周期不包括边界**\n" +
            "\n" +
            "| 端口名称        | 输入端/输出端 | 长度  |\n" +
            "| --------------- | ------------- | ----- |\n" +
            "| sign            | I             | [1:0] |\n" +
            "| clk             | I             | [0:0] |\n" +
            "| reset(异步复位) | I             | [0:0] |\n" +
            "| status          | O             | [2:0] |\n" +
            "\n" +
            "对，只需要知道大概题目有这么复杂就行了，但是根据题目画出状态转移图，搭一个Moore机，想做对挺容易，并没有啥技巧\n" +
            "\n" +
            "## T3 字符串匹配\n" +
            "\n" +
            "这次要匹配的字符串是一个方程的形式，大致要求如下\n" +
            "\n" +
            "1. **一个**数字`[0-9]`是一个**表达式**\n" +
            "2. **一个**字母`[a-zA-Z]`是一个**表达式**\n" +
            "3. 表达式之间用`'+' | '-' | '*' | '/'`连接起来仍然是表达式\n" +
            "4. 表达式与另一个表达式之间用`'='`连起来得到**方程**\n" +
            "5. 两个字符之间可以有任意多个空格，当然也可以没有\n" +
            "\n" +
            "举例说明：`1+2=a+b`是一个方程，`1++=b` 不是，`+a+b=1+2`不是方程\n" +
            "\n" +
            "| 端口名称        | 输入端/输出端 | 长度  |\n" +
            "| --------------- | ------------- | ----- |\n" +
            "| in              | I             | [7:0] |\n" +
            "| clk             | I             | [0:0] |\n" +
            "| reset(异步复位) | I             | [0:0] |\n" +
            "| out             | O             | [0:0] |\n" +
            "\n" +
            "写了一个非常大的Moore机，有START，L_NUM，L_OPT，L_ALPHA，EQ，R_NUM，R_OPT，R_ALPHA，ILLEGAL九个状态，转移也不难写出（倒是下面这个图挺难画的）\n" +
            "\n" +
            "![image-20211028172838540](https://i.loli.net/2021/10/28/xgTrZilcK8CwDFM.png)\n" +
            "\n" +
            "然后Verilog写出来就好了",
        review_thumb: 100,
        reply_count: 100,
        reply: [
          {
            id: 1,
            user_name: "Longxmas",
            user_avatar: "https://img3.doubanio.com/icon/u1000001-1.jpg",
            reply_date: "2020-01-01",
            reply_content: "# 太菜了，我的评价是不如hys一根毛",
            reply_title: "啊对对对",
            reply_thumb: 100,
          },
          {
            id: 2,
            user_name: "Harahan",
            user_avatar: "https://img3.doubanio.com/icon/u1000001-1.jpg",
            reply_date: "2020-01-01",
            reply_content: "# 太菜了，确实不如我",
            reply_title: "啊对对对",
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