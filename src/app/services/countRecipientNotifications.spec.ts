//Aqui não foi possível colocar o alias path de test, não encontra o inMemorynotificationRepository
import { makeNotification } from '@test/factories/notificationFactory';
import { inMemoryNotificationRepository } from '../../../test/repositories/inMemoryNotificationRepository';
import { CountRecipientNotificationsService } from './CountRecipientNotificationsService';

describe('Count Recipient Notifications', () => {
  test('Contar o número de notificações de um recebedor', async () => {
    const notificationRepository = new inMemoryNotificationRepository();

    //Para fazer o teste, registramos em nosso inMemoryDB 3 notificações, sendo 2 do mesmo recipient que buscaremos

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );
    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );
    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    const countRecipientNotifications = new CountRecipientNotificationsService(
      notificationRepository,
    );

    //Com a aplicação gerando o id do usuário, não precisamos retornar do BD e já podemos utilizar para testes
    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    //Esperamos que a única notificação criada (in memory) possua o campo canceledAt igual a qualquer Date
    expect(count).toEqual(2);
  });
});
