// import { User } from "../../Model/User/User";
// import { JwtToken } from "../../Model/JwtToken";
import { AuthRepository } from "../../Repository/AuthRepository";

export interface LoginUseCase {
  invoke: <T>({
    nim,
    password,
  }: {
    nim: string;
    password: string;
  }) => Promise<T>;
}

export class Login implements LoginUseCase {
  private authRepo: AuthRepository;

  constructor(_authRepo: AuthRepository) {
    this.authRepo = _authRepo;
  }

  async invoke<T>({
    nim,
    password,
  }: {
    nim: string;
    password: string;
  }): Promise<T> {
    return this.authRepo.login(nim, password);
  }
}
