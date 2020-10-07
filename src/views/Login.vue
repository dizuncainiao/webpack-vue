<template>
  <div class="login-wrapper">
    <canvas id="dot">
      <p>your browser not support canvas</p>
    </canvas>
    <div class="login-box">
      <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules">
        <a-form-model-item has-feedback prop="email">
          <a-input v-model="ruleForm.email" placeholder="你的邮箱">
            <a-icon slot="prefix" type="user" class="prefix-color"/>
          </a-input>
        </a-form-model-item>
        <a-form-model-item has-feedback prop="birthday">
          <a-input v-model="ruleForm.birthday" type="password" placeholder="你的生日" autocomplete="new-password">
            <a-icon slot="prefix" type="lock" class="prefix-color"/>
          </a-input>
        </a-form-model-item>

        <a-form-model-item class="select-none">
          <a-checkbox>
            记住密码
          </a-checkbox>
          <a-button
              type="primary"
              class="full-width"
              @click="submitForm"
          >
            登录
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
import { regEmail, regDate } from '@/utils/RegExp'
import Dot from '@/plugins/Dot'

export default {
  name: 'Login',
  data () {
    // 邮箱校验验证
    const email = (rule, value, callback) => {
      !regEmail.test(value) ? callback(new Error('请输入你的邮箱账号！')) : callback()
    }

    // 邮箱校验验证
    const birthday = (rule, value, callback) => {
      !regDate.test(value) ? callback(new Error('请输入你的生日！')) : callback()
    }

    return {
      // 表单对象
      ruleForm: {
        email: 'test@qq.com',
        birthday: '1996-08-28'
      },
      // 校验规则
      rules: {
        email: [{
          validator: email,
          trigger: 'change'
        }],
        birthday: [{
          validator: birthday,
          trigger: 'change'
        }]
      }
    }
  },
  mounted () {
    this.resetDot()
    window.addEventListener('resize', this.resetDot)
  },
  methods: {
    resetDot () {
      Dot('dot', {
        cW: document.documentElement.clientWidth,
        cH: document.documentElement.clientHeight
      })
    },
    // 提交
    submitForm () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$router.replace('/home')
        } else {
          return false
        }
      })
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resetDot)
  }
}
</script>

<style scoped lang="less">
.prefix-color {
  color: rgba(0, 0, 0, .25)
}

.login-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;

  > canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, #91a0ff, #3d85f1);
  }

  .login-box {
    position: relative;
    z-index: 2;
    width: 600px;
    padding: 40px 60px;
    background: rgba(255, 255, 255, 0.75);
    border-radius: 6px;
    animation: Breathe 4s alternate infinite;
  }
}

@keyframes Breathe {
  from {
    box-shadow: 0 0 18px #fff;
  }
  to {
    box-shadow: 0 0 18px #717171;
  }
}
</style>
