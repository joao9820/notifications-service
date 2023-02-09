import { Module } from "@nestjs/common";
import { SendNotificationService } from "@application/services/SendNotificationService";
import { DataBaseModule } from "@infra/database/database.module";
import { NotificationsController } from "./notifications.controller";

//O SendNotificationService precisa do NotificationRepository, então utilizamos o module de database que já nos fornece essa informação
@Module({
  imports: [DataBaseModule],
  controllers: [NotificationsController],
  providers: [SendNotificationService]
})
export default class HttpModule{}