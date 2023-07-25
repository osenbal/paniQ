import {
  IValidatePostRequest,
  ISearchPostRequest,
} from "@/Contracts/Requests/IPostRequest";
import {
  IGETListPostResponse,
  IPOSTCreatePostResponse,
  IGETDetailPostResponse,
  IGETRequestValidatePostResponse,
  IPOSTValidatePostResponse,
} from "../Response/IPostsResponse";
export interface IPostDataSource {
  getPosts(page: number, user_id?: number): Promise<IGETListPostResponse>;
  searchPost(data: ISearchPostRequest): Promise<IGETListPostResponse>;
  createPost(data: FormData): Promise<IPOSTCreatePostResponse>;
  getDetailPost(post_id: string | number): Promise<IGETDetailPostResponse>;

  requestValidatePost(
    post_id: string
  ): Promise<IGETRequestValidatePostResponse>;
  validatePost(
    jsonData: IValidatePostRequest
  ): Promise<IPOSTValidatePostResponse>;
}
