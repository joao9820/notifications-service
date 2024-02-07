import { Notification } from '@application/entities/Notification';
import { NotificationRepository } from '@application/repositories/NotificationRepository';

/*Para testes, é possível simular que esse array é o nosso BD, isso por conta da inversão de dependências, pois quem diz qual classe
será utilizada é quem realiza a chamada (sendNotification.spec) e não a própria classe (sendNotificationService), 
desacoplamento entre camadas*/

export class inMemoryNotificationRepository implements NotificationRepository {
  public notifications: Notification[] = [];

  async findById(id: string): Promise<Notification | null> {
    const notification = this.notifications.find((item) => item.id === id);

    if (!notification) return null;

    return notification;
  }

  async getByRecipient(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter(
      (noti) => noti.recipientId === recipientId,
    );
  }

  async countManyByRecipient(recipientId: string): Promise<number> {
    return this.notifications.filter((noti) => noti.recipientId === recipientId)
      .length;
  }

  async create(noti: Notification) {
    this.notifications.push(noti);
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );

    //Se encontraro indice sobrescrevemos o objeto que ele possui
    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }
  }

  /* public get noti(): Notification[]{
    return this.notifications;
  } */
}
