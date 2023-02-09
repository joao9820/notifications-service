import { Controller} from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';
import { SendNotificationService } from '@application/services/SendNotificationService';
import { CreateNotificationBody } from './dtos/create-notification-body';


//O nestjs utiliza um conceito chamado decorator através do '@' os decorators (decorar) acoplam funcionamento de uma maneira mágica à aplicação
//O decorator Controller transforma a classe a baixo em uma controller
@Controller('notifications')
export class NotificationsController {
  /*O next utiliza a inversão de dependência ao invés do app.controller buscar a funcionalidade em outro arquivo,
  ele recebe a funcionalidade como um parâmetro quando a classe será instanciada semelhante ao pattern repository do laravel*/
  constructor(private sendNotification: SendNotificationService) {}

  //Para obter o corpo da requisição, o nest também utiliza decorators nesse caso um que se chama body
  @Post()
  async create(@Body() body: CreateNotificationBody){

    const {recipientId, content, category} = body;

    const {notification} = await this.sendNotification.execute({
      content,
      category,
      recipientId
    });

    return {notification};

  }

}
