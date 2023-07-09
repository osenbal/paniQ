export interface IUserRepository {
  getCurrentUser<T>(): Promise<T>;
}
