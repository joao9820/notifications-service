import { Controller, Get } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';
import { AppService } from './app.service';
import { MailService } from './mail/mail.service';
import { PrismaService } from './prisma.service';
import {randomUUID} from 'node:crypto';

//O nestjs utiliza um conceito chamado decorator através do '@' os decorators (decorar) acoplam funcionamento de uma maneira mágica à aplicação
//O decorator Controller transforma a classe a baixo em uma controller
@Controller('notifications')
export class AppController {
  /*O next utiliza a inversão de dependência ao invés do app.controller buscar a funcionalidade em outro arquivo,
  ele recebe a funcionalidade como um parâmetro quando a classe será instanciada semelhante ao pattern repository do laravel*/
  constructor(private readonly prisma: PrismaService, private readonly mailService: MailService) {}

  //Os decorators podem receber paramêtros, no caso do get o primeiro argumento seria um path para a controller (endereço da rota)
  @Get()
  list() {
    return this.prisma.notification.findMany();
  }

  //Para obter o corpo da requisição, o nest também utiliza decorators nesse caso um que se chama body
  @Post()
  async create(@Body() body: any){

    const {recipientId, content, category} = body;
    //console.log(body);

    await this.prisma.notification.create({
      data: {
        id: randomUUID(),
        content,
        category,
        recipientId,
      }
    })
  }

  @Get('mail')
  sendEmail(): string {
    //O controller não sabe o conteúdo mailService ele apenas executa o método sendEmail, quem diz o que vai executar é o app.module
    return this.mailService.sendEmail();
  }
  

}
