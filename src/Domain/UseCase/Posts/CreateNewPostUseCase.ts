import { IPostRepository } from "@/Contracts/Repository/IPostRepository";
import { IPOSTCreatePostResponse } from "@/Contracts/Response/IPostsResponse";

interface ICreateNewPostUseCase {
  invoke: (formData: FormData) => Promise<IPOSTCreatePostResponse>;
}

export class CreateNewPostUseCase implements ICreateNewPostUseCase {
  private postRepo: IPostRepository;

  constructor(_postRepo: IPostRepository) {
    this.postRepo = _postRepo;
  }

  public async invoke(formData: FormData): Promise<IPOSTCreatePostResponse> {
    return this.postRepo.createPost(formData);
  }
}
