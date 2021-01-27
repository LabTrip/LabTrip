import {v4 as uuidv4} from 'uuid';
import sha256 from 'crypto-js/sha256'

export default class Usuario{
  constructor(nome, email, senha, telefone, foto, perfilId, id = uuidv4()){
      this.id = id;
      this.nome = nome;
      this.email = email;
      this.telefone = telefone;
      this.foto = foto;
      this.perfilId = perfilId;
      this.senha = sha256(senha).toString();
  }
}