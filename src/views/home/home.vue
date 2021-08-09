<template>
  <div class="home-container">
    <!-- 导航区 -->
    <van-nav-bar fixed>
      <van-button round size="small" icon="search" slot="title" class="search-btn">搜索</van-button>
    </van-nav-bar>
    <!-- 频道列表 -->
    <van-tabs v-model="active" swipeable class="channel-tab" animated>
      <van-tab v-for="channel in channels" :key="channel.id" :title="channel.name">
        <!-- 文章列表 -->
        <article-list :channel="channel"></article-list>
        <!-- 文章列表 -->
      </van-tab>
      <div slot="nav-right" class="gengduo-btn">
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list.vue'
export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0,
      channels: []
    }
  },
  components: {
    ArticleList
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      try {
        const { data: res } = await getUserChannels()
        console.log(res)
        this.channels = res.data.channels
      } catch (error) {
        this.$toast('获取用户频道数据失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding-bottom: 100px;
  .van-nav-bar {
    background-color: #f8263fe1;
      /deep/ .van-nav-bar__title {
    max-width: unset;
  }
    .search-btn {
      width: 555px;
      height: 64px;
      background-color: #e9afbd;
      border: none;
      font-size: 28px;
      color: #f5f5f5;
      i {
        color: #f5f5f5;
      }
    }
  }
   /deep/ .channel-tab {
    //  position: relative;
    //  top: 136px;
    .van-tabs__content {
      position: relative;
      top: 175px;
    }
    .van-tabs__wrap {
      height: 82px;
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
    }
    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #777;
    }
    .van-tab--active {
      color: #333;
    }
    .gengduo-btn {
      width: 66px;
      height: 82px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      right: 0;
      background-color: #fff;
      opacity: 0.9;
      // border-left: 5px solid pink;
      i.iconfont {
        font-size: 33px;
      }
      &::before {
        content: '';
        width: 1px;
        height: 80%;
        background-color: pink;
        background-image: linear-gradient(#eddd,#ae8787);
        border-radius: 50%;
        position: absolute;
        left: 0px;
        // background-color: linear-gradient;

      }
    }
  }
}
</style>
