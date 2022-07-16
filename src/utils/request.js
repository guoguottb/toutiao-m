import axios from "axios";
//创建一个axios实例对象
const request = axios.create({
  baseURL: "http://toutiao.itheima.net",
  //设置请求超时
  timeout: 10000,
});

import store from "@/store";

// 配置相应拦截器
request.interceptors.request.use(
  // 在发送
  (config) => {
    const token = store.state.user.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request;
