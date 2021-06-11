<template>
  <div class="login-container">
    <van-nav-bar title="登录" class="page-nav-bar">
      <van-icon slot="left" name="cross" class="close" @click="$router.push('/my')"></van-icon>
    </van-nav-bar>
    <van-form @submit="onSubmit" :submit-on-enter="false" ref="LoginFormRef">
      <i></i>
      <van-field
        v-model="user.mobile"
        autofocus
        type="tel"
        name="mobile"
        placeholder="输入手机号可快捷登录"
        :rules="[{ validator, trigger: 'onBlur' }]"
      >
      <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        type="number"
        placeholder="请输入验证码"
        clearable
        :rules="[{ validator: validatorCode }]"
      >
      <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <template #button>
            <van-count-down
              v-if="isCountDownShow"
              :time="60*1000"
              format="重新发送 sss"
              @finish="isCountDownShow = false"
            />
          <van-button v-else size="mini" class="send-login-code" native-type="button" round color="linear-gradient(to right, #ff6034, #ee0a24)" @click="onSendCode">发送验证码</van-button>
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
import { login, sendSms } from '@/api/user.js'
export default {
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      // 是否展示倒计时
      isCountDownShow: false
    }
  },
  methods: {
    async onSubmit () {
      this.$toast({
        type: 'loading',
        message: '登录中',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data: res } = await login(this.user)
        this.$toast.clear()
        this.$toast({
          type: 'success',
          message: '登陆成功',
          duration: 1200
        })
        this.$store.commit('setUser', res.data)
        this.$router.push('/my')
      } catch (error) {
        if (error.response.status && error.response.status === 400) {
          this.$toast.clear()
          this.$toast({
            type: 'fail',
            message: '手机号或验证码错误',
            duration: 1500
          })
        } else {
          this.$toast.clear()
          this.$toast({
            type: 'fail',
            message: '网络繁忙,请稍后重试'
          })
        }
      }
    },
    // 前端验证手机号码格式
    validator (val) {
      const reg = new RegExp('^(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])(\\d){8}$')
      if (!reg.test(val)) {
        this.$toast({
          type: 'fail',
          message: '手机号格式不正确',
          duration: 1400
        })
        return false
      }
    },
    validatorCode (val) {
      const reg = new RegExp('/\\./g')
      if (val.trim().length !== 6 || reg.test(val)) {
        this.$toast({
          message: '验证码必须为6位纯数字',
          duration: 1400,
          position: 'top'
        })
        return false
      }
      return true
    },
    async onSendCode () {
      // 发送验证码前表单手机号验证
      try {
        await this.$refs.LoginFormRef.validate('mobile')
      } catch (error) {
        return console.log(error)
      }
      // 发送请求
      try {
        const { data: res } = await sendSms(this.user.mobile)
        // 验证通过显示倒计时
        this.isCountDownShow = true
        console.log(res)
        this.$toast('发送成功')
      } catch (error) {
        // 发送失败关闭倒计时
        this.isCountDownShow = false
        if (error.response.status === 429) {
          this.$toast('发送太频繁了 请稍后再试')
        } else {
          this.$toast('发送失败 请稍后再试')
        }
      }
    }
  },
  created () {
    // this.$toast.allowMultiple()
  }
}
</script>

<style lang="less" scoped>
.login-container{
  .van-button{
  width: 300px;
}
  .close {
    color: #fff;
    font-size: 28px;
  }
  .iconfont {
    font-size: 37px;
  }
  .send-login-code {
        width: 152px;
        height: 46px;
        font-size: 18px;
  }
  .btn-login {
      width: 450px;
      margin: 50px auto 0;
      .van-button{
        width: 100%;
      }
  }
  .van-count-down {
    border: 0.5px solid #ff976a;
    background-color: #ff976a;
    border-radius: 26.64rem;
    font-size: 18px;
    color: #fff;
  }
}
</style>
