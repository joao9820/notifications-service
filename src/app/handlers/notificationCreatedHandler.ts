import { Injectable } from '@nestjs/common';
import { SendEmailService } from '../services/SendEmailService';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { NotificationCreatedEvent } from '../events/notificationCreated.event';

@Injectable()
export class NotificationCreatedHandler {
  constructor(
    private readonly mailService: SendEmailService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @OnEvent('notification.created')
  async handleNotificationCreatedEvent(event: NotificationCreatedEvent) {
    await this.mailService.sendEmail(
      event.email,
      'Welcome to our app!',
      'Thank you for joining our app!',
    );
  }
}
