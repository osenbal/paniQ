export interface IPostDataSource {
  getPosts<T>(page: number): Promise<T>;
  createPost<T>(data: FormData): Promise<T>;
  requestValidatePost<T>(post_id: string): Promise<T>;
}
