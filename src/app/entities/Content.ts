export class Content {

  /*Essa classe foi criada a partir do conceito de object value, que separe em classes um atributo da entidade principal (notification) que possui funcionamento
  específico, como validações, formatações, etc. */
  /* O objetivo principal é, não "sujar" a classe principal com validações de atributos específicos */
  private readonly content: string;

  private validateContentLength(content: string) {
    return content.length >= 5 && content.length <= 240;
  }

  constructor(content: string){

    if(!this.validateContentLength(content)){
      throw new Error('Content Lenght Error.');
    }

    this.content = content;
  }

  //value e não content por que se não ao chamar seria utilizado content.content (objeto)
  get value() {
    return this.content;
  }

}