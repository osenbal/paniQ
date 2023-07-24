import { IPostDataSource } from "../../Contracts/DataSource/IPostDataSource";
import { IPostRepository } from "@/Contracts/Repository/IPostRepository";

export class PostRepositoryImpl implements IPostRepository {
  postDataSource: IPostDataSource;

  constructor(_postDataSource: IPostDataSource) {
    this.postDataSource = _postDataSource;
  }

  getPosts<T>(page: number, user_id?: number): Promise<T> {
    return this.postDataSource.getPosts(page, user_id);
  }

  searchPost<T>(data: any): Promise<T> {
    return this.postDataSource.searchPost(data);
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

  getDetailPost<T>(post_id: string | number): Promise<T> {
    return this.postDataSource.getDetailPost(post_id);
  }
}
