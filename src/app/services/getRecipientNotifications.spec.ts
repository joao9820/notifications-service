//Aqui não foi possível colocar o alias path de test, não encontra o inMemorynotificationRepository
import { makeNotification } from '@test/factories/notificationFactory';
import { inMemoryNotificationRepository } from '../../../test/repositories/inMemoryNotificationRepository';
import { GetRecipientNotificationsService } from './GetRecipientNotificationsService';

describe('Get Recipient Notifications', () => {
  test('Listar as notificações de um recebedor', async () => {
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

    const getRecipientNotifications = new GetRecipientNotificationsService(
      notificationRepository,
    );

    //Com a aplicação gerando o id do usuário, não precisamos retornar do BD e já podemos utilizar para testes
    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-1' }),
        expect.objectContaining({ recipientId: 'recipient-1' }),
      ]),
    );
  });
});
