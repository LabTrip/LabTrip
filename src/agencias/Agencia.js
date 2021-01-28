import {v4 as uuidv4} from 'uuid';
import sha256 from 'crypto-js/sha256'

export default class Agencia{
  constructor(nome, id = uuidv4()){
      this.id = id;
      this.nome = nome;
      this.criadoEm = new Date().toISOString();
      this.editadoEm = new Date().toISOString();
      this.deletadoEm = null;
  }
}