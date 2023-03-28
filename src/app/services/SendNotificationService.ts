//Os services no curso estão sendo chamados de useCases

import { NotificationCreatedEvent } from "@application/events/notificationCreated.event";
import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Content } from "../entities/Content";
import { Notification } from "../entities/Notification";
import { NotificationRepository } from "../repositories/NotificationRepository";

//ou SendNotificationRequest
interface SendNotificationProps {
  recipientId: string,
  content: string,
  category: string
}

interface SendNotificationResponse {
  notification: Notification
}

//Necessário utilizar o Injectable para qualquer providers que utilizamos nos modules
//O código antes do injectable, era um código limpo que poderia ser utilizado em qualquer aplicação ts, porém agora está acoplado ao nest, por conta do decorator a baixo
@Injectable()
export class SendNotificationService {

  //O atributo poderia ser declarado no construct, colocando private antes de notificationRepository
  constructor(private notificationRepository: NotificationRepository, private eventEmitter: EventEmitter2){
    this.notificationRepository = notificationRepository;
  }

  //Princípio da funcionalidade única do solid
  async execute(props: SendNotificationProps): Promise<SendNotificationResponse>{

    const {recipientId, content, category} = props;

    const notification = new Notification({
      recipientId,
      content: new Content(content),
      category
    });

    //Persistir notification no BD
    this.notificationRepository.create(notification);

    const notificationCreatedEvent = new NotificationCreatedEvent('<h1>Hello</h1>')
    this.eventEmitter.emit('notification.created', notificationCreatedEvent);

    //this.eventEmitter.emit()

    /*Retornamos como um objeto, porque se for necessário retornar mais coisas futuramente, não precisamos alterar a interface,
    que ainda retornará um objeto, porém com mais atributos*/
    return {
      notification
    };

  }
}