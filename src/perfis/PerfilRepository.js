export default class PerfilRepository{
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