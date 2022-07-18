<template>
  <div>
    <!-- 头部搜索框 -->
    <van-search
      v-model="value"
      shape="round"
      background="#4397F8"
      placeholder="请输入搜索关键词"
    />
    <!-- tabs 选项卡  -->
    <van-tabs v-model="active" swipeable>
      <van-tab :title="item.name" v-for="item in channelList" :key="item.id">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>
      <span class="iconfont icon-gengduo" @click="changeShow"></span>
    </van-tabs>
    <!-- 底部弹出层 closeable/是否显示关闭图标 -->
    <EditChannelPopup ref="popup" :myChannels="channelList"></EditChannelPopup>
  </div>
</template>

<script>
// API
import { getChannels } from "@/apis";
// 引入组件
import ArticleList from "./conponents/articleList.vue";
import EditChannelPopup from "@/views/home/conponents/EditChannelPopup";
export default {
  name: "Home",
  data() {
    return {
      active: 0,
      value: "",
      channelList: [],
    };
  },
  // 方法
  methods: {
    async getChannels() {
      try {
        const {
          data: {
            data: { channels },
          },
        } = await getChannels();
        this.channelList = channels;
      } catch (error) {
        console.log(error);
        this.$toast.fail("请从新获取频道列表");
      }
    },
    // 底部弹框显示按钮
    changeShow() {
      this.$refs.popup.isShow = true;
    },
  },
  // 创建后
  created() {
    this.getChannels();
  },
  // 组件
  components: {
    ArticleList,
    EditChannelPopup,
  },
};
</script>

<style lang="less" scoped>
//tabs选项卡
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.icon-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;
  z-index: 999;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url("~@/assets/images/gradient-gray-line.png");
  }
}

// 头部固定的样式
.navbar {
  position: sticky;
  top: 0;
  left: 0;
}
:deep(.van-tabs__wrap) {
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 99;
}
.toutiao-gengduo {
  position: fixed;
  top: 92px;
}

:deep(.van-tabs__content) {
  max-height: calc(100vh - 92px - 82px - 100px);
  overflow: auto;
}
</style>