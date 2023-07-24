import {
  IGETListPostResponse,
  IPOSTCreatePostResponse,
  IGETRequestValidatePostResponse,
  IGETDetailPostResponse,
} from "@/Contracts/Response/IPostsResponse";
import { IValidatePostRequest } from "@/Contracts/Requests/IPostRequest";

export interface IPostUseCase {
  getPosts: (page: number, user_id?: number) => Promise<IGETListPostResponse>;
  createPost: (data: FormData) => Promise<IPOSTCreatePostResponse>;
  getDetailPost: (post_id: string | number) => Promise<IGETDetailPostResponse>;
  requestValidatePost: (
    post_id: string
  ) => Promise<IGETRequestValidatePostResponse>;
  validatePost: (jsonData: IValidatePostRequest) => Promise<any>;
}
