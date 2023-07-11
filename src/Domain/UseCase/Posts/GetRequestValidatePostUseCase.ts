import { IPostRepository } from "@/Contracts/Repository/IPostRepository";
import { IGETRequestValidatePostResponse } from "@/Contracts/Response/IPostsResponse";

interface IRequestValidatePostUseCase {
  invoke: (post_id: string) => Promise<IGETRequestValidatePostResponse>;
}

export class RequestValidatePostUseCase implements IRequestValidatePostUseCase {
  private postRepo: IPostRepository;

  constructor(_postRepo: IPostRepository) {
    this.postRepo = _postRepo;
  }

  public invoke(post_id: string): Promise<IGETRequestValidatePostResponse> {
    return this.postRepo.requestValidatePost(post_id);
  }
}
