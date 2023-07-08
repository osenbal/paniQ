import { IJwtAPIEntity } from "@/Contracts/Entity/IJwtAPIEntity";

export interface ILoginResponse {
  status_code: number;
  status: boolean;
  message?: string;
  data?: IJwtAPIEntity;
}
