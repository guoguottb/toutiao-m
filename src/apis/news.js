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

/**
 * 收藏文章
 * @param {String} target 收藏的目标文章id
 * @returns Promise
 */
export const collectionOfArticles = (target) => {
  return request({
    url: "/v1_0/article/collections",
    method: "POST",
    data: {
      target,
    },
  });
};

/**
 * 取消收藏文章
 * @param {String} target 取消收藏的文章
 * @returns promise
 */
export const cancelCollection = (target) => {
  return request({
    url: `/v1_0/article/collections/${target}`,
    method: "DELETE",
  });
};

/**
 * 对文章点赞
 * @param {String} target 点赞的文章id
 * @returns promise
 */
export const likeArticle = (target) => {
  return request({
    url: "/v1_0/article/likings",
    method: "POST",
    data: {
      target,
    },
  });
};

/**
 * 取消对文章点赞
 * @param {String} target 文章id
 * @returns Promise
 */
export const cancelLick = (target) => {
  return request({
    url: `/v1_0/article/likings/${target}`,
    method: "DELETE",
  });
};
