<template>
  <div id="allActorView">
    <h1>所有影人</h1>
    <v-item-group
        multiple
    >
      <v-container fluid>
        <v-row>
          <v-col v-for="actor in actors"
                 :key="actor.id"
                 cols="4" sm="2">
            <v-card>
              <v-img :src="actor.photo"
                     height="250px"></v-img>
              <v-card-title>
                {{ actor.name }}
              </v-card-title>
              <v-card-subtitle>
                {{ actor.birthday }}
              </v-card-subtitle>
              <v-card-text>
                {{ actor.masterpiece }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
  </div>
</template>

<script>
export default {
  name: 'allActorView',
  data() {
    return {
      name: "allActorView",
      actors: [
        {
          id: 1,
          name: "Angeli Khang",
          birthday: "未知",
          photo: "https://www.themoviedb.org/t/p/w235_and_h235_face/jhNtIfmSlzsyQlo94BibQ2WIa7N.jpg",
          masterpiece: '清纯人妻, Eva, Mahjong Nights'
        },
        {
          id: 2,
          name: "Joey King",
          birthday: "未知",
          photo: "https://www.themoviedb.org/t/p/w235_and_h235_face/kL0lWLJA6lbvmPM3YL0ISE6rVr6.jpg",
          masterpiece: '亲吻亭, 亲吻亭2, 恶行'
        },
        {
          id: 3,
          name: "Min Do-yoon",
          birthday: "未知",
          photo: "https://www.themoviedb.org/t/p/w235_and_h235_face/bHHn3krbHyxQIWb4JbHkPlV6Uu1.jpg",
          masterpiece: '女老师3, 聊天软件：姐姐的口'
        },
        {
          id: 4,
          name: "Chloë Grace Moretz",
          birthday: "未知",
          photo: "https://www.themoviedb.org/t/p/w235_and_h235_face/j9d4i2xsLGUhwpuy5y0fkx1qAcz.jpg",
          masterpiece: '第五波, 海扁王, 魔女嘉莉'
        }
      ]
    };
  },
  methods: {

  },
  computed: {

  }
}
</script>