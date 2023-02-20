import { Controller} from '@nestjs/common';
import { Body, Get, Param, Patch, Post } from '@nestjs/common/decorators';
import { SendNotificationService } from '@application/services/SendNotificationService';
import { CreateNotificationBody } from './dtos/create-notification-body';
import NotificationsControllerMapper from './mapper/NotificationControllerMapper';
import { CancelNotificationService } from '@application/services/CancelNotificationService';
import { ReadNotificationService } from '@application/services/ReadNotificationService';
import { CountRecipientNotificationsService } from '@application/services/CountRecipientNotificationsService';
import { GetRecipientNotificationsService } from '@application/services/GetRecipientNotificationsService';


//O nestjs utiliza um conceito chamado decorator através do '@' os decorators (decorar) acoplam funcionamento de uma maneira mágica à aplicação
//O decorator Controller transforma a classe a baixo em uma controller
@Controller('notifications')
export class NotificationsController {
  /*O next utiliza a inversão de dependência ao invés do app.controller buscar a funcionalidade em outro arquivo,
  ele recebe a funcionalidade como um parâmetro quando a classe será instanciada semelhante ao pattern repository do laravel*/
  constructor(private sendNotification: SendNotificationService, 
    private cancelNotification: CancelNotificationService,
    private readNotification: ReadNotificationService,
    private countRecipientNotification: CountRecipientNotificationsService,
    private getRecipientNotification: GetRecipientNotificationsService) {}


  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string){
    const {notifications} = await this.getRecipientNotification.execute({
     recipientId: recipientId
    });

    return notifications.map(NotificationsControllerMapper.toHttp);
  }

  //Para obter o corpo da requisição, o nest também utiliza decorators nesse caso um que se chama body
  @Post()
  async create(@Body() body: CreateNotificationBody){

    const {content, category, recipientId} = body;    

    const {notification} = await this.sendNotification.execute({
      content,
      category,
      recipientId
    });

    return {
        notification: NotificationsControllerMapper.toHttp(notification),
    };

  }

  /*Não utilizamos o decorator delete, pois estamos atualizando um campo específico da notificação, então o método patch serve 
  bem para esse fim*/
  @Patch('cancel/:id')
  async cancel(@Param('id') id: string){
    await this.cancelNotification.execute({
      id
    });
  }

  @Patch('read/:id')
  async read(@Param('id') id:string, @Body('read') read: boolean){

/*     console.log(read);
    return; */

    await this.readNotification.execute({
      id,
      read
    })
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string){
    const {count} = await this.countRecipientNotification.execute({
      recipientId,
    })

    return count;
  }

}
