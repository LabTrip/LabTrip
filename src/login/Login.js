import {v4 as uuidv4} from 'uuid';
import sha256 from 'crypto-js/sha256'

export default class Login{
  constructor(email, senha, permissaoId){
      this.email = email;
      this.senha = sha256(senha).toString();
      this.permissaoId = permissaoId;
      token = null;
  }
}