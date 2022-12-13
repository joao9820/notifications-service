import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailService } from './mail/mail.service';
import { PostmarkMailService } from './mail/postmark.service';
import { SMTPMailService } from './mail/smtp-mail.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, 
    //Ao utilizar classes abstratas ou interfaces devemos utilizar dessa forma
    {
     provide: MailService,
     useClass: PostmarkMailService       
    }
  ],
})
export class AppModule {}

//Injenção de dependência, forma de automatizar a inserção das dependências, quando as classes forem instanciadas, semelhante ao serviceProviders do laravel
//Para isso basta que a classe tenha o decorator @Injectable
//Automaticamente o nest passa uma instancia da classe AppService dentro do constructor do controller
//O Module acopla vários controllers e vários services, um Module pode importar outro também
