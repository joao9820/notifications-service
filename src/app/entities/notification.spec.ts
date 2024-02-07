import { Content } from './Content';
import { Notification } from './Notification';

//Categorização dos testes
describe('Notification', () => {
  //Cria um caso de teste
  //podemos usar o método test ou it, se tivessemos escrevemos os casos de testes em ingles, facilitaria a leitura, it should be...
  test('Deve ser possível criar uma nova notificação', () => {
    /*Aqui não é necessário testar se é possível cadastrar um conteúdo com menos caracteres e mais do que o válido pois esse teste já está
    sendo isolado na content.spec por conta do uso do object value*/
    const notification = new Notification({
      content: new Content('Você recebeu uma nova solicitação de amizade'),
      category: 'social',
      recipientId: 'test_recipient_id',
    });

    //Espera receber algo diferente de Falsy (Null, undefined, '', 0, Nan, etc.)
    expect(notification).toBeTruthy();
  });
});
