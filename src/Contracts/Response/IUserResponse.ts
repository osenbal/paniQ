export interface IGETCurrentUserResponse {
  message: string;
  data: IUser;
  status: boolean;
  status_code: number;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  avatar: string;
  nim: string;
  nip: string;
  major: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}
