import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    //重定向
    redirect: "/home",
  },
  {
    path: "/login",
    component: () => import("@/views/login"),
  },
  {
    path: "/",
    component: () => import("@/views/Layout"),
    name: "layout",
    children: [
      {
        path: "/home",
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
];

const router = new VueRouter({
  routes,
});

export default router;
