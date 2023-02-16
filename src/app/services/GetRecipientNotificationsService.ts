//Os services no curso estão sendo chamados de useCases

import { Injectable } from "@nestjs/common";
import { Content } from "../entities/Content";
import { Notification } from "../entities/Notification";
import { NotificationRepository } from "../repositories/NotificationRepository";
import { NotificationNotFound } from "./errors/NotificationNotFound";

interface GetRecipientNotificationsProps {
  recipientId: string;
}

type GetRecipientNotificationsResponse = {
  notifications: Notification[];
};

@Injectable()
export class GetRecipientNotificationsService {

  //O atributo poderia ser declarado no construct, colocando private antes de notificationRepository
  constructor(private notificationRepository: NotificationRepository){
    this.notificationRepository = notificationRepository;
  }

  //Princípio da funcionalidade única do solid
  async execute(request: GetRecipientNotificationsProps): Promise<GetRecipientNotificationsResponse>{

    const {recipientId} = request;

    const notifications = await this.notificationRepository.getByRecipient(recipientId);

    return {
      notifications
    }

  }
}