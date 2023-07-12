import { IPostRepository } from "@/Contracts/Repository/IPostRepository";
import { IGETListPostResponse } from "@/Contracts/Response/IPostsResponse";
import { ISearchPostRequest } from "@/Contracts/Requests/IPostRequest";

interface ISearchPostUseCase {
  invoke: (data: ISearchPostRequest) => Promise<IGETListPostResponse>;
}

export class SearchPostUseCase implements ISearchPostUseCase {
  private postRepo: IPostRepository;

  constructor(_postRepo: IPostRepository) {
    this.postRepo = _postRepo;
  }

  public invoke(data: ISearchPostRequest): Promise<IGETListPostResponse> {
    return this.postRepo.searchPost(data);
  }
}
