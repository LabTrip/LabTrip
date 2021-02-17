import {v4 as uuidv4} from 'uuid';


export default class Login{
  constructor(id, email, perfilId, token){
    this.id = id;
    this.email = email;
    this.perfilId = perfilId;
    this.token = token;
  }
}