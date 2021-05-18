
export default class Roteiro{
    constructor(viagemId, statusId, versao, descricaoRoteiro, id=null){
      this.id = id;
      this.viagemId = viagemId;
      this.statusId = statusId;
      this.descricaoRoteiro = descricaoRoteiro;
      this.versao = versao;
    }
  }