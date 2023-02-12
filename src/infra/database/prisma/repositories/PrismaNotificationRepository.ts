import { Injectable } from "@nestjs/common";
import { Notification } from "@application/entities/Notification";
import { NotificationRepository } from "@application/repositories/NotificationRepository"
import { PrismaService } from "../prisma.service";
import PirsmaNotificationMapper from "../mappers/PrismaNotificationMapper";

@Injectable()
export default class PrismaNotificationRepository implements NotificationRepository {

  constructor(private prisma: PrismaService){}

  async create(notification: Notification): Promise<void> {

    //O destruct que fazemos aqui acessa diretamente os métodos com o modificador get, como se fossem atributos da classe
    
    await this.prisma.notification.create({
      data: PirsmaNotificationMapper.toPrisma(notification)
    })
  }

}