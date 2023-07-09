import { IPostDataSource } from "@/Contracts/DataSource/IPostDataSource";
import { getAccessToken } from "@/Data/DataSource/Cookie/JWT.cookie";
import axios from "@/Api/apiInterceptor";
import { POST_END_POINT } from "@/Api/LIST_END_POINT";

export default class PostDataSourceImpl implements IPostDataSource {
  private static instance: PostDataSourceImpl;

  public static getInstance(): PostDataSourceImpl {
    if (!PostDataSourceImpl.instance) {
      PostDataSourceImpl.instance = new PostDataSourceImpl();
    }
    return PostDataSourceImpl.instance;
  }

  getPosts<T>(page: number): Promise<T> {
    return axios
      .get(POST_END_POINT.GET_LIST_POST(page), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }

  createPost<T>(data: FormData): Promise<T> {
    return axios
      .post(POST_END_POINT.POST_CREATE_POST, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }

  requestValidatePost<T>(post_id: string): Promise<T> {
    return axios
      .get(POST_END_POINT.GET_REQUEST_VALIDATE_PASSWORD(post_id), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }
}
