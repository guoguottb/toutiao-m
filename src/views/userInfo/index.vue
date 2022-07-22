<template>
  <div>
    <van-nav-bar
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
      class="nav-bar"
    />
    <van-cell title="头像" is-link value="内容" />
    <van-cell
      title="昵称"
      is-link
      :value="userInfo.name"
      @click="showUserMobile"
    />
    <van-cell
      title="性别"
      is-link
      :value="columns[userInfo.gender]"
      @click="userGender = true"
    />
    <van-cell
      title="生日"
      is-link
      :value="userInfo.birthday"
      @click="UserBirthday = true"
    />
    <!-- 昵称弹出层 -->
    <van-popup
      v-model="userMobile"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <van-nav-bar
        title="更新昵称"
        left-text="取消"
        right-text="保存"
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
      <van-field
        v-model="mobile"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
    </van-popup>
    <!-- 性别弹出层 -->
    <van-popup
      v-model="userGender"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <van-picker
        show-toolbar
        title="更新性别"
        :columns="columns"
        :default-index="userInfo.gender"
        @cancel="userGender = false"
        @confirm="affirmGender"
    /></van-popup>
    <!-- 出生年月日弹出层 -->
    <van-popup
      v-model="UserBirthday"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="UserBirthday = false"
        @confirm="affirmBirthday"
      />
    </van-popup>
  </div>
</template>

<script>
// API
import { getPersonalData, editUserInfo } from "@/apis";
import dayjs from "@/utils/dayjs";
export default {
  name: "UserInfo",
  data() {
    return {
      // 加载此页面后 用于存储用户的个人信息
      userInfo: [],
      // 昵称框的显示与否
      userMobile: false,
      mobile: "",
      // 性别 弹出框的显示与否
      userGender: false,
      columns: ["男", "女"],
      // 用户的出生年月日弹框的显示与否
      UserBirthday: false,
      // 组件 时间选择器所需要的数据
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(2021, 0, 17),
    };
  },
  // 方法
  methods: {
    async getPersonalData() {
      try {
        const res = await getPersonalData();
        this.userInfo = res.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    // 显示用户昵称的弹出层
    showUserMobile() {
      this.userMobile = true;
      this.mobile = this.userInfo.name;
    },
    // 编辑昵称的取消按钮
    onClickLeft() {
      this.userMobile = false;
    },
    // 编辑昵称的确认按钮
    async onClickRight() {
      try {
        // 发送请求修改昵称
        const res = await editUserInfo({
          name: this.mobile,
        });
        // 修改存储用户信息的变量 从而影响视图
        this.userInfo.name = this.mobile;
        console.log(res);
        // 关闭昵称弹框
        this.userMobile = false;
        this.$toast.success("修改昵称成功");
      } catch (error) {
        console.log(error);
        this.userMobile = false;
        this.$toast.fail("修改昵称失败");
      }
    },
    // 更新性别的确认按钮
    async affirmGender(value, index) {
      try {
        console.log(value, index);
        const res = await editUserInfo({
          gender: value === "男" ? 0 : 1,
        });
        this.userInfo.gender = value === "男" ? 0 : 1;
        console.log(res);
        this.userGender = false;
      } catch (error) {
        console.log(error);
        this.userGender = false;
      }
    },
    // 更新生日的确认按钮
    async affirmBirthday(value) {
      try {
        const birthday = dayjs(value).format("YYYY-MM-DD");
        const res = await editUserInfo({
          birthday: birthday,
        });
        console.log(res);
        // 修改数据 影响视图
        this.userInfo.birthday = birthday;
        this.UserBirthday = false;
        this.$toast.success("更新成功");
      } catch (error) {
        console.log(error);
        this.UserBirthday = false;
        this.$$toast.fail("更新失败");
      }
    },
  },
  // 创建后
  created() {
    this.getPersonalData();
  },
};
</script>

<style lang="less" scoped>
:deep(.nav-bar) {
  background-color: #4396f8;
  .van-ellipsis {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
</style>