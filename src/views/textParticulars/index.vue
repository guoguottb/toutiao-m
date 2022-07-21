<template>
  <div style="padding-top: 46px">
    <van-nav-bar
      title="黑马头条"
      left-arrow
      @click-left="$router.back()"
      class="nav-bar"
      fixed
    />
    <div class="main">
      <h5 class="keywords">关键字</h5>
      <!--  -->
      <div class="authorInfo">
        <div class="head_portrait">
          <van-image
            round
            width="1rem"
            height="1rem"
            :src="textParticulars.aut_photo"
            class="myImg"
          />
        </div>
        <div class="authorName">
          <div class="authorname">{{ textParticulars.aut_name }}</div>
          <div class="release_time">{{ timeNow }}</div>
        </div>
        <div class="ttention_button">
          <van-button type="info" round class="attention">关注</van-button>
        </div>
      </div>
      <!-- html文章文本 -->
      <div style="width: 10rem margin:none">
        <div v-html="textParticulars.content" class="texts"></div>
      </div>
      <!-- 正文结束分割线 -->
      <van-divider>正文结束</van-divider>
    </div>
  </div>
</template>

<script>
// API
import dayjs from "dayjs";
import { getNewsDetails } from "@/apis";
export default {
  data() {
    return {
      textId: localStorage.getItem("textId"),
      textParticulars: {},
      timeNow: "",
    };
  },
  methods: {
    async getNewsDetails() {
      try {
        const res = await getNewsDetails(this.textId);
        this.textParticulars = res.data.data;
        this.timeNow =
          dayjs().format("YYYY") -
          +dayjs(this.textParticulars.pubdate).format("YYYY") +
          " 年前";
        console.log(this.textParticulars);
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getNewsDetails();
  },
};
</script>

<style lang="less" scoped>
// navbar
.nav-bar {
  background-color: #4396f8;
  :deep(.van-ellipsis) {
    color: #fff;
  }
  :deep(.van-icon) {
    color: #fff;
  }
}

.keywords {
  padding-left: 40px;
}

.authorInfo {
  width: 100%;
  height: 90px;
  display: flex;
  align-items: center;

  .head_portrait {
    flex: 1;
    display: flex;
    align-items: center;

    .myImg {
      margin-left: 30px;
    }
  }

  .authorName {
    flex: 3;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    line-height: 45px;
    padding-left: 20px;

    .authorname {
      font-size: 0.32rem;
    }

    .release_time {
      font-size: 0.30667rem;
      color: #b7b7b7;
    }
  }

  .ttention_button {
    flex: 3;
    display: flex;
    justify-content: flex-end;

    .attention {
      width: 165px;
      height: 56px;
      margin-right: 30px;
    }
  }
}

.texts {
  padding: 0.73333rem 0.42667rem;
  -webkit-text-size-adjust: 100%;
  color: #24292e;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
  font-size: 0.21333rem;
  line-height: 1.5;
  word-wrap: break-word;
}
</style>