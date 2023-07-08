// API ENDPOINT FOR AUTH
export const AUTH_END_POINT = {
  POST_LOGIN: "/auth/login",
  GET_REFRESH_TOKEN: "/auth/refresh",
};

// API ENDPOINT FOR USER
export const USER_END_POINT = {
  GET_LIST_USER: (limit: number, page: number) =>
    `/user/list?limit=${limit}&page=${page}`,
  PATCH_UPDATE_USER: (user_id: number) => `/user/update/${user_id}`,
  DELETE_USER: (user_id: number) => `/user/delete/${user_id}`,
  POST_RESET_PASSWORD: (reset_token: string) =>
    `/auth/reset-password?reset_token=${reset_token}`,
  POST_REQUEST_CHANGE_PASSWORD: `/auth/change-password/`,
  CURRENT_USER: "/user/current",
};

// API ENDPOINT FOR POST
export const POST_END_POINT = {
  GET_LIST_POST: (page: number) => `/posts/list?page=${page}`,
  DELETE_POST: (post_id: number) => `/posts/delete/${post_id}`,
  PUT_UPDATE_POST: (post_id: number) => `/posts/update/${post_id}`,
  GET_FIND_POST: (post_id: number) => `/posts/find/${post_id}`,
  POST_CREATE_POST: "/posts/",
  GET_SEARCH_POST: (limit: number, keyword: string) =>
    `/posts/s/${keyword}?limit=${limit}`,
  POST_VALIDATE_POST: `/posts/validate/`,
  GET_REQUEST_VALIDATE_PASSWORD: (post_id: string) =>
    `/posts/validate/${post_id}`,
};
