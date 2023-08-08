export interface IGETListNotificationResponse {
  data: IDataNotification;
  message: string;
  status: boolean;
  statusCode: number;
}

export interface INotification {
  UserID: number;
  Title: string;
  Body: string;
  ImageUrl: string;
}

export interface IDataNotification {
  notifications: INotification[];
  page: number;
  perPage: number;
  totalData: number;
}

export interface IGETSubscribeResponse {
  data: null;
  message: string;
  status: boolean;
  statusCode: number;
}

export interface IGETUnsubscribeResponse {
  data: null;
  message: string;
  status: boolean;
  statusCode: number;
}
