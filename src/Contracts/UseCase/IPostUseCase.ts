import {
  IGETListPostResponse,
  IPOSTCreatePostResponse,
} from "@/Contracts/Response/IPostsResponse";

export interface IPostUseCase {
  getPosts: (page: number) => Promise<IGETListPostResponse>;
  createPost: (data: FormData) => Promise<IPOSTCreatePostResponse>;
}
