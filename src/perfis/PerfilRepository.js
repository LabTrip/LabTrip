export default class AgenciaRepository{
    constructor(client){
      this.client = client;
    }
  
    async buscaTodos(){
      return await this.client('perfil');
    }

    async buscaPorId(id){
      return await this.client('perfil')
        .where({'id': id.toString()}).first();
    }

  }