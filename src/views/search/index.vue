<template>
  <div>
    <!-- 顶部搜索框 -->
    <form action="/">
      <van-search
        v-model.trim="keywords"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="visibleSearchSuggestion"
        class="search"
      />
    </form>
    <!-- 组件 -->
    <component
      :is="computedName"
      :keywords="keywords"
      :searchList="searchList"
      @delFn="delFn"
      @delAll="delAll"
      @goResults="goResults"
    ></component>
  </div>
</template>

<script>
// 引入组件
import searchHistory from "@/views/search/components/searchHistory";
import searchResult from "@/views/search/components/searchResult";
import searchSuggestion from "@/views/search/components/searchSuggestion";
export default {
  name: "Search",
  data() {
    return {
      keywords: "",
      isShowSearchSuggestion: false,
      // 搜索历史 所需要渲染的数组
      searchList: JSON.parse(localStorage.getItem("searchList")) || [],
    };
  },
  methods: {
    // 搜索框 回车按钮
    onSearch() {
      // 按下回车按钮需要发送请求渲染 搜索结果
      let key = this.keywords;
      if (!this.searchList.includes(key)) {
        // 如果keywords有值的情况下按下了回车键 这push到搜索建议里面
        this.searchList.unshift(key);
        localStorage.setItem("searchList", JSON.stringify(this.searchList));
      }
      this.isShowSearchSuggestion = true;
    },
    // 顶部搜索框 取消按钮
    onCancel() {
      this.$router.go(-1);
    },
    visibleSearchSuggestion() {
      this.isShowSearchSuggestion = false;
    },
    // 删除某个搜索建议
    delFn(value) {
      this.searchList = this.searchList.filter((item) => item !== value);
    },
    // 删除所有的搜索历史
    delAll() {
      this.searchList = [];
    },
    //
    goResults(value) {
      this.keywords = value;
      this.onSearch();
    },
  },
  components: {
    searchHistory,
    searchResult,
    searchSuggestion,
  },
  //  计算属性
  computed: {
    computedName() {
      if (!this.keywords.trim()) {
        return "searchHistory";
      }
      if (this.isShowSearchSuggestion) {
        return "searchResult";
      }

      return "searchSuggestion";
    },
  },
};
</script>

<style lang="less" scoped>
.search {
  background-color: #4396f8;
  [role="button"] {
    color: #fff;
  }
}
</style>