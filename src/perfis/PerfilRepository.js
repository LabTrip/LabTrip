export default class PerfilRepository{
    constructor(client){
      this.client = client;
    }
  
    async buscaTodos(){
      return await this.client('perfil');
    }

    async buscaTodos_AcessoGerencial(){
      return await this.client('perfil')
      .whereIn('descricao', ['Gerente de agencia', 'Agente', 'Cliente']);
    }

    async buscaTodos_AcessoParcial(){
      return await this.client('perfil')
      .whereIn('descricao', ['Cliente']);
    }

    async buscaPorId(id){
      return await this.client('perfil')
        .where({'id': id.toString()}).first();
    }

  }