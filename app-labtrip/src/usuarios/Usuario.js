import {v4 as uuidv4} from 'uuid';
import sha256 from 'crypto-js/sha256'

export default class Usuario{
  constructor(nome, email, senha, telefone, foto, permissaoID, id = uuidv4()){
      this.id = id;
      this.nome = nome;
      this.email = email;
      this.telefone = telefone;
      this.foto = foto;
      this.permissaoID = permissaoID;
      this.senha = sha256(senha).toString();
      this.createdAt = new Date().toISOString();
      this.updatedAt = new Date().toISOString();
      this.deletedAt = null;
  }
}