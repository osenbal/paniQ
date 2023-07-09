import { IPostUseCase } from "@/Contracts/UseCase/IPostUseCase";
import { GetAllPostUseCase } from "./GetAllPostUseCase";
import { CreateNewPostUseCase } from "./CreateNewPostUseCase";
import { PostRepositoryImpl } from "@/Data/Repository/PostRepositoryImpl";
import PostDataSourceImpl from "@/Data/DataSource/API/PostAPIDataSourceImpl";
import {
  IGETListPostResponse,
  IPOSTCreatePostResponse,
  IGETRequestValidatePostResponse,
} from "@/Contracts/Response/IPostsResponse";
import { RequestValidatePostUseCase } from "./GetRequestValidatePostUseCase";
import { IValidatePostRequest } from "@/Contracts/Requests/IPostRequest";

export default class PostUseCaseImpl implements IPostUseCase {
  private static instance: PostUseCaseImpl;
  private postRepo = new PostRepositoryImpl(PostDataSourceImpl.getInstance());
  private getAllPostUseCase = new GetAllPostUseCase(this.postRepo);
  private createNewPostUseCase = new CreateNewPostUseCase(this.postRepo);
  private requestValidatePostUseCase = new RequestValidatePostUseCase(
    this.postRepo
  );

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

  public async requestValidatePost(
    post_id: string
  ): Promise<IGETRequestValidatePostResponse> {
    return await this.requestValidatePostUseCase.invoke(post_id);
  }

  public async validatePost(jsonData: IValidatePostRequest): Promise<any> {
    return await this.postRepo.validatePost(jsonData);
  }
}
