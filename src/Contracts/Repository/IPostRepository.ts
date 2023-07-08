export interface IPostRepository {
  getPosts<T>(page: number): Promise<T>;
  createPost<T>(data: FormData): Promise<T>;
}
