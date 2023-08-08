import { INotificationDataSource } from '@/Contracts/DataSource/INotificationDataSource';
import request from '@/Api/request';
import { NOTIFICATION_END_POINT } from '@/Api/LIST_END_POINT';
import {
  IGETListNotificationResponse,
  IGETSubscribeResponse,
  IGETUnsubscribeResponse,
} from '@/Contracts/Response/INotificationResponse';
import { isAxiosError } from 'axios';

export default class NotificationDataSourceImpl
  implements INotificationDataSource
{
  private static notificationDataSource: NotificationDataSourceImpl;

  static getInstance(): NotificationDataSourceImpl {
    if (!this.notificationDataSource) {
      this.notificationDataSource = new NotificationDataSourceImpl();
    }
    return this.notificationDataSource;
  }

  public async getListNotification(
    perPage: number,
    page: number
  ): Promise<IGETListNotificationResponse> {
    try {
      const r = await request.get<IGETListNotificationResponse>(
        NOTIFICATION_END_POINT.GET_LIST_NOTIFICATION(perPage, page)
      );
      return r;
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        return err.response?.data;
      }
      throw err;
    }
  }

  public async getSubscribeToTopic(
    fcmClientToken: string
  ): Promise<IGETSubscribeResponse> {
    try {
      const r = await request.get<IGETSubscribeResponse>(
        NOTIFICATION_END_POINT.GET_SUBSCRIBE(fcmClientToken)
      );
      return r;
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        return err.response?.data;
      }
      throw err;
    }
  }

  public async getUnsubscribeFromTopic(
    fcmClientToken: string
  ): Promise<IGETUnsubscribeResponse> {
    try {
      const r = await request.get<IGETUnsubscribeResponse>(
        NOTIFICATION_END_POINT.GET_UNSUBSCRIBE(fcmClientToken)
      );
      return r;
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        return err.response?.data;
      }
      throw err;
    }
  }
}
