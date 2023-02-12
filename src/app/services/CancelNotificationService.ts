//Os services no curso estão sendo chamados de useCases

import { Injectable } from "@nestjs/common";
import { Content } from "../entities/Content";
import { Notification } from "../entities/Notification";
import { NotificationRepository } from "../repositories/NotificationRepository";
import { NotificationNotFound } from "./errors/NotificationNotFound";

//ou CancelNotificationRequest
interface CancelNotificationProps {
  id: string;
}

type CancelNotificationResponse = void;

//Necessário utilizar o Injectable para qualquer providers que utilizamos nos modules
//O código antes do injectable, era um código limpo que poderia ser utilizado em qualquer aplicação ts, porém agora está acoplado ao nest, por conta do decorator a baixo
@Injectable()
export class CancelNotificationService {

  //O atributo poderia ser declarado no construct, colocando private antes de notificationRepository
  constructor(private notificationRepository: NotificationRepository){
    this.notificationRepository = notificationRepository;
  }

  //Princípio da funcionalidade única do solid
  async execute(request: CancelNotificationProps): Promise<CancelNotificationResponse>{

    const {id} = request;

    const notification = await this.notificationRepository.findById(id);
    
    if(!notification){
      throw new NotificationNotFound();
    }

    notification.cancel();

    await this.notificationRepository.save(notification);

  }
}