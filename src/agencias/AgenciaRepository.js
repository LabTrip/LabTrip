export default class AgenciaRepository{
    constructor(client){
      this.client = client;
    }
  
    async buscaTodos(){
      return await this.client('agencia');
    }
  
    async salva(agencia){
      const [firstRow] = await this.client('agencia')
        .insert(agencia)
        .returning("*");
  
        return firstRow;
    }

    async salvaFuncionario(usuarioId, agenciaId){
      const [firstRow] = await this.client('funcionario')
        .insert({
          usuarioId: usuarioId,
          agenciaId: agenciaId,
          registradoEm: new Date().toISOString()
        })
        .returning("*");
  
        return firstRow;
    }

    async buscaFuncionariosAgencia(agenciaId){
      return await this.client.select(['usuario.*','funcionario.*'])
        .from('funcionario')
        .innerJoin('usuario','usuario.id','funcionario.usuarioId')
        .where({'agenciaId': agenciaId.toString()});
    }

    async deletaFuncionariosAgencia(usuarioId, agenciaId){
      return await this.client('funcionario')
        .where({'agenciaId': agenciaId.toString()})
        .andWhere({'usuarioId': usuarioId.toString()})
        .delete();
    }
  
    async buscaPorId(id){
      return await this.client('agencia')
        .where({'id': id.toString()}).first();
    }

    async buscaPorId_AcessoParcial(id, agenciaId){
      return await this.client('agencia')
        .where({'id': id.toString()})
        .orWhere({'id': agenciaId.toString()}).first();
    }
  
    async atualiza(agencia){
      const [firstRow] = await this.client('agencia')
        .where({'id': agencia.id})
        .update({
          nome: agencia.nome,
          editadoEm: new Date().toISOString()
        })
        .returning("*");
  
        return firstRow;
    }
  
    async deleta(agencia){
      await this.client('agencia')
        .where({'id': agencia.id})
        .update({
          deletadoEm: new Date().toISOString()
        })
    }
  }