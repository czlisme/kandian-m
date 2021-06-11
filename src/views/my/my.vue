<template>
  <div class="my-container">
    <!-- 用户未登录 -->
    <div v-if="!user" class="header-container not-login">
      <div class="login-box" @click="toLogin">
        <img
          src="../../assets/img/mobile.png"
          alt="加载失败"
          class="mobile-img"
        />
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- 用户登录 -->
    <div  v-else class="header user-info">
      <div class="base-info">
        <div class="user-box">
          <div class="header-photo">
            <!-- vant 引用本地图片 -->
            <!-- <van-image fit="cover" :src="require('@/assets/img/touxiang.jpg')" round></van-image> -->
            <van-image fit="cover" :src="userInfo.photo" round></van-image>
          </div>
          <span class="user-name">{{userInfo.name}}</span>
        </div>
        <div class="edit-userinfo">
          <span>编辑资料</span>
        </div>
      </div>
      <div class="data-info">
        <div class="data-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">看点</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
      </div>
    </div>
    <van-grid clickable column-num="3">
        <van-grid-item>
            <i slot="icon" class="iconfont icon-shoucang"></i>
            <span class="text" slot="text">收藏</span>
        </van-grid-item>
        <van-grid-item>
            <i slot="icon" class="iconfont icon-wenda"></i>
            <span class="text" slot="text">评论</span>
        </van-grid-item>
        <van-grid-item>
            <i slot="icon" class="iconfont icon-lishi"></i>
            <span class="text" slot="text">历史</span>
        </van-grid-item>
    </van-grid>
    <van-cell center clickable title="消息通知" is-link to="index" />
    <van-cell center clickable title="小智同学" is-link to="index" />
    <van-cell v-if="user" center clickable title="设置" is-link to="login" />
    <van-cell v-if="user" class="logout" clickable title="退出登录" @click="logout" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user.js'
export default {
  name: 'My',
  data () {
    return {
      active: 1,
      userInfo: {}
    }
  },
  methods: {
    toLogin () {
      this.$router.push('/login')
    },
    logout () {
      this.$dialog.confirm({
        title: '确认退出登录吗?'
      })
        .then(() => {
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          this.$notify({
            type: 'success',
            message: '已取消退出登录',
            duration: 500
          })
        })
    },
    async loadUserInfo () {
      try {
        const { data: res } = await getUserInfo()
        this.userInfo = res.data
      } catch (error) {
        console.log(error)
        this.$toast('获取数据失败 请稍后重试')
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    if (this.user) {
      this.loadUserInfo()
    }
  }
}
</script>
<style lang="less" scoped>
.my-container {
    height: 100%;
  .header-container {
    height: 361px;
    background: url("~@/assets/img/banner.png") no-repeat;
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .header {
    background: url('~@/assets/img/banner.png') no-repeat;
  }
  .user-info {
    .base-info {
      height: 261px;
      // background-color: pink;
      padding: 76px 32px 23px;
      display: flex;
      justify-content: space-between;
      box-sizing:border-box ;
      align-items: center;
      // padding: 0 40px;
      .user-box {
        display: flex;
        align-items: center;
        .header-photo {
        width: 132px;
        height: 132px;
        // background-color: yellow;
        margin-right: 23px;
        }
        span.user-name {
          font-size: 30px;
          color: #fff;
        }
      }
      .edit-userinfo {
        width: 120px;
        height: 45px;
        padding: 15px;
        background-color: #ffffff4f;
        border-radius: 14px;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
        span {
          letter-spacing: 0.025rem;
          font-size: 28px;
          color: #fff;
        }
      }
    }
    .data-info {
      // height: 131px;
      // background-color: aqua;
      display: flex;
      .data-item {
        height: 131px;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .count {
          font-size: 36px;
          color: #f3f3f3f5;
        }
        .text {
          color: #ebe6ec;
          font-size: 23px;
        }
      }
    }
  }
  .van-grid {
    .van-grid-item {
      height: 141px;
      i.iconfont {
        font-size: 45px;
      }
      .icon-shoucang {
        color: #f30814;
      }
      .icon-wenda {
        color: #09d847;
      }
      .icon-lishi {
        color: #b303f8;
      }
      span.text {
        font-size: 28px;
      }

    }
  }
  .logout {
    text-align: center;
    span {
      color: #da1a23;
      font-size: 30px;
    }
  }
}
</style>
