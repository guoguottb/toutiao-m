<template>
  <div @click="toParticulars">
    <!-- 没有图片的情况 -->
    <van-cell
      :title="articleInfo.title"
      v-if="articleInfo.cover.type === 0"
      :label="description"
    >
    </van-cell>
    <!-- 一张图片的情况 -->
    <van-cell
      :title="articleInfo.title"
      v-if="articleInfo.cover.type === 1"
      :label="description"
    >
      <!-- 默认插槽 让其图片在右方显示 -->
      <template #default>
        <van-image
          width="3rem"
          height="2rem"
          :src="articleInfo.cover.images[0]"
        />
      </template>
    </van-cell>
    <!-- 三张图片的情况 -->
    <van-cell :title="articleInfo.title" v-if="articleInfo.cover.type === 3">
      <template #label>
        <!-- div 包裹三张图片 -->
        <div>
          <van-image
            width="3rem"
            height="2rem"
            v-for="(item, index) in articleInfo.cover.images"
            :key="index"
            :src="item"
          />
        </div>
        <!-- 作者 发布文章时间信息 -->
        <span>{{ description }}</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import dayjs from "@/utils/dayjs";
export default {
  // 开发者工具组件名
  name: "ArticleItem",
  // 由父级传来的数据
  props: {
    articleInfo: {
      type: Object,
      required: true,
    },
  },
  computed: {
    // 描述信息
    description() {
      const val = this.articleInfo;
      const timeNow = dayjs(val.pubdate).fromNow();
      return `${val.aut_name} ${val.comm_count}评论 ${timeNow}`;
    },
  },
  methods: {
    toParticulars() {
      console.log(11);
    },
  },
  methods: {
    toParticulars() {
      console.log(this.articleInfo);
      //  存储文章id
      localStorage.setItem("textId", this.articleInfo.art_id);
      // 通过路由跳转页面
      this.$router.push("/particulars");
    },
  },
};
</script>

<style>
</style>