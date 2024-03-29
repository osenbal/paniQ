import {
  IValidatePostRequest,
  ISearchPostRequest,
} from "@/Contracts/Requests/IPostRequest";
export interface IPostDataSource {
  getPosts<T>(page: number, user_id?: number): Promise<T>;
  searchPost<T>(data: ISearchPostRequest): Promise<T>;
  createPost<T>(data: FormData): Promise<T>;
  getDetailPost<T>(post_id: string | number): Promise<T>;

  requestValidatePost<T>(post_id: string): Promise<T>;
  validatePost<T>(jsonData: IValidatePostRequest): Promise<T>;
}
