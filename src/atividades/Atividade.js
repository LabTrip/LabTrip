import {v4 as uuidv4} from 'uuid';

export default class Atividade{
  constructor(descricao, localId = null, id = uuidv4()){
      
      this.id = id;
      this.descricao = descricao;
      this.localId = localId;
      this.criadoEm = new Date().toISOString();
      this.editadoEm = new Date().toISOString();
      this.deletadoEm = null;
  }
}