import { Module } from "@nestjs/common";
import { NotificationRepository } from "@application/repositories/NotificationRepository";
import { PrismaService } from "./prisma/prisma.service";
import PrismaNotificationRepository from "./prisma/repositories/PrismaNotificationRepository";

//Toda vez que uma classe precisar de NotificationRepository, devolveremos PrismaNotificationRepository
@Module({
  providers: [PrismaService, {
    provide: NotificationRepository,
    useClass: PrismaNotificationRepository
  }],
  //Exportamos NotificationRepository para os modulos que implementarem esse module database, possa utilizá-lo
  exports: [NotificationRepository]
})
export class DataBaseModule {}