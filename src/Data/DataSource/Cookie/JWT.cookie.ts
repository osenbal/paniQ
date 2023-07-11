import { setCookie, getCookie, deleteCookie } from "./Cookie";

export const getAccessToken = (): string => {
  const name = "accessToken=";
  return getCookie(name);
};

export const getRefreshToken = (): string => {
  const name = "refreshToken=";
  return getCookie(name);
};

export const getIsAuth = (): boolean => {
  const name = "isAuth=";
  return getCookie(name) === "true";
};

// set cookie access token with default expire 1 minute
export const setAccessToken = (
  value: string,
  expires: string = new Date(Date.now() + 600000).toUTCString()
) => {
  setCookie("accessToken", value, expires);
};

//  set cookie refresh token with default expire 3 days
export const setRefreshToken = (
  value: string,
  expires: string = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toUTCString()
) => {
  setCookie("refreshToken", value, expires);
};

// set is auth cookie with default expire 3 days
export const setIsAuth = (
  value: boolean,
  expires: string = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toUTCString()
) => {
  setCookie("isAuth", value.toString(), expires);
};

export const deleteAccessToken = () => {
  deleteCookie("accessToken");
};

export const deleteRefreshToken = () => {
  deleteCookie("refreshToken");
};

export const deleteIsAuth = () => {
  deleteCookie("isAuth");
};

// export const updateAccessToken = (value: string, expires: number) => {
//   updateCookie("accessToken", value, expires);
// };

// export const updateRefreshToken = (value: string, expires: number) => {
//   updateCookie("refreshToken", value, expires);
// };
