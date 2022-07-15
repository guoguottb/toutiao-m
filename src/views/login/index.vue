<template>
  <div>
    <!-- navbar -->
    <van-nav-bar title="登录" left-arrow @click-left="onClickLeft">
      <template #left><van-icon name="cross" /></template>
    </van-nav-bar>
    <!-- form 表单 -->
    <van-form @submit="onSubmit" class="form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="iconfont icon-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="text"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="iconfont icon-yanzhengma"></span>
        </template>
        <template #right-icon>
          <!-- 倒计时 -->
          <van-count-down
            :time="3 * 1000"
            format="ss"
            v-if="isShowCountDown"
            @finish="isShowCountDown = false"
          />
          <!-- 发送验证码按钮 -->
          <van-button
            v-else
            class="code-btn"
            size="mini"
            native-type="button"
            round
            @click="sendCode"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit" class="btn"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendCode } from "@/apis/user";
//引入校验规则
import { mobileRules, codeRules } from "./rules/index";
export default {
  name: "Login",
  data() {
    return {
      mobile: "",
      code: "",
      mobileRules,
      codeRules,
      //倒计时 是否显示 默认为false
      isShowCountDown: false,
    };
  },
  methods: {
    // 返回按钮
    onClickLeft() {
      this.$router.back();
    },
    // 登录按钮
    async onSubmit() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      try {
        const res = await login(this.mobile, this.code);
        // 1. 存储token
        this.$store.commit("setUser", res.data.data);
        // 2. 页面跳转
        this.$router.push("/profile");
        // 3. 提示消息
        this.$toast.success("登陆成功");
      } catch (error) {
        const status = error.response.status;
        let message = "登陆失败，请重试！";
        if (status === 400) {
          message = error.response.data.message;
        }
        this.$toast.fail(message);
        // switch (status) {
        //   case 400:
        //     // 执行400的错误提示
        //     this.$toast.fail(error.response.data.message);
        //     break;
        //   case 507:
        //     // 执行507的错误提示
        //     this.$toast.fail("登陆失败，请重试！");
        //     break;

        //   default:
        //     // 兜底执行未知报错
        //     this.$toast.fail("登陆失败，请重试！");
        //     break;
        // }
      }
    },
    // 发送验证码按钮
    async sendCode() {
      try {
        // 验证手机号
        await this.$refs.form.validate("mobile");
        //发送请求
        const res = await sendCode(this.mobile);
        console.log(res);
        // 显示倒计时
        this.isShowCountDown = true;
      } catch (error) {
        if (!error.response) {
          this.$toast.fail("手机号格式不正确");
        } else {
          // this.$toast.fail("手机号不合法");
          const status = error.response.status;
          if (status === 404 || status === 429) {
            this.$toast.fail(error.response.data.message);
          }
        }
      }
    },
  },
  created() {},
};
</script>

<style scoped lang="less">
:deep(.van-nav-bar__content) {
  background-color: rgb(67, 150, 248);
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon-cross:before {
    color: #fff;
  }
}

//form表单
form {
  :deep(.van-field__label) {
    flex: 1;
  }
  :deep(.van-cell__value) {
    flex: 20;
  }
  .iconfont {
    font-size: 0.49333rem;
  }
  .btn {
    background: #6db4fb;
    border-radius: 0.13333rem;
    border: none;
  }
  .code-btn {
    background-color: rgb(237, 237, 237);
    color: #666;
    padding: 0.2rem;
  }
  // .van-field {
  //   width: 100%;
  //   height: 100px;
  // }
}
</style>