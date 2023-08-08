import {
  IGETListNotificationResponse,
  IGETSubscribeResponse,
  IGETUnsubscribeResponse,
} from '../Response/INotificationResponse';

export interface INotificationDataSource {
  getListNotification(
    perPage: number,
    page: number
  ): Promise<IGETListNotificationResponse>;
  getSubscribeToTopic(fcmClientToken: string): Promise<IGETSubscribeResponse>;
  getUnsubscribeFromTopic(
    fcmClientToken: string
  ): Promise<IGETUnsubscribeResponse>;
}
