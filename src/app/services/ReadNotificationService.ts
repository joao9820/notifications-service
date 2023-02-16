//Os services no curso estão sendo chamados de useCases

import { Injectable } from "@nestjs/common";
import { Content } from "../entities/Content";
import { Notification } from "../entities/Notification";
import { NotificationRepository } from "../repositories/NotificationRepository";
import { NotificationNotFound } from "./errors/NotificationNotFound";

//ou ReadNotificationRequest
interface ReadNotificationProps {
  id: string;
  read: boolean;
}

type ReadNotificationResponse = void;

//Necessário utilizar o Injectable para qualquer providers que utilizamos nos modules
//O código antes do injectable, era um código limpo que poderia ser utilizado em qualquer aplicação ts, porém agora está acoplado ao nest, por conta do decorator a baixo
@Injectable()
export class ReadNotificationService {

  //O atributo poderia ser declarado no construct, colocando private antes de notificationRepository
  constructor(private notificationRepository: NotificationRepository){
    this.notificationRepository = notificationRepository;
  }

  //Princípio da funcionalidade única do solid
  async execute(request: ReadNotificationProps): Promise<ReadNotificationResponse>{

    const {id, read} = request;

    const notification = await this.notificationRepository.findById(id);
    
    if(!notification){
      throw new NotificationNotFound();
    }

    if(read)
      notification.read();
    else
      notification.unread();

    await this.notificationRepository.save(notification);

  }
}