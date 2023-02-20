import {Notification as NotificationPrisma} from "@prisma/client";
import {Notification, NotificationProps} from "@application/entities/Notification";
import { Content } from "@application/entities/Content";

//Com essa classe podemos reutilizar o mapper para outros métodos do bd, sem precisar formatar todo retorno
export default class PrismaNotificationMapper {
  static toPrisma(notification: Notification): NotificationPrisma{

    const {id, category, content, recipientId, createdAt, readAt, canceledAt} = notification;

    return {
      /*Para setar o id podemos fazer de 2 formas, através do BD ou através da aplicação, através da aplicação temos a vantagem 
      de já ter o id do nosso objeto antes de persistir o dado, podendo utilizar ele para outras e só depois salvar ese id e os
      dados no BD*/
      id,
      content: content.value,
      category,
      recipientId,
      readAt: readAt ?? null,
      canceledAt: canceledAt ?? null,
      createdAt
    }
  }

  //Esse método transforma o objeto Notification que vem do prisma, para o Notification do Entities, aqui nomeado como domínio
  //Após análise percebemos que os métodos de conversão (mappers) existem basicamente por conta do ObjectValue (content: Content)
  static toDomain(notification: NotificationPrisma): Notification{
    /*Ao invés de criar uma nova notificação, estamos apenas recuperando uma referência para uma notificação que já existe no BD,
    portanto, passamos o id dessa notificação para que não crie um novo id*/
    return new Notification(
      {
      ...notification,
      content: new Content(notification.content),
      }, 
      notification.id
    );
  }
}