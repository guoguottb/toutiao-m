<template>
  <div>
    <!-- navbar -->
    <van-nav-bar title="登录" left-arrow @click-left="onClickLeft">
      <template #left><van-icon name="cross" /></template>
    </van-nav-bar>
    <!-- form 表单 -->
    <van-form @submit="onSubmit" class="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[{ required: true }]"
      >
        <template #label>
          <span class="iconfont icon-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="password"
        name="code"
        placeholder="请输入验证码"
        :rules="[{ required: true }]"
      >
        <template #label>
          <span class="iconfont icon-yanzhengma"></span>
        </template>
        <template #right-icon>
          <van-button class="code-btn" size="mini" round>发送验证码</van-button>
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
import { login } from "@/apis/user";
export default {
  name: "Login",
  data() {
    return {
      mobile: "",
      code: "",
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    async onSubmit() {
      const res = await login(this.mobile, this.code);
      console.log(res);
    },
  },
  created() {
  },
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
}
</style>