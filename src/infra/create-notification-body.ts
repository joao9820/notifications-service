import {IsNotEmpty, IsUUID, Length} from 'class-validator';  

export class CreateNotificationBody {
  /* Ao utilizar os decorators prestar atenção se estão sendo importados certos os tipos para validação, que não tem params obrigatórios */
  @IsNotEmpty()
  @IsUUID()
  recipientId: string;

  @IsNotEmpty()
  @Length(5, 240)
  content: string;

  @IsNotEmpty()
  category: string;
}