<template>
  <div>
    <!-- 顶部搜索框 -->
    <form action="/">
      <van-search
        v-model="keywords"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="visibleSearchSuggestion"
        class="search"
      />
    </form>
    <!-- 组件 -->
    <component :is="computedName" :keywords="keywords"></component>
    <!-- 搜索历史 -->
    <!-- <searchHistory></searchHistory> -->
    <!-- 搜索结果 -->
    <!-- <searchResult></searchResult> -->
    <!-- 搜索建议 -->
    <!-- <searchSuggestion></searchSuggestion> -->
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
    };
  },
  methods: {
    onSearch() {
      this.isShowSearchSuggestion = true;
    },
    onCancel() {
      this.$router.go(-1);
    },
    visibleSearchSuggestion() {
      this.isShowSearchSuggestion = false;
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