import {Notification} from "@application/entities/Notification";

//Com essa classe podemos reutilizar o mapper para outros métodos do bd, sem precisar formatar todo retorno
export default class PirsmaNotificationMapper {
  static toPrisma(notification: Notification){

    const {id, category, content, recipientId, createdAt, readAt} = notification;

    return {
      /*Para setar o id podemos fazer de 2 formas, através do BD ou através da aplicação, através da aplicação temos a vantagem 
      de já ter o id do nosso objeto antes de persistir o dado, podendo utilizar ele para outras e só depois salvar ese id e os
      dados no BD*/
      id,
      content: content.value,
      category,
      recipientId,
      readAt,
      createdAt
    }
  }
}