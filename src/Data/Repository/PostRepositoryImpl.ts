import { IPostDataSource } from "../../Contracts/DataSource/IPostDataSource";
import { IPostRepository } from "@/Contracts/Repository/IPostRepository";

export class PostRepositoryImpl implements IPostRepository {
  postDataSource: IPostDataSource;

  constructor(_postDataSource: IPostDataSource) {
    this.postDataSource = _postDataSource;
  }

  async getPosts<T>(page: number): Promise<T> {
    return await this.postDataSource.getPosts(page);
  }

  async createPost<T>(data: FormData): Promise<T> {
    return await this.postDataSource.createPost(data);
  }

  async requestValidatePost<T>(post_id: string): Promise<T> {
    return await this.postDataSource.requestValidatePost(post_id);
  }
}
