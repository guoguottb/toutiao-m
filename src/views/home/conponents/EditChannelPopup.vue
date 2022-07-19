<template>
  <div>
    <!-- 底部弹出层 -->
    <van-popup
      v-model="isShow"
      position="bottom"
      :style="{ height: '90%' }"
      closeable
      close-icon-position="top-left"
    >
      <!-- tabs 区域 -->
      <div class="popupMain">
        <!-- 我的频道区域 -->
        <div class="myChannel">
          <!-- 标题栏 -->
          <van-cell title="我的频道">
            <van-button
              size="small"
              round
              class="Edit-btn"
              @click="isEdit = !isEdit"
              >{{ isEdit ? "完成" : "编辑" }}</van-button
            >
          </van-cell>
          <!-- tabs 栏 -->
          <van-grid :border="false" gutter="10px">
            <van-grid-item
              :text="item.name"
              v-for="(item, index) in myChannels"
              :key="item.id"
              :class="{ active: item.name === '推荐' }"
              @click="delTab(item, index)"
            >
              <template #icon class="iconFather">
                <van-icon
                  name="cross"
                  class="icon-cross"
                  v-show="isEdit && item.name !== '推荐'"
                />
              </template>
            </van-grid-item>
          </van-grid>
        </div>
        <!-- 推荐频道 -->
        <div class="recommend">
          <!-- 标题栏 -->
          <van-cell title="推荐频道"> </van-cell>
          <!-- tabs 栏 -->
          <van-grid
            direction="horizontal"
            :column-num="4"
            :border="false"
            gutter="10px"
          >
            <van-grid-item
              icon="plus"
              :text="item.name"
              v-for="item in racommendChannels"
              :key="item.id"
              @click="addTab(item)"
            />
          </van-grid>
        </div></div
    ></van-popup>
  </div>
</template>

<script>
// 引入API
import { getAllChannels } from "@/apis";
export default {
  // 数据
  data() {
    return {
      isShow: false,
      allChannels: [],
      isEdit: false,
    };
  },
  // 父向子 传参
  props: {
    myChannels: {
      type: Array,
      required: true,
      default: () => {
        [];
      },
    },
  },
  // 方法
  methods: {
    async getAllChannels() {
      const res = await getAllChannels();
      this.allChannels = res.data.data.channels;
      console.log(this.allChannels);
    },
    // 在我的频道中 添加/移出tab
    delTab(item, index) {
      // item.name !== 推荐， 并且 isEdit 为 true 时候删除tab
      if (this.isEdit && item.name !== "推荐") {
        this.$emit("delTab", item.id);
      }
      // 如果 不处于编辑状态
      if (!this.isEdit) {
        // 挂壁弹出层
        this.isShow = false;
        // 切换父组件中的active
        this.$emit("changeTab", index);
      }
    },
    // 点击添加推荐频道里的tab
    addTab(item) {
      // 如果 isEdit 为true 则允许操作
      if (this.isEdit) {
        // 在父组件中的我的频道列表中 push 这个对象 进而影响这个子组件的视图  计算属性 allChannels 也会影响
        this.$emit("addTab", { ...item });
      }
    },
  },
  // 创建后
  created() {
    this.getAllChannels();
  },
  // 计算属性
  computed: {
    // 所有频道列表 减去 用户频道
    racommendChannels() {
      return this.allChannels.filter((item) => {
        return !this.myChannels.find((i) => i.id === item.id);
      });
    },
  },
};
</script>

<style lang="less" scoped>
//
.active {
  :deep(.van-grid-item__text) {
    color: #ff69b4;
  }
}

.myChannel {
  padding-top: 100px;

  .Edit-btn {
    padding: 0 30px;
    height: 46px;
    line-height: 46px;
    color: red;
    border: 1px solid red;
  }

  :deep(.van-grid-item__content--center) {
    background-color: #eee;
  }
  .van-grid-item__icon-wrapper {
    position: relative;

    .icon-cross {
      position: absolute;
      left: 64px;
      top: -38px;
      font-size: 26px;
      border-radius: 50%;
      border: 1px solid black;
    }
  }

  :deep(.van-grid-item__content) {
    height: 1.14667rem;
  }
}
:deep(.van-grid-item__content--center) {
  background-color: #eee;
  height: 1.14667rem;

  // 所有分类名字的大小
  span {
    font-size: 0.32rem;
  }

  // 所有的icon图标的 字体大小
  .van-icon {
    font-size: 36px;
  }
}

// .firstItem {
//   color: #ff69b4;
// }
</style>