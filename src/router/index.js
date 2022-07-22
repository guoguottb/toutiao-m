import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: () => import("@/views/login"),
  },
  {
    path: "/",
    component: () => import("@/views/Layout"),
    // 重定向
    redirect: "/ ",
    name: "layout",
    children: [
      {
        path: "/ ",
        component: () => import("@/views/home"),
        name: "home",
      },
      {
        path: "/video",
        component: () => import("@/views/video"),
        name: "video",
      },
      {
        path: "/qa",
        component: () => import("@/views/qa"),
        name: "qa",
      },
      {
        path: "/profile",
        component: () => import("@/views/my"),
        name: "profile",
      },
    ],
  },
  {
    path: "*",
    component: () => import("@/views/404"),
  },
  {
    path: "/search",
    component: () => import("@/views/search"),
  },
  // 编辑用户信息的页面
  {
    path: "/userinfo",
    component: () => import("@/views/userInfo"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
