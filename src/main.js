import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import vuetify from './plugins/vuetify'
import Axios from 'axios'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import videoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import store from './store'

Vue.use(videoPlayer)
Vue.use(mavonEditor)
Vue.config.productionTip = false

Axios.defaults.baseURL = '/api';
Axios.defaults.headers.post['Content-Type'] = 'application/json';


Vue.use(ElementUI);

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
