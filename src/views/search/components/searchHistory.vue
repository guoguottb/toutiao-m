<template>
  <div>
    <van-cell-group>
      <!-- 顶部搜索历史 -->
      <van-cell title="搜索历史">
        <template #default v-if="isShow">
          <van-icon name="delete-o" @click="isShow = !isShow" />
        </template>
        <template #default v-else>
          <span @click="delAll">全部删除&nbsp;&nbsp;</span>
          <span @click="isShow = !isShow">完成</span>
        </template>
      </van-cell>
      <!-- 所需要渲染的搜索历史 -->
      <van-cell
        :title="item"
        v-for="item in searchList"
        :key="item"
        @click="historyGoResults(item)"
      >
        <template #default v-if="isShow"></template>
        <template #default v-else>
          <van-icon name="close" @click="delFn(item)" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
  data() {
    return {
      isShow: true,
    };
  },
  props: {
    // 由父级传来 渲染搜索历史
    searchList: {
      type: Array,
      default: () => {
        [];
      },
    },
  },
  methods: {
    // 删除某个搜索历史
    delFn(item) {
      this.$emit("delFn", item);
    },
    // 删除所有的搜索历史
    delAll() {
      this.$emit("delAll");
      this.isShow = !this.isShow;
    },
    // 根据搜索记录 跳转到查询结果
    historyGoResults(value) {
      this.$emit("goResults", value);
    },
  },
};
</script>

<style lang="less" scoped>
</style>