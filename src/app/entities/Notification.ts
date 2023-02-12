import { randomUUID } from "node:crypto";
import { Replace } from "@helpers/Replace";
import { Content } from "./Content";


interface NotificationProps {
  recipientId: string;
  content: Content;
  category: string;
  /*Null aqui seria um valor vazio, por exemplo ao criar uma notificação não precisamos passar readAt, porém ao atualizar
  uma notificação poderíamos setar null, para que apenas quando o usuário lesse novamente, o valor de Date fosse setado, por isso precisamos 
  dos 3 tipos*/
  readAt?: Date | null; 
  cancelAt?: Date | null;
  createdAt: Date;
}

export class Notification {
  private _id: string; //_id pois o método get pode se chamar id apenas, se fosse o mesmo nome não poderia
  private props: NotificationProps;
  //private content: string;

  constructor(props: Replace<NotificationProps, {createdAt?:Date}>) {
    /*isso para evitar que ao criar um objeto e tentar setar um valor a um atributo exemplo: notification.content = "teste" 
    a classe não reclame de identificadores duplicados (o que também porderia ser resolvido utilizar set e get antes de content, ex: 
      setContent seria diferente do attr content)*/
    this._id = randomUUID(); //gera o id único universal
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(){
    //Futuramente, como todas as entinties possuem um id, pode se criar uma classe separada para tal informação e importá-la
    return this._id;
  }

  public set recipientId(recipientId: string){
    this.props.recipientId = recipientId;
  }

  public get recipientId(){
    return this.props.recipientId;
  }

  /*No JS os getters e setters não precisam conter get e set no nome do método, mas é uma palava reservada que define o comportamento
  do método, facilitando a chamada*/

  public set content(content: Content){
    //Uma das vantagens de setar um atribute através de um setter é que é possível realizar algum tipo de validação antes de passar o valor simplesmente
    this.props.content = content;
  }

  public get content(){
    return this.props.content;
  }

  public set category(category: string){
    this.props.category = category;
  }

  public get category(){
    return this.props.category;
  }

  /*o Typescript tem algumas formas de checagem, com o strict mode ativado, no tsconfig.json ele realiza uma checagem de tipo mais
  profunda, é necessário ativar para entender que readAt deve ser Date | null | undefined, pois dessa forma considera o null e undefined
  como possíveis valores de retorno e de envio*/
  public set readAt(readAt: Date | null | undefined){
    this.props.readAt = readAt;
  }

  public get readAt(): Date | null | undefined{
    return this.props.readAt;
  }

  //Não precisamos de um método set para data de criação, apenas precisamos buscar esse valor que é setado pelo próprio DB
  public get createdAt(){
    return this.props.createdAt;
  }


}

/* Exemplo de instância de Classe  */

/*
const notification = new Notification({
  content: 'dasfdaf',
  category: 'social',
});

//Maneira de chamar o set no JS
//notification.content = "dfafasdf";
*/