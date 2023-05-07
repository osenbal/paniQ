import { setCookie, getCookie, deleteCookie, updateCookie } from "./Cookie";

export const getAccessToken = (): string => {
  const name = "accessToken=";
  return getCookie(name);
};

export const getRefreshToken = (): string => {
  const name = "refreshToken=";
  return getCookie(name);
};

export const setAccessToken = (value: string, expires: number) => {
  setCookie("accessToken", value, expires);
};

export const setRefreshToken = (value: string, expires: number) => {
  setCookie("refreshToken", value, expires);
};

export const deleteAccessToken = () => {
  deleteCookie("accessToken");
};

export const deleteRefreshToken = () => {
  deleteCookie("refreshToken");
};

export const updateAccessToken = (value: string, expires: number) => {
  updateCookie("accessToken", value, expires);
};

export const updateRefreshToken = (value: string, expires: number) => {
  updateCookie("refreshToken", value, expires);
};
