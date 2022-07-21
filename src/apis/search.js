import request from "@/utils/request";

/**
 * 获取联想建议（自动补全
 * @param {String} q 搜索关键词 必传项
 * @returns Promise
 */
export const getSearchSuggestions = (q) => {
  return request({
    url: "/v1_0/suggestion",
    params: {
      q,
    },
  });
};

/**
 *  获取搜索结果
 * @param {String} q 搜索关键词 必传项
 * @returns Promise
 */
export const getSearchResults = (q, page) => {
  return request({
    url: "/v1_0/search",
    params: {
      q,
      per_page: 20,
      page,
    },
  });
};
