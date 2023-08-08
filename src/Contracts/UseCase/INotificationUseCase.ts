import {
  IGETListNotificationResponse,
  IGETSubscribeResponse,
  IGETUnsubscribeResponse,
} from '../Response/INotificationResponse';

export interface INotificationUseCase {
  getListNotification(
    perPage: number,
    page: number
  ): Promise<IGETListNotificationResponse>;
  getSubscribeToTopic(fcmClientToken: string): Promise<IGETSubscribeResponse>;
  getUnsubscribeFromTopic(
    fcmClientToken: string
  ): Promise<IGETUnsubscribeResponse>;
}
