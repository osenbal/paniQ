import { IUserUseCase } from "@/Contracts/UseCase/IUserUseCase";
import { IUserRepository } from "@/Contracts/Repository/IUserRepository";
import { UserRepositoryImpl } from "@/Data/Repository/UserRepositoryImpl";
import { UserDataSourceImpl } from "@/Data/DataSource/API/UserDataSourceImpl";
import { IGETCurrentUserResponse } from "@/Contracts/Response/IUserResponse";

export class UserUseCaseImpl implements IUserUseCase {
  private static instance: UserUseCaseImpl;
  private userRepo: IUserRepository = new UserRepositoryImpl(
    UserDataSourceImpl.getInstance()
  );

  static getInstance(): UserUseCaseImpl {
    if (!UserUseCaseImpl.instance) {
      UserUseCaseImpl.instance = new UserUseCaseImpl();
    }
    return UserUseCaseImpl.instance;
  }

  public async getCurrentUser(): Promise<IGETCurrentUserResponse> {
    return await this.userRepo.getCurrentUser();
  }
}
