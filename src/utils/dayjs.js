import dayjs from "dayjs";
// 配置相对时间
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

// 配置中文包 dayjs 默认的是英语
require("dayjs/locale/zh-cn");
dayjs.locale("zh-cn");

export default dayjs;
