import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//引入字体图标css
import "@/assets/icon-font/iconfont.css";

//引入vant组件
import Vant from "vant";
import "vant/lib/index.css";
Vue.use(Vant);

//引入flexible
import "amfe-flexible/index.min.js";

// 格式化时间的插件
import dayjs from "dayjs";

// 全局过滤器 处理时间
Vue.filter("fromNowDate", (val) => {
  return dayjs(val).fromNow();
});

// 引入文章正文的样式
import "@/assets/markdown/markdown.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
