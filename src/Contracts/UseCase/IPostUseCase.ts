import {
  IGETListPostResponse,
  IPOSTCreatePostResponse,
  IGETRequestValidatePostResponse,
} from "@/Contracts/Response/IPostsResponse";

export interface IPostUseCase {
  getPosts: (page: number) => Promise<IGETListPostResponse>;
  createPost: (data: FormData) => Promise<IPOSTCreatePostResponse>;
  requestValidatePost: (
    post_id: string
  ) => Promise<IGETRequestValidatePostResponse>;
}
