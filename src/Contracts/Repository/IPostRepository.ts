import {
  ISearchPostRequest,
  IValidatePostRequest,
} from "@/Contracts/Requests/IPostRequest";
import {
  IGETListPostResponse,
  IGETDetailPostResponse,
  IPOSTCreatePostResponse,
  IPOSTValidatePostResponse,
  IGETRequestValidatePostResponse,
} from "../Response/IPostsResponse";
export interface IPostRepository {
  getPosts(page: number, user_id?: number): Promise<IGETListPostResponse>;
  searchPost(data: ISearchPostRequest): Promise<IGETListPostResponse>;
  createPost<T>(data: FormData): Promise<IPOSTCreatePostResponse>;
  getDetailPost<T>(post_id: string): Promise<IGETDetailPostResponse>;
  requestValidatePost<T>(
    post_id: string
  ): Promise<IGETRequestValidatePostResponse>;
  validatePost(
    jsonData: IValidatePostRequest
  ): Promise<IPOSTValidatePostResponse>;
}
