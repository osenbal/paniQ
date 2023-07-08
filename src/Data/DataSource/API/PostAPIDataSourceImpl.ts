import { IPostDataSource } from "@/Contracts/DataSource/IPostDataSource";
import { getAccessToken } from "@/Data/DataSource/Cookie/JWT.cookie";
import axios from "@/Api/apiInterceptor";

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
      .get(`/posts/list?page=${page}`, {
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
      .post(`/posts/`, data, {
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
}
