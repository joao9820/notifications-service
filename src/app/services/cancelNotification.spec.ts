//Aqui não foi possível colocar o alias path de test, não encontra o inMemorynotificationRepository
import { makeNotification } from '@test/factories/notificationFactory';
import { inMemoryNotificationRepository } from '../../../test/repositories/inMemoryNotificationRepository';
import { CancelNotificationService } from './CancelNotificationService';
import { NotificationNotFound } from './errors/NotificationNotFound';

describe('Cancel Notification', () => {
  test('Deve ser possível cancelar uma notificação', async () => {
    /*Usar banco de dados InMemory agiliza os testes unitários, sendo que não é preciso armazenar os dados, apenas em tempo de execução
    tempos eles guardados, após executar o teste novamente os dados serão novamente armazenados, e os anteriores não são mais existentes.
    Quando analisamos esse cenário em grande escala, em que devemos fazer vários testes unitário ou até testes end-to-end o ganho em tempo
    de execução é notório*/
    const notificationRepository = new inMemoryNotificationRepository();

    const notification = makeNotification();

    notificationRepository.create(notification);

    const cancelNotification = new CancelNotificationService(
      notificationRepository,
    );

    //Com a aplicação gerando o id do usuário, não precisamos retornar do BD e já podemos utilizar para testes
    await cancelNotification.execute({
      id: notification.id,
    });

    //Esperamos que a única notificação criada (in memory) possua o campo canceledAt igual a qualquer Date
    expect(notificationRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  test('Não deve ser possível cancelar uma notificação se ela não existir', async () => {
    /*Usar banco de dados InMemory agiliza os testes unitários, sendo que não é preciso armazenar os dados, apenas em tempo de execução
    tempos eles guardados, após executar o teste novamente os dados serão novamente armazenados, e os anteriores não são mais existentes.
    Quando analisamos esse cenário em grande escala, em que devemos fazer vários testes unitário ou até testes end-to-end o ganho em tempo
    de execução é notório*/
    const notificationRepository = new inMemoryNotificationRepository();

    const cancelNotification = new CancelNotificationService(
      notificationRepository,
    );

    //Esperamos que a promise seja rejeitada (e não resolvida) e lance um erro do tipo NotificationNotFound
    expect(() => {
      return cancelNotification.execute({
        id: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
