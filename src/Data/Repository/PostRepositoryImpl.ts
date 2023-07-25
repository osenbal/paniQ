import { IPostDataSource } from "../../Contracts/DataSource/IPostDataSource";
import { IPostRepository } from "@/Contracts/Repository/IPostRepository";
import {
  IGETListPostResponse,
  IGETDetailPostResponse,
  IGETRequestValidatePostResponse,
  IPOSTCreatePostResponse,
  IPOSTValidatePostResponse,
} from "@/Contracts/Response/IPostsResponse";
import { IValidatePostRequest } from "@/Contracts/Requests/IPostRequest";

export class PostRepositoryImpl implements IPostRepository {
  postDataSource: IPostDataSource;

  constructor(_postDataSource: IPostDataSource) {
    this.postDataSource = _postDataSource;
  }

  getPosts(page: number, user_id?: number): Promise<IGETListPostResponse> {
    return this.postDataSource.getPosts(page, user_id);
  }

  searchPost(data: any): Promise<IGETListPostResponse> {
    return this.postDataSource.searchPost(data);
  }

  createPost(data: FormData): Promise<IPOSTCreatePostResponse> {
    return this.postDataSource.createPost(data);
  }

  requestValidatePost(
    post_id: string
  ): Promise<IGETRequestValidatePostResponse> {
    return this.postDataSource.requestValidatePost(post_id);
  }

  validatePost(
    jsonData: IValidatePostRequest
  ): Promise<IPOSTValidatePostResponse> {
    return this.postDataSource.validatePost(jsonData);
  }

  getDetailPost(post_id: string | number): Promise<IGETDetailPostResponse> {
    return this.postDataSource.getDetailPost(post_id);
  }
}
