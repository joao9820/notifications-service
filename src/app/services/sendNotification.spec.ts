//Aqui não foi possível colocar o alias path de test, não encontra o inMemorynotificationRepository
import { inMemoryNotificationRepository } from '../../../test/repositories/inMemoryNotificationRepository';
import { SendNotificationService } from './SendNotificationService';

describe('Send Notification', () => {
  test('Deve ser possível enviar uma notificação', async () => {
    /*Usar banco de dados InMemory agiliza os testes unitários, sendo que não é preciso armazenar os dados, apenas em tempo de execução
    tempos eles guardados, após executar o teste novamente os dados serão novamente armazenados, e os anteriores não são mais existentes.
    Quando analisamos esse cenário em grande escala, em que devemos fazer vários testes unitário ou até testes end-to-end o ganho em tempo
    de execução é notório*/
    const notificationRepository = new inMemoryNotificationRepository();

    const sendNotification = new SendNotificationService(
      notificationRepository,
    );

    const { notification } = await sendNotification.execute({
      category: 'social',
      content: 'teste notificação',
      recipientId: '123',
    });

    expect(notificationRepository.notifications).toHaveLength(1);
    expect(notification).toEqual(notificationRepository.notifications[0]);
  });
});
