// 封装本地储存
// class 三大特性  封装 继承 多态
class Storage {
  set(key, value) {
    if (typeof value === "object") {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  }
  get(key) {
    // 获取value 判断是否为json对象
    const value = localStorage.getItem(key);
    try {
      // 如果是JSON对象 将其转化为 普通对象
      return JSON.parse(value);
    } catch {
      // 上方报错进入catch 说明是简单字符串
      return value;
    }
  }
  remove(key) {
    localStorage.removeItem(key);
  }
}
const storage = new Storage();
export default storage;
