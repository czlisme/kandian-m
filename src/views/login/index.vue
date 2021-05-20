<template>
  <div class="login-container">
    <van-nav-bar title="登录" class="page-nav-bar"  right-text="取消"/>
    <van-form @submit="onSubmit">
      <i></i>
      <van-field
        v-model="user.mobile"
        autofocus
        type="tel"
        name="手机号"
        placeholder="输入手机号可快捷登录"
      >
      <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="验密码"
        type="number"
        placeholder="请输入验证码"
        clearable
      >
      <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <template #button>
          <van-button size="mini" class="send-login-code" round color="linear-gradient(to right, #ff6034, #ee0a24)">发送验证码</van-button>
        </template>
      </van-field>
      <div class="btn-login">
        <van-button round block type="warning" native-type="submit">登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import login from '@/api/login.js'
export default {
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    async onSubmit () {
      const res = await login(this.user)
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.login-container{
  .van-button{
  width: 300px;
}
  .iconfont {
    font-size: 37px;
  }
   .send-login-code{
        width: 152px;
        height: 46px;
    }
    .btn-login{
      width: 450px;
      margin: 50px auto 0;
      .van-button{
        width: 100%;
      }
    }
}
</style>
