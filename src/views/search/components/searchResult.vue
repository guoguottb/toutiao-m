<template>
  <div style="width: 100%; height: 750px; background-color: #F5F7F9">
    <!-- 渲染搜索结果 -->
    <van-cell-group>
      <van-cell
        :title="item.title"
        v-for="item in searchResults"
        :key="item.art_id"
      />
      <van-cell :value="clickShow" class="bottomText" @click="addResults" />
    </van-cell-group>
  </div>
</template>

<script>
// API
import { getSearchResults } from "@/apis";
export default {
  name: "SearchResults",
  data() {
    return {
      searchResults: [],
      clickShow: "请求失败，请重新加载",
      // '加载中...'
      page: 1,
    };
  },
  props: {
    keywords: {
      // 传入关键词的类型
      type: String,
      // 必传参数
      required: true,
    },
  },
  methods: {
    // 进入页面获取搜索结果
    async getSearchResults() {
      try {
        const res = await getSearchResults(this.keywords);
        console.log(res);
        //存储页数
        this.page = res.data.data.page;
        // 存储结果
        this.searchResults = res.data.data.results;
      } catch (error) {
        console.log(error);
      }
    },
    // 获取更多的搜索结果
    async addResults() {
      if (this.clickShow !== "请求失败，请重新加载") {
        return;
      }
      try {
        // 让其文字显示位加载中
        this.clickShow = "加载中...";

        // 发送请求获取更多的数据
        let n = this.page + 1;
        // 发请求获取结果
        const res = await getSearchResults(this.keywords, n);
        let data = res.data.data;
        // 如果返回来的有数据  修改page 数组追加数据
        if (data.results.length) {
          console.log(data);
          // 存储页码
          this.page = data.page;
          // 追加数据
          this.searchResults.push(...data.results);
          this.clickShow = "请求失败，请重新加载";
        } else {
          return (this.clickShow = "没有更多");
        }
      } catch (error) {
        console.log(res);
        this.clickShow = "请求失败，请重新加载";
      }
      //  finally {
      //   // 让其 加载中 变回 请求失败
      // }
    },
  },
  created() {
    this.getSearchResults();
  },
};
</script>

<style lang="less" scoped>
.bottomText {
  background-color: rgb(245, 247, 249);
  border: 0;
  div {
    text-align: center;
    color: #969799;
  }
}
</style>