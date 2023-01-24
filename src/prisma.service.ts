import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/* Quando utilizamos OnModuleInit nós podemos implementar o método onModuleInit que basicamente avisa ao nest para assim que a aplicação iniciar
ele execute algo, nesse caso, realize a conexão com o prisma */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  //Esse método tem um "eventListener" que verifica se a conexão com o BD cair a aplicação seja encerrada
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}