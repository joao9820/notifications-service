import { Content } from './Content';

//Categorização dos testes
describe('Notification Content', () => {
  //Cria um caso de teste
  //podemos usar o método test ou it, se tivessemos escrevemos os casos de testes em ingles, facilitaria a leitura, it should be...
  test('Deve ser possível criar um conteúdo válido', () => {
    const content = new Content('Você recebeu uma nova solicitação de amizade');

    //Espera receber algo diferente de Falsy (Null, undefined, '', 0, Nan, etc.)
    expect(content).toBeTruthy();
  });

  test('Não deve ser possível criar um conteúdo com menos de 5 caracteres', () => {
    //Espera receber um erro
    expect(() => new Content('aaa')).toThrow();
  });

  test('Não deve ser possível criar um conteúdo com mais de 240 caracteres', () => {
    //Espera receber um erro
    expect(() => new Content('aaa'.repeat(241))).toThrow();
  });
});
