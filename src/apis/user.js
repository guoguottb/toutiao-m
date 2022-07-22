import request from "@/utils/request";
// 引入 获取token的方法
import store from "@/store";

/**
 *
 * @param {String} mobile 用户登录手机号
 * @param {String} code     用户登录验证码
 * @returns
 */

export const login = (mobile, code) => {
  return request({
    method: "POST",
    url: "/v1_0/authorizations",
    data: { mobile, code },
  });
};

/**
 * 发送验证码
 * @param {String} mobile 手机号
 * @returns Promise
 */

//   /v1_0/sms/codes/:mobile
export const sendCode = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`,
  });
};

// 登录成功之后 获取用户信息
export const getUserInfo = () => {
  return request({
    url: "/v1_0/user",
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
 *  取消关注用户
 * @param {String} target 目标用户（被取消关注的用户id）
 */
export const cancelFollowing = (target) => {
  return request({
    url: `/v1_0/user/followings/${target}`,
    method: "DELETE",
  });
};
