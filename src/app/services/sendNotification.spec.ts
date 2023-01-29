import { inMemorynotificationRepository } from "../../../test/repositories/inMemoryNotificationRepository";
import { SendNotificationService } from "./SendNotificationService";

describe('Send Notification', () => {

  test('Deve ser possível enviar uma notificação', async () => {

    const notificationRepository = new inMemorynotificationRepository();

    const sendNotification = new SendNotificationService(notificationRepository);
  
   const {notification} = await sendNotification.execute({
      category: 'social',
      content: 'teste notificação',
      recipientId: '123',
    });
  
    expect(notificationRepository.notifications).toHaveLength(1);
    expect(notification).toEqual(notificationRepository.notifications[0]);

  });

});