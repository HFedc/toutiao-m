<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="登陆"
    >
      <van-icon
        slot="left"
        name="cross"
        @click="$router.back()"
      ></van-icon>
    </van-nav-bar>
    <!-- 登陆表单 -->
    <van-form ref="loginForm" @submit="onSubmit">
    <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
    >
        <template #left-icon>
            <i class="iconfont icon-shouji"></i>
        </template>
    </van-field>
    <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
    >
      <template #left-icon>
          <i class="iconfont icon-yanzhengma"></i>
      </template>
      <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 60"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            class="send-sms-btn"
            size="small"
            type="primary"
            native-type="button"
            @click="onSendSms"
          >获取验证码</van-button>
      </template>
    </van-field>
    <div class="login-btn-wrap">
      <van-button class="login-btn" block type="info" native-type="submit">登陆</van-button>
    </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      isCountDownShow: false
    }
  },
  methods: {
    async onSubmit () {
      this.$toast.loading({
        message: '登陆中...',
        forbidClick: true,
        duration: 0
      })
      const user = this.user
      try {
        const { data } = await login(user)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登陆成功')
      } catch (error) {
        if (error.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
    },
    async onSendSms () {
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (error) {
        return this.$toast.fail('验证失败')
      }
      this.isCountDownShow = true
      try {
        await sendSms(this.user.mobile)
        this.$toast.success('发送成功')
      } catch (error) {
        if (error.response.status === 429) {
          this.isCountDownShow = false
          this.$toast.fail('发送太频繁了，请稍后重试')
        } else {
          this.$toast.fail('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .iconfont {
      font-size: 37px;
      margin-right: 39px;
  }
  ::v-deep .van-field__button::before {
      display: inline-block;
      content: "";
      width: 2px;
      height: 46px;
      position: absolute;
      top: 10px;
      right: 180px;
      background-color: #eee;
  }
  .send-sms-btn {
      width: 152px;
      height: 46px;
      background-color: #ededed;
      border-radius: 23px;
      line-height: 46px;
      border: none;
      font-size: 22px;
      color: #666;
  }
  .login-btn-wrap {
      padding: 53px 28px;
      .login-btn {
          background-color: #6db4fb;
          border-radius: 10px;
          border: none;
      }
  }
}
</style>
