import { Injectable } from "@nestjs/common";
import { Notification } from "@application/entities/Notification";
import { NotificationRepository } from "@application/repositories/NotificationRepository"
import { PrismaService } from "../prisma.service";
import PrismaNotificationMapper from "../mappers/PrismaNotificationMapper";

@Injectable()
export default class PrismaNotificationRepository implements NotificationRepository {

  constructor(private prisma: PrismaService){}
  
  async getByRecipient(recipientId: string): Promise<Notification[]> {


    //Sem o async e await, o método retornaria para nós um objeto com then, catch e finally
    //Com o async e await já temos a resposta resolvida, seria o response do then
    const notifications = await this.prisma.notification.findMany({
      where: {
        recipientId
      }
    });

    /*A nossa função será preenchida por cada objeto de notificação dessa forma, é equivalente a
    notifications.map((noti) => PrismaNotificationMapper.toDomain(noti))*/
    return notifications.map(PrismaNotificationMapper.toDomain);
  }

  async findById(id: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id: id
      }
    });

    return !notification ? null : PrismaNotificationMapper.toDomain(notification);

  }

  async countManyByRecipient(recipientId: string): Promise<number> {
    const count = await this.prisma.notification.count({
      where: {
        recipientId
      }
    });

    return count;
  }

  async create(notification: Notification): Promise<void> {

    //O destruct que fazemos aqui acessa diretamente os métodos com o modificador get, como se fossem atributos da classe
    
    await this.prisma.notification.create({
      data: PrismaNotificationMapper.toPrisma(notification)
    })
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);
    
    //Aqui temos os métodos then, catch finally, pois o prisma retorna uma promise
    await this.prisma.notification.update({
      where: {
        id: notification.id
      },
      data: raw,
    });
  }

}