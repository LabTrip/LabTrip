export default class AgenciaRepository{
    constructor(client){
      this.client = client;
    }
  
    async buscaAcesso(acesso){
      return await this.client('acesso_rota')
        .where({'endpoint': acesso.endpoint.toString()})
        .andWhere({'metodo': acesso.metodo.toString()})
        .andWhere({'perfilId': acesso.perfilId.toString()})
        .first();
    }
  }