import { IPostUseCase } from "@/Contracts/UseCase/IPostUseCase";
import { GetAllPostUseCase } from "./GetAllPostUseCase";
import { SearchPostUseCase } from "./SearchPostUseCase";
import { CreateNewPostUseCase } from "./CreateNewPostUseCase";
import { PostRepositoryImpl } from "@/Data/Repository/PostRepositoryImpl";
import PostDataSourceImpl from "@/Data/DataSource/API/PostAPIDataSourceImpl";
import {
  IGETListPostResponse,
  IPOSTCreatePostResponse,
  IGETRequestValidatePostResponse,
} from "@/Contracts/Response/IPostsResponse";
import { RequestValidatePostUseCase } from "./GetRequestValidatePostUseCase";
import {
  IValidatePostRequest,
  ISearchPostRequest,
} from "@/Contracts/Requests/IPostRequest";

export default class PostUseCaseImpl implements IPostUseCase {
  private static instance: PostUseCaseImpl;
  private postRepo = new PostRepositoryImpl(PostDataSourceImpl.getInstance());
  private getAllPostUseCase = new GetAllPostUseCase(this.postRepo);
  private createNewPostUseCase = new CreateNewPostUseCase(this.postRepo);
  private requestValidatePostUseCase = new RequestValidatePostUseCase(
    this.postRepo
  );
  private searchPostUseCase = new SearchPostUseCase(this.postRepo);

  public static getInstance(): PostUseCaseImpl {
    if (!PostUseCaseImpl.instance) {
      PostUseCaseImpl.instance = new PostUseCaseImpl();
    }
    return PostUseCaseImpl.instance;
  }

  public getPosts(page: number): Promise<IGETListPostResponse> {
    return this.getAllPostUseCase.invoke(page);
  }

  public searchPost(data: ISearchPostRequest): Promise<IGETListPostResponse> {
    return this.searchPostUseCase.invoke(data);
  }

  public createPost(data: FormData): Promise<IPOSTCreatePostResponse> {
    return this.createNewPostUseCase.invoke(data);
  }

  public requestValidatePost(
    post_id: string
  ): Promise<IGETRequestValidatePostResponse> {
    return this.requestValidatePostUseCase.invoke(post_id);
  }

  public validatePost(jsonData: IValidatePostRequest): Promise<any> {
    return this.postRepo.validatePost(jsonData);
  }
}
