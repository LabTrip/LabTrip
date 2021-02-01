import {v4 as uuidv4} from 'uuid';


export default class Login{
  constructor(id, nome, email, foto, telefone, perfilId, token, codigo){
    this.id = id;  
    this.nome = nome;  
    this.email = email;
    this.foto = foto;
    this.telefone = telefone;
    this.perfilId = perfilId;
    this.token = token;
    this.codigo = codigo;
  }
}