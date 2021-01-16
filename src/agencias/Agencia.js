import {v4 as uuidv4} from 'uuid';
import sha256 from 'crypto-js/sha256'

export default class Agencia{
  constructor(nome, ID = uuidv4()){
      this.ID = ID;
      this.nome = nome;
      this.createdAt = new Date().toISOString();
      this.updatedAt = new Date().toISOString();
      this.deletedAt = null;
  }
}