import { Module } from "@nestjs/common";
import { SendNotificationService } from "@application/services/SendNotificationService";
import { DataBaseModule } from "@infra/database/database.module";
import { NotificationsController } from "./notifications.controller";
import { CancelNotificationService } from "@application/services/CancelNotificationService";
import { CountRecipientNotificationsService } from "@application/services/CountRecipientNotificationsService";
import { GetRecipientNotificationsService } from "@application/services/GetRecipientNotificationsService";
import { ReadNotificationService } from "@application/services/ReadNotificationService";
import { NotificationCreatedHandler } from "@application/handlers/notificationCreatedHandler";
import { SendEmailService } from "@application/services/SendEmailService";

//O SendNotificationService precisa do NotificationRepository, então utilizamos o module de database que já nos fornece essa informação
@Module({
  imports: [DataBaseModule],
  controllers: [NotificationsController],
  providers: [
    NotificationCreatedHandler,
    SendEmailService,
    SendNotificationService, 
    CancelNotificationService, 
    ReadNotificationService, 
    CountRecipientNotificationsService, 
    GetRecipientNotificationsService
  ]
})

export default class HttpModule{}