import axios from "axios";
//创建一个axios实例对象
const request = axios.create({
  baseURL: "http://toutiao.itheima.net",
  //设置请求超时
  timeout: 10000,
});
export default request;
