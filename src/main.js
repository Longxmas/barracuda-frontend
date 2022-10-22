import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import vuetify from './plugins/vuetify'
import Axios from 'axios'

Vue.config.productionTip = false

Axios.defaults.baseURL = '/api'
Axios.defaults.headers.post['Content-Type'] = 'application/json';


Vue.use(ElementUI);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
