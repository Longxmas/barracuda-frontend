<template>
  <div id="reviewHomeView">
    <h1>最近的影评</h1>
    <v-breadcrumbs
        :items="selection_items"
        large
    ></v-breadcrumbs>
    <v-card elevation="0">
      <v-card-text>
        <v-list style="margin: auto">
          <v-list-item
            v-for="review in reviews"
            :key="review.id">
            <v-container fluid>
              <v-row>
                <v-col cols="1">
                  <v-img :src="review.movie_poster"></v-img>
                </v-col>
                <v-col cols="11">
                  <v-card>
                    <v-card-text>
                      <v-container fluid>
                        <v-row>
                          <v-avatar>
                            <v-img :src="review.user_avatar"></v-img>
                          </v-avatar>
                          <a>{{review.user_name}}</a>
                          <v-rating style="margin-top: 15px; margin-bottom: 15px"
                                    :value="review.user_rate" color="amber" dense half-increments readonly size="14">
                          </v-rating>
                        </v-row>
                        <v-row>
                          <a><h1>{{review.review_title}}</h1></a>
                        </v-row>
                        <v-row>
                          <p>{{review.review_digest}}}</p>
                        </v-row>
                        <v-row>
                          <v-btn rounded>{{review.review_thumb}} 点赞</v-btn>
                          <v-chip>{{review.reply_count}} 回复</v-chip>
                        </v-row>
                      </v-container>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'reviewHomeView',
  data() {
    return {
      selection: '最近的影评',
      selection_items: [
        {
          text: '最近的影评',
          disabled: false,
          href: '/reviewhome',
        },
        {
          text: '全部影评',
          disabled: false,
          href: '/reviewhome',
        },
      ],
      reviews: [
        {
          id: 1,
          movie_id: 1,
          movie_poster: require('../../assets/interstellar2.png'),
          movie_name: "肖申克的救赎",
          user_name: "小鸟",
          user_avatar: "https://img3.doubanio.com/icon/u1000001-1.jpg",
          user_rate: 5,
          review_date: "2020-01-01",
          review_title: "这是一部好电影",
          review_content: "好呀好呀好呀好",
          review_digest: "这篇影评可能有剧透\n" +
              "\n" +
              "由于众所周知的原因，院线电影在沉寂了一个多月之后，终于上映了一部由众多年轻一代演员和老戏骨联手奉献的扫黑题材电影，给这个有点波澜不惊的电影市场注入了一剂新的强心剂。 近年来，扫黑题材影视作品并不少见，这次本片从近年来为人深恶痛绝的“套路贷”和暴力催收引发的案...  (展开)",
          review_thumb: 100,
          reply_count: 100,
          reply: [
            {
              user_name: "小鸟",
              user_avatar: "https://img3.doubanio.com/icon/u1000001-1.jpg",
              review_date: "2020-01-01",
              review_content: "好呀好呀好呀好",
              review_digest: "好呀好呀好呀好",
              review_thumb: 100,
            },
            {
              user_name: "小鸟",
              user_avatar: "https://img3.doubanio.com/icon/u1000001-1.jpg",
              review_date: "2020-01-01",
              review_content: "好呀好呀好呀好",
              review_digest: "好呀好呀好呀好",
              review_thumb: 100,
            },
          ]
        },
        {
          id: 2,
          movie_id: 1,
          movie_poster: require('../../assets/interstellar2.png'),
          movie_name: "肖申克的救赎",
          user_name: "小鸟",
          user_avatar: "https://img3.doubanio.com/icon/u1000001-1.jpg",
          user_rate: 5,
          review_date: "2020-01-01",
          review_title: "这是一部好电影",
          review_content: "好呀好呀好呀好",
          review_digest: "好呀好呀好呀好",
          review_thumb: 100,
          reply_count: 100,
          reply: [
            {
              user_name: "小鸟",
              user_avatar: "https://img3.doubanio.com/icon/u1000001-1.jpg",
              review_date: "2020-01-01",
              review_content: "好呀好呀好呀好",
              review_digest: "好呀好呀好呀好",
              review_thumb: 100,
            },
            {
              user_name: "小鸟",
              user_avatar: "https://img3.doubanio.com/icon/u1000001-1.jpg",
              review_date: "2020-01-01",
              review_content: "好呀好呀好呀好",
              review_digest: "好呀好呀好呀好",
              review_thumb: 100,
            },
          ]
        },
        {
          id: 3,
          movie_id: 1,
          movie_poster: require('../../assets/interstellar2.png'),
          movie_name: "肖申克的救赎",
          user_name: "小鸟",
          user_avatar: "https://img3.doubanio.com/icon/u1000001-1.jpg",
          user_rate: 5,
          review_date: "2020-01-01",
          review_title: "这是一部好电影",
          review_content: "好呀好呀好呀好",
          review_digest: "好呀好呀好呀好",
          review_thumb: 100,
          reply_count: 100,
          reply: [
            {
              user_name: "小鸟",
              user_avatar: "https://img3.doubanio.com/icon/u1000001-1.jpg",
              review_date: "2020-01-01",
              review_content: "好呀好呀好呀好",
              review_digest: "好呀好呀好呀好",
              review_thumb: 100,
            },
            {
              user_name: "小鸟",
              user_avatar: "https://img3.doubanio.com/icon/u1000001-1.jpg",
              review_date: "2020-01-01",
              review_content: "好呀好呀好呀好",
              review_digest: "好呀好呀好呀好",
              review_thumb: 100,
            },
          ]
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