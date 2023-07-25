export interface IGETListPostResponse {
  per_page: number;
  page: number;
  status_code: number;
  data: IPost[];
}

export interface IGETDetailPostResponse {
  status_code: number;
  message: string;
  data: IPost;
}

export interface IPOSTCreatePostResponse {
  message: string;
  data: IPost;
}

export interface IGETRequestValidatePostResponse {
  status_code: number;
  data: {
    qr_code_url: string;
  };
}

export interface IPost {
  id: string;
  user_id: number;
  returned_to: number;
  is_returned: boolean;
  title: string;
  image_url: string;
  ImageKey: string;
  place: string;
  characteristics: ICharacteristic[];
  user: IUser;
  updated_at: string;
  created_at: string;
}

export interface ICharacteristic {
  title: string;
}

export interface IUser {
  username: string;
  usermajor: string;
}

export interface IPOSTValidatePostResponse {
  status_code: number;
  message: string;
}
