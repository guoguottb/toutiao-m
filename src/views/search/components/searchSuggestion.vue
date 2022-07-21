<template>
  <div>
    <van-cell
      v-for="(item, index) in highLightData"
      :key="index"
      @click="goResults(index)"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
      <template #icon>
        <van-icon name="search" class="search-icon" />
      </template>
    </van-cell>
  </div>
</template>

<script>
// 引入Api
import { getSearchSuggestions } from "@/apis";
export default {
  name: "searchSuggestions",
  data() {
    return {
      searchSuggestions: [],
    };
  },
  props: {
    keywords: {
      type: String,
    },
    computedName: {
      type: String,
    },
  },
  methods: {
    // 获取用户建议数据 和 处理数据
    async getSearchSuggestions() {
      try {
        const res = await getSearchSuggestions(this.keywords);
        if (!res.data.data.options.length) {
          this.$toast.fail("暂无搜索建议");
        }
        this.searchSuggestions = res.data.data.options.filter(Boolean);
      } catch (error) {
        console.log(error);
      }
    },
    // 跳转到搜索结果
    goResults(index) {
      let value = this.searchSuggestions[index];
      this.$emit("goResults", value);
    },
  },
  watch: {
    keywords: {
      immediate: true,
      handler() {
        this.getSearchSuggestions();
      },
    },
  },
  computed: {
    highLightData() {
      // 定义正则匹配 keywords
      const reg = new RegExp(this.keywords, "ig");
      return this.searchSuggestions.map((item) => {
        return item.replace(
          reg,
          (match) => `<span style="color:red">${match}</span>`
        );
      });
    },
  },
};
</script>

<style lang="less" scoped>
.search-icon {
  padding: 10px;
}
</style>