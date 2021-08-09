import vue from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
// 加载中文语言包 dayjs默认为英文 这里配置成中文
import 'dayjs/locale/zh-cn'
// 全局配置
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
// vue过滤器 只能在模板中使用
vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
console.log(dayjs().to(dayjs('2019')))
