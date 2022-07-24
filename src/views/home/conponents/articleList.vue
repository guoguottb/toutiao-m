<template>
  <div>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onLoad"
      :success-text="reSuccess"
    >
      <div
        v-if="!ArticleList.length"
        class="loadMoer"
        @click="getArticleList()"
      >
        <span>{{ hint }}</span>
      </div>
      <van-list
        v-else
        @load="onLoad"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <ArticleItem
          v-for="item in ArticleList"
          :key="item.art_id"
          :articleInfo="item"
        ></ArticleItem
      ></van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// API
import { getArticleList } from "@/apis";
// 组件
import ArticleItem from "./articleItem.vue";
export default {
  name: "ArticleList",
  data() {
    return {
      ArticleList: [],
      pre_timestamp: "",
      loading: false,
      finished: false,
      error: false,
      refreshing: false,
      reSuccess: "刷新成功",
      hint: "请求失败，点击重新加载",
    };
  },
  props: {
    id: {
      // 接收的类型
      type: [String, Number],
      // 必传项
      required: true,
    },
  },
  // 创建前
  created() {},
  // 方法
  methods: {
    // 获取 处理文章列表
    async getArticleList() {
      try {
        this.hint = "正在加载...";
        const res = await getArticleList(this.id, +new Date());
        this.ArticleList = res.data.data.results;
        this.pre_timestamp = res.data.data.pre_timestamp;
        console.log(this.ArticleList);
      } catch (error) {
        const status = error.response.status;
        if (status === 400) {
          throw new Error(error.response.data.message);
        } else {
          this.hint = "请求失败，点击重新加载";
          this.$toast.fail("获取文章列表失败，请重新刷新");
        }
      }
    },
    // 页面向下滚动/下拉刷新到一定程度触发
    async onLoad() {
      try {
        const res = await getArticleList(this.id, this.pre_timestamp);
        if (!res.data.data.pre_timestamp) {
          this.finished = true;
          this.reSuccess = "暂无更多";
          return;
        }
        if (this.refreshing) {
          this.ArticleList.unshift(...res.data.data.results);
        } else {
          this.ArticleList.push(...res.data.data.results);
        }
        this.pre_timestamp = res.data.data.pre_timestamp;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.error = true;
      } finally {
        // 无论触发 try 或者 catch 就会进入 finally 里面
        this.loading = false;
        this.refreshing = false;
      }
    },
  },
  // 注册组件
  components: {
    ArticleItem,
  },
};
</script>

<style lang="less" scoped>
.loadMoer {
  color: #969799;
  font-size: 0.37333rem;
  line-height: 1.33333rem;
  text-align: center;
}
</style>