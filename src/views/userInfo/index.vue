<template>
  <div>
    <van-button
      type="primary"
      text="显示遮罩层"
      @click="show = true"
      style="display: none"
    />
    <van-overlay
      lay
      :show="show"
      @click="show = false"
      class="mask"
      v-if="show"
    >
      <img class="photoImg" :src="photo" alt="" ref="img" />
      <span @click="confirm" class="confirm-message">完成</span>
      <span class="cancel" @click="show = false">取消</span>
    </van-overlay>
    <input type="file" ref="file" style="display: none" @change="updataPhoto" />
    <van-nav-bar
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
      class="nav-bar"
    />
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <template #default>
        <van-image round width="0.8rem" height="0.8rem" :src="userInfo.photo" />
      </template>
    </van-cell>
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
import { getPersonalData, editUserInfo, updateUserPhoto } from "@/apis";
import dayjs from "@/utils/dayjs";
import "@/assets/icon-font/iconfont.css";
import Cropper from "cropperjs";
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
      photo: "",
      show: false,
      cropper: "",
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
        // 关闭弹框
        this.userGender = false;
        // 轻提示
        this.$toast.success("修改成功");
      } catch (error) {
        console.log(error);
        this.userGender = false;
        this.$toast.fail("修改失败");
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
    // 更新头像
    updataPhoto(e) {
      let file = e.target.files[0];
      const fs = new FileReader();
      fs.readAsDataURL(file);
      fs.onload = (event) => {
        this.photo = event.target.result;
        this.$nextTick(() => {
          // 裁剪框
          const img = this.$refs.img;
          this.cropper = new Cropper(img, {
            viewMode: 1, // 只能在裁剪的图片范围内移动
            dragMode: "move", // 画布和图片都可以移动
            aspectRatio: 1, // 裁剪区默认正方形
            autoCropArea: 1, // 自动调整裁剪图片
            cropBoxMovable: true, // 是否禁止裁剪区移动
            cropBoxResizable: true, // 是否禁止裁剪区缩放
            background: false, // 关闭默认背景
          });
        });
      };
      this.show = true;
      // 相同文件 二次change 不生效
      e.target.value = "";
    },
    // 头像裁剪完成按钮
    confirm() {
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        const fm = new FormData();
        try {
          fm.append("photo", blob);
          const res = await updateUserPhoto(fm);
          console.log(res);
          this.userInfo.photo = res.data.data.photo;
          // 轻提示
          this.$toast.success("更新头像成功");
        } catch (error) {
          console.log(error);
          this.$toast.fail("上传头像失败，请稍后重试");
        }
      });
    },
  },
  // 创建后
  created() {
    this.getPersonalData();
  },
  // 挂载后
  mounted() {},
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
.van-overlay {
  z-index: 999999;
}

.over {
  z-index: 9999999999;
}

.confirm-message {
  position: fixed;
  bottom: 100px;
  left: 0;
  color: #fff;
}

:deep(.cropper-container) {
  width: 100% !important;
  height: 100% !important;
}

:deep(.cropper-face) {
  width: 100% !important;
}
.photoImg {
  position: fixed;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 100vw;
  height: 100vw;
}

.cancel {
  position: fixed;
  right: 0;
  bottom: 100px;
  color: #fff;
}
</style>