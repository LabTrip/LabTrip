
export default class Roteiro{
    constructor(viagemId, statusId, versao, id=null){
      this.id = id;
      this.viagemId = viagemId;
      this.statusId = statusId;
      this.versao = versao;
    }
  }