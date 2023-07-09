export interface IUserDataSource {
  getCurrentUser<T>(): Promise<T>;
}
