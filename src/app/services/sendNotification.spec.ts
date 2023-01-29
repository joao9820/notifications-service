import { Notification } from "../entities/Notification";
import { NotificationRepository } from "../repositories/NotificationRepository";
import { SendNotificationService } from "./SendNotificationService";

/*Para testes, é possível simular que esse array é o nosso BD, isso por conta da inversão de dependências, pois quem diz qual classe
será utilizada é quem realiza a chamada (sendNotification.spec) e não a própria classe (sendNotificationService), 
desacoplamento entre camadas*/
const notifications: Notification[] = [];

const notificationRepository = {
  async create(noti: Notification) {
    notifications.push(noti);
  }
};

describe('Send Notification', () => {

  test('Deve ser possível enviar uma notificação', async () => {
    const sendNotification = new SendNotificationService(notificationRepository);
  
   const {notification} = await sendNotification.execute({
      category: 'social',
      content: 'teste notificação',
      recipientId: '123',
    });

    console.log(notifications);
  
    expect(notifications).toHaveLength(1);
    //expect(notification).toBeTruthy();

  });

});