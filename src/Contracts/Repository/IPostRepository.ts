import { ISearchPostRequest } from "@/Contracts/Requests/IPostRequest";
export interface IPostRepository {
  getPosts<T>(page: number): Promise<T>;
  searchPost<T>(data: ISearchPostRequest): Promise<T>;
  createPost<T>(data: FormData): Promise<T>;
  requestValidatePost<T>(post_id: string): Promise<T>;
  validatePost<T>(jsonData: any): Promise<T>;
}
