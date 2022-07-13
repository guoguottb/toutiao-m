import request from "@/utils/request";

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
