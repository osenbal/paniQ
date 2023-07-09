export interface ICreateNewPostRequest {
  title: string;
  place: string;
  image: File;
  characteristics: ICharacteristics[];
}

export interface ICharacteristics {
  title: string;
}

export interface IValidatePostRequest {
  hash: string;
  post_id: string;
}
