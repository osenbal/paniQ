import { INotificationRepository } from '@/Contracts/Repository/INotificationRepository';
import { INotificationDataSource } from '@/Contracts/DataSource/INotificationDataSource';

export default class NotificationRepositoryImpl
  implements INotificationRepository
{
  private dataSource: INotificationDataSource;

  constructor(_datasource: INotificationDataSource) {
    this.dataSource = _datasource;
  }

  public getListNotification(perPage: number, page: number) {
    return this.dataSource.getListNotification(perPage, page);
  }

  public getSubscribeToTopic(fcmClientToken: string) {
    return this.dataSource.getSubscribeToTopic(fcmClientToken);
  }

  public getUnsubscribeFromTopic(fcmClientToken: string) {
    return this.dataSource.getUnsubscribeFromTopic(fcmClientToken);
  }
}
