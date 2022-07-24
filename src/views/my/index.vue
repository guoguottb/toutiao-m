<template>
  <div class="my">
    <!-- 头部 -->
    <header>
      <!-- 登录之后的头部盒子 -->
      <div v-if="isShow" class="user-info banner">
        <!-- 占位 -->
        <van-row></van-row>
        <!-- 头像和手机号 -->
        <van-row class="row-2">
          <van-col span="12">
            <van-row type="flex" justify="space-around" align="center">
              <van-image
                round
                width="1.76rem"
                height="1.76rem"
                :src="userInfo.photo"
              />
              <span id="mobile">{{ userInfo.name }}</span>
            </van-row>
          </van-col>
          <van-col span="11">
            <van-row type="flex" justify="end" align="center">
              <van-button class="code-btn" size="mini" round
                >编辑资料</van-button
              >
            </van-row>
          </van-col>
        </van-row>
        <!-- 头像 粉丝 关注 获赞 -->
        <van-row>
          <van-grid>
            <van-grid-item text="头条">
              <template #icon>{{ userInfo.art_count }}</template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon>{{ userInfo.fans_count }}</template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon>{{ userInfo.follow_count }}</template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon>{{ userInfo.like_count }}</template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <!-- 未登录的头部盒子 -->
      <div v-else class="login-register banner">
        <div class="wrap" @click="toLogin">
          <!-- 未登录状态下的头像 -->
          <img src="../../assets/images/mobile.png" alt="" />
          <span>登录/注册</span>
        </div>
      </div>
    </header>
    <!-- 主题区域 -->
    <main>
      <!-- 收藏/历史 -->
      <div>
        <van-grid column-num="2" class="gird" clickable>
          <van-grid-item text="收藏">
            <template #icon>
              <span class="iconfont icon-shoucang"></span>
            </template>
          </van-grid-item>
          <van-grid-item text="历史">
            <template #icon>
              <span class="iconfont icon-lishi"></span>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <!-- 消息通知/小智同学 -->
      <div class="link">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </div>
    </main>
    <!-- 退出按钮 -->
    <van-button v-if="isShow" block class="goLogin" @click="logout"
      >退出</van-button
    >
  </div>
</template>

<script>
// 导入API
import { getUserInfo, removeToken } from "@/apis";
export default {
  data() {
    return {
      userInfo: {},
    };
  },
  // 计算属性
  computed: {
    isShow() {
      return !!this.$store.state.user.token;
    },
  },
  // 方法
  methods: {
    // 用户登录状态   退出按钮
    logout() {
      this.$dialog
        .confirm({
          title: "黑马头条",
          message: "是否确认退出该账号？",
        })
        .then(() => {
          // 用户点击确认之后 清除本地token
          this.$store.commit("setUser", {});
          // on confirm
        })
        .catch(() => {
          // 用户点击取消 什么事情也不做
        });
    },
    // 用户未登录状态   点击去登录的按钮
    toLogin() {
      this.$router.push("/login");
    },
    // 获取用户信息
    async getInfo() {
      try {
        if (this.isShow) {
          const {
            data: { data },
          } = await getUserInfo();
          this.userInfo = data;
          console.log(this.userInfo);
        }
      } catch (error) {
        console.log(error);
        if (error.response.status === 401) {
          this.$toast.fail("用户认证失败，请重新登录");
          this.$router.push("/login");
        }
      }
    },
  },
  // 创建后
  created() {
    this.getInfo();
  },
};
</script>

<style lang="less" scoped>
.my {
  background-color: rgb(245, 247, 249);
  height: calc(100vh - 100px);
}

.banner {
  width: 100%;
  height: 400px;
  background: url("@/assets/images/banner.png") no-repeat 0 0 / cover;
}

// 登录之后的用户信息区域
.user-info {
  display: flex;
  flex-direction: column;

  > .van-row {
    flex: 1;
  }

  .row-2 {
    .van-col {
      height: 100%;

      .van-row {
        height: 100%;
      }
    }
  }

  #mobile {
    font-size: 0.4rem;
    color: #fff;
    margin-left: 0.29333rem;
  }

  :deep(.van-image__img) {
    height: 100%;
  }

  :deep(.van-grid-item__content) {
    background-color: unset;
  }

  :deep([class*="van-hairline"]::after) {
    border: 0;
  }

  :deep(.van-grid-item__icon-wrapper) {
    font-size: 0.34667rem;
    color: #fff;
  }

  :deep(.van-grid-item__text) {
    font-size: 0.29333rem;
    color: #fff;
  }

  .code-btn {
    width: 1.53333rem;
    height: 0.42667rem;
    background: #fff;
    border-radius: 0.21333rem;
    font-size: 0.26667rem;
    color: #666;
    padding: 0;
  }
}

// 未登录显示的头部区域
.login-register {
  display: flex;
  justify-content: center;
  align-items: center;

  .wrap {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 1.76rem;
      height: 1.76rem;
    }

    span {
      font-size: 0.37333rem;
      color: #fff;
      margin-top: 0.13333rem;
    }
  }
}

// 主题区域
main {
  .gird {
    .icon-shoucang {
      color: #eb5253;
      font-size: 0.6rem;
    }

    .icon-lishi {
      color: #ff9d1d;
      font-size: 0.6rem;
    }
  }

  .link {
    margin: 10px 0;
  }
}

.goLogin {
  color: red;
}
</style>