// authorization

import storage from "./storage";
const tokenKey = "HEIMA_TOUTIAO_TOKEN";

export const getToken = () => {
  return storage.get(tokenKey);
};
export const setToken = (val) => {
  return storage.set(tokenKey, val);
};
export const removeToken = () => {
  return storage.remove(tokenKey);
};
