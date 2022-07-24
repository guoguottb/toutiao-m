import axios from "axios";
//创建一个axios实例对象
const request = axios.create({
  baseURL: "http://toutiao.itheima.net",
  //设置请求超时
  timeout: 10000,
});

import store from "@/store";

// 配置请求拦截器
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

// 函数清除token
export const removeToken = () => localStorage.removeItem(HEIMA_TOUTIAO_TOKEN);
// 配置响应拦截器
// request.interceptors.response.use(
//   // function (response) {
//   //   // 对响应数据做点什么
//   //   // return response.data;
//   // },
//   function (error) {
//     // 对相应错误做点什么
//     // 对token过期进行统一的处理
//     if (!error.response) {
//       // 如果error信息中没人response，网络超时导致
//       // message.error("网络繁忙，请稍后重试");
//       Toast.fail("网络繁忙，请稍后重试");
//       return error;
//     }
//     console.log(error);
//     if (error.response.status === 401) {
//       // 代表token过期了
//       // 01.删除token
//       removeToken();
//       // 02.提示消息
//       // message.warn("登录信息过期了");
//       Toast.fail("登录信息过期了");
//       // 03.跳转到登录页面
//       history.push("/login");
//     }
//     return error;
//     // return Toast.fail("异常");
//   }
// );

export default request;
