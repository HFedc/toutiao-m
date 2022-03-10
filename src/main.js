import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入vantui
import '@/vant'
// 加载全局样式
import '@/styles/index.less'
// 动态设置rem基准值
import 'amfe-flexible'
import '@/utils/dayjs'
Vue.prototype.$bus = new Vue()
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
