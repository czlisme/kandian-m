<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view></router-view>
    <van-tabbar v-model="active" route class="layout-tabber" active-color="#ee0a24">
      <van-tabbar-item to="/">
          <i slot="icon" class="iconfont icon-shouye"></i>
          <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
          <i slot="icon" class="iconfont icon-wenda"></i>
          <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
          <i slot="icon" class="iconfont icon-shipin"></i>
          <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
          <i slot="icon" class="iconfont icon-wode"></i>
          <span class="text" v-if="user">我的</span>
          <span class="text" v-else>未登录</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'Layout',
  data () {
    return {
      active: 1
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>
<style lang="less" scoped>
.layout-container {
    .layout-tabber {
        i.iconfont {
            font-size: 40px;
        }
        span.text {
            font-size: 20px;
        }
    }
}
</style>
