import { IPostRepository } from "@/Contracts/Repository/IPostRepository";
import { IGETListPostResponse } from "@/Contracts/Response/IPostsResponse";

interface IGetAllPostUseCase {
  invoke: (page: number) => Promise<IGETListPostResponse>;
}

export class GetAllPostUseCase implements IGetAllPostUseCase {
  private postRepo: IPostRepository;

  constructor(_postRepo: IPostRepository) {
    this.postRepo = _postRepo;
  }

  public invoke(page: number): Promise<IGETListPostResponse> {
    return this.postRepo.getPosts(page);
  }
}
