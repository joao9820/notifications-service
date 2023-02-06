//Os services no curso estão sendo chamados de useCases

import { Injectable } from "@nestjs/common";
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


//O código antes do injectable, era um código limpo que poderia ser utilizado em qualuqer aplicação ts, porém agora está acoplado ao nest, por conta do decorator a baixo
//@Injectable()
export class SendNotificationService {
  
  private notificationRepository: NotificationRepository;

  //O atributo poderia ser declarado no construct, colocando private antes de notificationRepository
  constructor(notificationRepository: NotificationRepository){
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

    //Está retornando undefined, porque está utilizando uma classe abstrata sem a referencia da classe real
    console.log(this.notificationRepository);

    this.notificationRepository.create(notification);

    /*Retornamos como um objeto, porque se for necessário retornar mais coisas futuramente, não precisamos alterar a interface,
    que ainda retornará um objeto, porém com mais atributos*/
    return {
      notification
    };

  }
}