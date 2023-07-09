import {
  IGETListPostResponse,
  IPOSTCreatePostResponse,
  IGETRequestValidatePostResponse,
} from "@/Contracts/Response/IPostsResponse";
import { IValidatePostRequest } from "@/Contracts/Requests/IPostRequest";

export interface IPostUseCase {
  getPosts: (page: number) => Promise<IGETListPostResponse>;
  createPost: (data: FormData) => Promise<IPOSTCreatePostResponse>;
  requestValidatePost: (
    post_id: string
  ) => Promise<IGETRequestValidatePostResponse>;
  validatePost: (jsonData: IValidatePostRequest) => Promise<any>;
}
