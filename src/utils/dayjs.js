import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
// 插件
dayjs.extend(relativeTime)
// dayjs 默认语言是英文
dayjs.locale('zh-cn') // 全局使用
// 定义一个全局过滤器，然后就可以在任何组件中使用
// {{ 表达式 ｜ 过滤器名称 }}
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
