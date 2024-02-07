import { Notification } from '../entities/Notification';

//O nest lida melhor com classes abstratas para inversão de dependências do que interfaces
export abstract class NotificationRepository {
  //Como o conteúdo da notificação será enviado e não será alterado, portanto não será preciso retorná-la, se não criar, lançará o erro
  abstract create(notification: Notification): Promise<void>;
  abstract findById(id: string): Promise<Notification | null>;
  abstract save(notification: Notification): Promise<void>;
  /*O Diego gosta de utilizar a palavra many para dizer que serão buscadas mais de uma informação, particularmente para isso prefiro o find
  quando buscará apenas uma "linha" e list ou get para dizer que serão buscadas várias informações */
  abstract countManyByRecipient(recipientId: string): Promise<number>;
  abstract getByRecipient(recipientId: string): Promise<Notification[]>;
}
