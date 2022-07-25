import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "cropperjs/dist/cropper.css";
//引入字体图标css

//引入vant组件
import Vant from "vant";
import "vant/lib/index.css";
Vue.use(Vant);

//引入flexible
import "amfe-flexible/index.min.js";

// 格式化时间的插件
import dayjs from "dayjs";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
