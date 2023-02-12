import { Notification } from "../entities/Notification";

//O nest lida melhor com classes abstratas para inversão de dependências do que interfaces
export abstract class NotificationRepository {
  //Como o conteúdo da notificação será enviado e não será alterado, portanto não será preciso retorná-la, se não criar, lançará o erro
  abstract create(notification: Notification): Promise<void>;
  abstract findById(id: string): Promise<Notification | null>;
  abstract save(notification: Notification): Promise<void>;
}