import { Injectable } from "@nestjs/common";
import { Notification } from "src/app/entities/Notification";
import { NotificationRepository } from "src/app/repositories/NotificationRepository"
import { PrismaService } from "../prisma.service";

@Injectable()
export default class PrismaNotificationRepository implements NotificationRepository {

  constructor(private prisma: PrismaService){}

  async create(notification: Notification): Promise<void> {

    //O destruct que fazemos aqui acessa diretamente os métodos com o modificador get, como se fossem atributos da classe
    const {id, content, category, recipientId, readAt, createdAt} = notification;
    
    await this.prisma.notification.create({
      data: {
        /*Para setar o id podemos fazer de 2 formas, através do BD ou através da aplicação, através da aplicação temos a vantagem 
        de já ter o id do nosso objeto antes de persistir o dado, podendo utilizar ele para outras e só depois salvar ese id e os
        dados no BD*/
        id,
        content: content.value,
        category,
        recipientId,
        readAt,
        createdAt
      }
    })
  }

}