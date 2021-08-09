<template>
  <div class="article-list">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <!-- 下拉提示 -->
      <template #pulling='props'>
        <loading-pull :style="{ transform: `scale(${props.distance / 80})` }" ></loading-pull>
      </template>
        <!-- 释放提示 -->
      <template #loosing>
        <loading-pull></loading-pull>
      </template>
      <!-- 加载提示 -->
      <template #loading>
        <loading></loading>
      </template>
      <!-- 滚动下滑 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="加载失败,请稍后重试"
      >
        <article-item
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        ></article-item>
        <!-- <van-cell v-for="(article,index) in list" :key="index" :title="article.title" /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import Loading from '@/components/loading'
import LoadingPull from '@/components/loading-pull'
import getArticles from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  components: {
    Loading,
    LoadingPull,
    ArticleItem
    // LoadingPull
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      error: false,
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      timestamp: null,
      refreshSuccessText: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 下拉刷新
    async onRefresh () {
      try {
        const { data: res } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        const { results } = res.data
        console.log(results)
        // 将数据追加到顶部
        this.list.unshift(...results)
        // 数据加载完成 将refreshing取消
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
        this.$notify({
          message: this.refreshSuccessText,
          background: '#7C4DFF',
          duration: 500,
          color: '#fff'
        })
        this.refreshing = false
      } catch (error) {
        this.refreshing = false
        this.$toast('刷新失败')
      }
    },
    // 初始化时和滚动到底部触发
    async onLoad () {
      try {
        // 发送请求
        const { data: res } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        // 接收返回数据
        const { results } = res.data
        // 将接收的数据...展开push到list
        this.list.push(...results)
        // 将正在加载效果取消
        this.loading = false
        // 判断如果数据结果还有
        if (results.length) {
          this.timestamp = res.data.timestamp
        } else {
          // 没有数据了，设置加载状态结束，不再触发上拉加载更多了
          this.finished = true
        }
        // console.log(res.data)
      } catch (error) {
        this.loading = false // 关闭 loading 效果
        this.error = true // 开启错误提示
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
