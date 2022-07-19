import request from "@/utils/request";

/**
 * 获取用户的频道
 * @returns Promise
 */
export const getChannels = () => {
  return request({
    url: "/v1_0/user/channels",
  });
};

/**
 * 获取所有频道列表
 * @returns Promise
 */
export const getAllChannels = () => {
  return request({
    url: "/v1_0/channels",
  });
};

/**
 *  删除指定用户频道
 * @param {String||Number} target
 * @returns Promise
 */
export const delMyChannel = (target) => {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: "DELETE",
  });
};

/**
 *  设置用户的频道（部分覆盖
 * @param {Number} id  指定添加的id
 * @param {Number} seq   添加到服务器数组的下标哪个位置
 * @returns
 */
export const addMyChannel = (id, seq) => {
  return request({
    url: "/v1_0/user/channels",
    method: "PATCH",
    data: {
      channels: [
        // 添加多个频道可以 以对象的形式继续往下写对象
        {
          id,
          seq,
        },
      ],
    },
  });
};

// 引入方法 存储channelList到本地
import storage from "@/utils/storage";
const HEIMA_TOUTIAO_CHANNELS = "HEIMA_TOUTIAO_CHANNELS";
// 设置 channels到本地存储
export const setChannelsToLocal = (channels) => {
  storage.set(HEIMA_TOUTIAO_CHANNELS, channels);
};
// 获取channels从本地存储
export const getChannelsFromLocal = () => {
  return storage.get(HEIMA_TOUTIAO_CHANNELS);
};
