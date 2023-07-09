import { IGETCurrentUserResponse } from "@/Contracts/Response/IUserResponse";
export interface IUserUseCase {
  getCurrentUser(): Promise<IGETCurrentUserResponse>;
}
