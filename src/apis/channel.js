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
