<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input type="text" v-model="phone" placeholder="请输入你的手机号" />
        <span class="error-msg">请输入正确号码</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" v-model="code" placeholder="请输入验证码" />
        <button @click="getCode()" style="height: 30px; width: 100px; margin-left: 2%">
          获取验证码
        </button>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input type="password" placeholder="请输入你的登录密码" v-model="passwordOne" />
        <span class="error-msg"
          >至少包含一个字母和一个数字。 只能包含字母和数字。 长度至少为 8 个字符</span
        >
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input type="password" placeholder="请输入确认密码" v-model="passwordTow" />
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="btn">
        <button @click="checkPasswords">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      // 电话号码
      phone: "",
      // 验证码
      code: "",
      // 密码
      passwordOne: "",
      // 验证密码
      passwordTow: "",
    };
  },
  methods: {
    // 获取验证码
    async getCode() {
      try {
        // 检查电话号码是否符合标准
        const phoneNumberRegex = /^1[3456789]\d{9}$/;
        if (phoneNumberRegex.test(this.phone)) {
          await this.$store.dispatch("getPhoneCode", this.phone);
          this.code = this.$store.state.user.code;
        } else {
          alert("非法号码格式");
        }
      } catch (error) {
        console.log(error);
      }
    },
    //检查密码格式
    validatePassword(password) {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      return passwordRegex.test(password);
    },
    // 两次密码是否一样
    async checkPasswords() {
      if (
        this.validatePassword(this.passwordOne) &&
        this.validatePassword(this.passwordTow)
      ) {
        if (this.passwordOne === this.passwordTow && this.phone != "") {
          await this.$store.dispatch("registrationInfo", {
            phone: this.phone,
            password: this.passwordOne,
            code: this.code,
          });
          this.$router.push("/Login");
        } else {
          alert("密码输入不一致");
        }
      } else {
        alert("密码不符合规则");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>
