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
    <EditChannelPopup
      ref="popup"
      :myChannels="channelList"
      @delTab="delTab"
      @addTab="addTab"
      @changeTab="changeTab"
    ></EditChannelPopup>
  </div>
</template>

<script>
// API
import {
  getChannels,
  setChannelsToLocal,
  getChannelsFromLocal,
  delMyChannel,
  addMyChannel,
} from "@/apis";
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
        // 如果本地没有token
        if (!this.isLogin) {
          console.log("用户没有登录");
          const channels = getChannelsFromLocal();
          // 两种情况
          // 1. 本地存储的有数据
          if (channels) {
            this.channelList = channels;
          }
          // 2. 本地存储的没有数据，这发送请求 取默认数据
          else {
            console.log("发送网络请求了");
            const {
              data: {
                data: { channels },
              },
            } = await getChannels();
            this.channelList = channels;
          }
        } // 如果用户处于登录的情况，这根据用户的信息 发送请求返回数据
        else {
          console.log("发送网络请求了");
          const {
            data: {
              data: { channels },
            },
          } = await getChannels();
          this.channelList = channels;
        }
      } catch (error) {
        console.log(error);
        this.$toast.fail("请从新获取频道列表");
      }
    },
    // 底部弹框显示按钮
    changeShow() {
      this.$refs.popup.isShow = true;
    },
    // 删除channel
    async delTab(id) {
      this.channelList = this.channelList.filter((item) => item.id !== id);
      // 如果用户处于没有登录的情况  需要存储数据到本地
      if (!this.isLogin) {
        setChannelsToLocal(this.channelList);
      }
      // 用户处于登录的状况
      else {
        try {
          const res = await delMyChannel(id);
          console.log(res);
        } catch (error) {
          return this.$toast.fail("删除失败，请重试");
        }
      }
      this.$toast.success("删除频道成功");
    },
    // 添加channel
    async addTab(item) {
      this.channelList.push(item);
      // 如果用户处于未登录的情况
      if (!this.isLogin) {
        setChannelsToLocal(this.channelList);
      } else {
        try {
          console.log(item, item.id, this.channelList.length);
          const res = await addMyChannel(item.id, this.channelList.length);
          console.log(res);
        } catch (error) {
          return this.$toast.fail("添加频道失败，请重试");
        }
      }
      this.$toast.success("添加成功");
    },
    // 根据子组件传来的索引下标 来切换active 的值
    changeTab(index) {
      this.active = index;
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
  computed: {
    isLogin() {
      // 根据本地是否存储token 来返回一个布尔值  有这true else false
      return !!this.$store.state.user.token;
    },
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