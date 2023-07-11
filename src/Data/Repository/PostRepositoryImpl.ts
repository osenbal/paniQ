import { IPostDataSource } from "../../Contracts/DataSource/IPostDataSource";
import { IPostRepository } from "@/Contracts/Repository/IPostRepository";

export class PostRepositoryImpl implements IPostRepository {
  postDataSource: IPostDataSource;

  constructor(_postDataSource: IPostDataSource) {
    this.postDataSource = _postDataSource;
  }

  getPosts<T>(page: number): Promise<T> {
    return this.postDataSource.getPosts(page);
  }

  createPost<T>(data: FormData): Promise<T> {
    return this.postDataSource.createPost(data);
  }

  requestValidatePost<T>(post_id: string): Promise<T> {
    return this.postDataSource.requestValidatePost(post_id);
  }

  validatePost<T>(jsonData: any): Promise<T> {
    return this.postDataSource.validatePost(jsonData);
  }
}
