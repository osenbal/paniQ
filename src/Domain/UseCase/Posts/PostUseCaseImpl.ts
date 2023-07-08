import { IPostUseCase } from "@/Contracts/UseCase/IPostUseCase";
import { GetAllPostUseCase } from "./GetAllPostUseCase";
import { CreateNewPostUseCase } from "./CreateNewPostUseCase";
import { PostRepositoryImpl } from "@/Data/Repository/PostRepositoryImpl";
import PostDataSourceImpl from "@/Data/DataSource/API/PostAPIDataSourceImpl";
import {
  IGETListPostResponse,
  IPOSTCreatePostResponse,
} from "@/Contracts/Response/IPostsResponse";

export default class PostUseCaseImpl implements IPostUseCase {
  private static instance: PostUseCaseImpl;
  private postRepo = new PostRepositoryImpl(PostDataSourceImpl.getInstance());
  private getAllPostUseCase = new GetAllPostUseCase(this.postRepo);
  private createNewPostUseCase = new CreateNewPostUseCase(this.postRepo);

  public static getInstance(): PostUseCaseImpl {
    if (!PostUseCaseImpl.instance) {
      PostUseCaseImpl.instance = new PostUseCaseImpl();
    }
    return PostUseCaseImpl.instance;
  }

  public async getPosts(page: number): Promise<IGETListPostResponse> {
    return await this.getAllPostUseCase.invoke(page);
  }

  public async createPost(data: FormData): Promise<IPOSTCreatePostResponse> {
    return await this.createNewPostUseCase.invoke(data);
  }
}
