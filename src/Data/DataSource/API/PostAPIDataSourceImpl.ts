import { IPostDataSource } from "@/Contracts/DataSource/IPostDataSource";
import request from "@/Api/request";
import { isAxiosError } from "axios";
import { POST_END_POINT } from "@/Api/LIST_END_POINT";
import {
  IValidatePostRequest,
  ISearchPostRequest,
} from "@/Contracts/Requests/IPostRequest";
import {
  IGETDetailPostResponse,
  IGETListPostResponse,
  IGETRequestValidatePostResponse,
  IPOSTValidatePostResponse,
  IPOSTCreatePostResponse,
} from "@/Contracts/Response/IPostsResponse";

export default class PostDataSourceImpl implements IPostDataSource {
  private static instance: PostDataSourceImpl;

  public static getInstance(): PostDataSourceImpl {
    if (!PostDataSourceImpl.instance) {
      PostDataSourceImpl.instance = new PostDataSourceImpl();
    }
    return PostDataSourceImpl.instance;
  }

  public async getPosts(
    page: number,
    user_id?: number
  ): Promise<IGETListPostResponse> {
    try {
      const r = await request.get<IGETListPostResponse>(
        POST_END_POINT.GET_LIST_POST(page, user_id)
      );

      return r;
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        return err.response?.data;
      }
      throw err;
    }
  }

  public async searchPost(
    data: ISearchPostRequest
  ): Promise<IGETListPostResponse> {
    try {
      const r = await request.get<IGETListPostResponse>(
        POST_END_POINT.GET_SEARCH_POST(data.limit, data.searchText)
      );

      return r;
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        return err.response?.data;
      }
      throw err;
    }
  }

  public async createPost(data: FormData): Promise<IPOSTCreatePostResponse> {
    try {
      const r = await request.post<IPOSTCreatePostResponse>(
        POST_END_POINT.POST_CREATE_POST,
        data
      );

      return r;
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        return err.response?.data;
      }
      throw err;
    }
  }

  public async requestValidatePost(
    post_id: string
  ): Promise<IGETRequestValidatePostResponse> {
    try {
      const r = await request.get<IGETRequestValidatePostResponse>(
        POST_END_POINT.GET_REQUEST_VALIDATE_POST(post_id)
      );

      return r;
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        return err.response?.data;
      }
      throw err;
    }
  }

  public async validatePost(
    jsonData: IValidatePostRequest
  ): Promise<IPOSTValidatePostResponse> {
    try {
      const r = await request.post<IPOSTValidatePostResponse>(
        POST_END_POINT.POST_VALIDATE_POST,
        jsonData
      );

      return r;
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        return err.response?.data;
      }
      throw err;
    }
  }

  public async getDetailPost(
    post_id: string | number
  ): Promise<IGETDetailPostResponse> {
    try {
      const r = await request.get<IGETDetailPostResponse>(
        POST_END_POINT.GET_FIND_POST(post_id)
      );

      return r;
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        return err.response?.data;
      }
      throw err;
    }
  }
}
