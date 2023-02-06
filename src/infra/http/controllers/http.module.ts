import { Module } from "@nestjs/common";
import { SendNotificationService } from "src/app/services/SendNotificationService";
import { NotificationsController } from "./notifications.controller";

@Module({
  controllers: [NotificationsController],
  providers: [SendNotificationService]
})
export default class HttpModule{}