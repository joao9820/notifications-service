import { Notification } from "@application/entities/Notification";
import { NotificationRepository } from "@application/repositories/NotificationRepository";

/*Para testes, é possível simular que esse array é o nosso BD, isso por conta da inversão de dependências, pois quem diz qual classe
será utilizada é quem realiza a chamada (sendNotification.spec) e não a própria classe (sendNotificationService), 
desacoplamento entre camadas*/

export class inMemoryNotificationRepository implements NotificationRepository {

  public notifications: Notification[] = [];

  async create(noti: Notification) {
    this.notifications.push(noti);
  }

  /* public get noti(): Notification[]{
    return this.notifications;
  } */
};