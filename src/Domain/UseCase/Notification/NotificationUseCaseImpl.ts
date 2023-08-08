import NotificationRepositoryImpl from '@/Data/Repository/NotificationRepositoryImpl';
import { INotificationUseCase } from '@/Contracts/UseCase/INotificationUseCase';
import NotificationDataSourceImpl from '@/Data/DataSource/API/NotificationDataSourceImpl';

export class NotificationUseCaseImpl implements INotificationUseCase {
  private static instance: NotificationUseCaseImpl;

  private notificationRepo = new NotificationRepositoryImpl(
    NotificationDataSourceImpl.getInstance()
  );

  static getInstance(): NotificationUseCaseImpl {
    if (!NotificationUseCaseImpl.instance) {
      NotificationUseCaseImpl.instance = new NotificationUseCaseImpl();
    }
    return NotificationUseCaseImpl.instance;
  }

  public async getListNotification(perPage: number, page: number) {
    return await this.notificationRepo.getListNotification(perPage, page);
  }

  public async getSubscribeToTopic(fcmClientToken: string) {
    return await this.notificationRepo.getSubscribeToTopic(fcmClientToken);
  }

  public async getUnsubscribeFromTopic(fcmClientToken: string) {
    return await this.notificationRepo.getUnsubscribeFromTopic(fcmClientToken);
  }
}
