import request from "@/utils/request";

/**
 *  获取文章新闻推荐
 * @param {*} channelId  新闻列表的id 用来获取对应的数据
 * @param {*} timestamp   时间戳
 * @returns
 */

export const getArticleList = (channelId, timestamp) => {
  return request({
    url: "/v1_0/articles",
    params: {
      channel_id: channelId,
      timestamp,
    },
  });
};

/**
 *  获取新闻详情
 * @param {String} newsId
 * @returns
 */
export const getNewsDetails = (newsId) => {
  return request({
    url: `/v1_0/articles/${newsId}`,
  });
};
