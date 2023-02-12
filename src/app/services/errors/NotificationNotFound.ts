//Classe será utilizada por diversos services, padronizando nossos retornos de erros;
export class NotificationNotFound extends Error {
  constructor(){
    //Constructor da classe pai
    super('Notification not found');
  }
}