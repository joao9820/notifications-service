//Os services no curso estão sendo chamados de useCases

import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/NotificationRepository';

interface CountRecipientNotificationsProps {
  recipientId: string;
}

type CountRecipientNotificationsResponse = {
  count: number;
};

@Injectable()
export class CountRecipientNotificationsService {
  //O atributo poderia ser declarado no construct, colocando private antes de notificationRepository
  constructor(private notificationRepository: NotificationRepository) {
    this.notificationRepository = notificationRepository;
  }

  //Princípio da funcionalidade única do solid
  async execute(
    request: CountRecipientNotificationsProps,
  ): Promise<CountRecipientNotificationsResponse> {
    const { recipientId } = request;

    const count = await this.notificationRepository.countManyByRecipient(
      recipientId,
    );

    return {
      count,
    };
  }
}
