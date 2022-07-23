import request from "@/utils/request";

/**
 * 获取评论或评论回复
 * @param {Object} data
 * @returns
 */
export const getComments = (data) => {
  return request({
    url: "/v1_0/comments",
    params: data,
  });
};

/**
 * 对文章或者评论进行评论
 * @param {Object} data
 * @returns Promise
 */
export const publishComment = (data) => {
  return request({
    url: "/v1_0/comments",
    method: "POST",
    data,
  });
};

/**
 * 对评论或评论回复点赞
 * @param {String} target 点赞的评论id
 * @returns promise
 */
export const lickComment = (target) => {
  return request({
    url: "/v1_0/comment/likings",
    method: "POST",
    data: {
      target,
    },
  });
};

/**
 *  取消对评论或评论回复点赞
 * @param {String} target 要取消点赞的评论id或评论回复id
 * @returns
 */
export const cancelLickComment = (target) => {
  return request({
    url: `/v1_0/comment/likings/${target}`,
    method: "DELETE",
  });
};

/**
 * 关注用户
 * @param {String} arget 关注用户的id
 * @returns Promise
 */
export const attentionAuthor = (target) => {
  return request({
    url: "/v1_0/user/followings",
    method: "POST",
    data: {
      target,
    },
  });
};

/**
 *  取消关注用户
 * @param {String} target 目标用户（被取消关注的用户id）
 */
export const cancelFollowing = (target) => {
  return request({
    url: `/v1_0/user/followings/${target}`,
    method: "DELETE",
  });
};
