import { makeNotification } from "@test/factories/notificationFactory";
import { inMemoryNotificationRepository } from "../../../test/repositories/inMemoryNotificationRepository";
import { NotificationNotFound } from "./errors/NotificationNotFound";
import { ReadNotificationService } from "./ReadNotificationService";

describe('Read Notification', () => {

  test('Deve ser possível ler uma notificação', async () => {

    const notificationRepository = new inMemoryNotificationRepository();

    const notification = makeNotification();

    notificationRepository.create(notification);

    const readlNotification = new ReadNotificationService(notificationRepository);
  
    //Com a aplicação gerando o id do usuário, não precisamos retornar do BD e já podemos utilizar para testes
    await readlNotification.execute({
      id: notification.id,
      read: true,
    });
  
    //Esperamos que a única notificação criada (in memory) possua o campo readAt igual a qualquer Date
    expect(notificationRepository.notifications[0].readAt).toEqual(expect.any(Date));

  });

  test('Não deve ser possível ler uma notificação se ela não existir', async () => {

    const notificationRepository = new inMemoryNotificationRepository();

    const readNotification = new ReadNotificationService(notificationRepository);  
  
    //Esperamos que a promise seja rejeitada (e não resolvida) e lance um erro do tipo NotificationNotFound
    expect(() => {
      return readNotification.execute({
        id: 'fake-notification-id',
        read: true,
      });
    }).rejects.toThrow(NotificationNotFound);

  });
});


describe('Unread Notification', () => {

  test('Deve ser possível desmarcar uma notificação como lida', async () => {

    const notificationRepository = new inMemoryNotificationRepository();

    const notification = makeNotification({readAt: new Date()});

    notificationRepository.create(notification);

    const readNotification = new ReadNotificationService(notificationRepository);
  
    //Com a aplicação gerando o id do usuário, não precisamos retornar do BD e já podemos utilizar para testes
    await readNotification.execute({
      id: notification.id,
      read: false,
    });
  
    //Esperamos que a única notificação criada (in memory) possua o campo readAt igual a qualquer Date
    expect(notificationRepository.notifications[0].readAt).toBeNull();

  });

  test('Não deve ser possível desmarcar uma notificação como lida se ela não existir', async () => {

    const notificationRepository = new inMemoryNotificationRepository();

    const readNotification = new ReadNotificationService(notificationRepository);  
  
    //Esperamos que a promise seja rejeitada (e não resolvida) e lance um erro do tipo NotificationNotFound
    expect(() => {
      return readNotification.execute({
        id: 'fake-notification-id',
        read: true,
      });
    }).rejects.toThrow(NotificationNotFound);

  });

});