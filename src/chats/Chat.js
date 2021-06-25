
export default class Chat{
    constructor(nome, viagemId, topicoId, id=null){
      this.id = id;
      this.nome = nome;
      this.viagemId = viagemId;
      this.topicoId = topicoId;
    }
  }