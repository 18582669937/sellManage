import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import router from './router'

import reset from './assets/css/reset.css'
import fonts from './assets/fonts/iconfont.css'

// 1. 创建一个全局bus, 用来跨级传值
Vue.prototype.$bus = new Vue();

import moment from 'moment'
// Vue.prototype.moment = moment
import dayjs from "dayjs"
Vue.prototype.dayjs = dayjs



Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
