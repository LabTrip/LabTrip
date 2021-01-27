export default class LoginRepository{
    constructor(client){
      this.client = client;
    }
  
    async getByEmail(email){
      return await this.client('usuario')
        .where({'email': email.toString()}).first();
    }
  
    
  }