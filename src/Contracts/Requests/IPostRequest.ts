export interface ICreateNewPostRequest {
  title: string;
  place: string;
  image: File;
  characteristics: ICharacteristics[];
}

export interface ICharacteristics {
  title: string;
}
