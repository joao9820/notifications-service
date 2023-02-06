import { Module } from "@nestjs/common";
import { NotificationRepository } from "src/app/repositories/NotificationRepository";
import { PrismaService } from "./prisma.service";
import PrismaNotificationRepository from "./repositories/PrismaNotificationRepository";


@Module({
  //Toda vez que uma classe precisar de NotificationRepository, devolveremos PrismaNotificationRepository
  providers: [PrismaService, {
    provide: NotificationRepository,
    useClass: PrismaNotificationRepository
  }],
})
export class DataBaseModule {}