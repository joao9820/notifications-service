import { Content } from "@application/entities/Content";
import { Notification, NotificationProps } from "@application/entities/Notification";

//O partial diz que todas as nossas props podem ser opcionais
type Override = Partial<NotificationProps>;
//Criamos uma "fábrica de notificações", para diminuir a quantidade de código descrito para criar um objeto em testes
export function makeNotification(override: Override = {}): Notification{
  return new Notification({
    category: 'Social',
    content: new Content('Você possui uma nova solicitação de amizade'),
    recipientId: 'recipient-1',
    ...override
  });
}