export default class LoginRepository{
    constructor(client){
      this.client = client;
    }
  
    async buscaPorEmail(email){
      return await this.client('usuario')
        .where({'email': email.toString()}).first();
    }
  
    
  }