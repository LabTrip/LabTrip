export default class RoteiroAtividadeRepository{
  constructor(client){
    this.client = client;
  }

  async buscaTodos(){
      return await this.client('roteiroAtividade');
  }

  async buscaTodos_AcessoGerencial(agenciaId){
    return await this.client('roteiroAtividade')
    .innerJoin('roteiro', 'roteiroAtividade.roteiroId', 'roteiro.id')
    .innerJoin('viagem', 'roteiro.viagemId', 'viagem.id')
    .where({'viagem.agenciaId': agenciaId.toString()});    
  }

  async buscaTodos_AcessoParcial(usuarioId){
    return await this.client('roteiroAtividade')
    .innerJoin('roteiro', 'roteiroAtividade.roteiroId', 'roteiro.id')
    .innerJoin('viagem', 'roteiro.viagemId', 'viagem.id')
    .innerJoin('usuario_viagem', 'viagem.id', 'usuario_viagem.viagemId')
      .where({'usuario_viagem.usuarioId': usuarioId.toString()});
  }

  async salva(roteiroAtividade){
    const [firstRow] = await this.client('roteiroAtividade')
    .insert(roteiroAtividade)
    .returning("*");  
      return firstRow;    
  }

  async buscaPorId(atividadeId, roteiroId, versaoRoteiro){
    return await this.client('roteiroAtividade')
      .Where({'atividadeId': atividadeId.toString()})
      .andWhere({'roteiroId': roteiroId.toString()})
      .andWhere({'versaoRoteiro': versaoRoteiro.toString()}).first();
  }

  async buscaPorId_AcessoGerencial(atividadeId, roteiroId, versaoRoteiro, agenciaId){
    return await this.client.select(['roteiroAtividade.*']).from('roteiroAtividade')
      .innerJoin('viagem', 'roteiroAtividade.viagemId', 'viagem.id')
      .Where({'atividadeId': atividadeId.toString()})
      .andWhere({'roteiroId': roteiroId.toString()})
      .andWhere({'versaoRoteiro': versaoRoteiro.toString()})
      .andWhere({'viagem.agenciaId': agenciaId.toString()}).first();
  }

  async buscaPorId_AcessoParcial(atividadeId, roteiroId, versaoRoteiro, usuarioId){
    return await this.client.select(['roteiroAtividade.*', ]).from('roteiroAtividade')
      .innerJoin('viagem', 'roteiroAtividade.viagemId', 'viagem.id')
      .innerJoin('usuario_viagem', 'viagem.id', 'usuario_viagem.viagemId')
      .Where({'atividadeId': atividadeId.toString()})
      .andWhere({'roteiroId': roteiroId.toString()})
      .andWhere({'versaoRoteiro': versaoRoteiro.toString()})
      .andWhere({'usuario_viagem.usuarioId': usuarioId.toString()}).first();
  }

  async atualiza(roteiroAtividade){
    const [firstRow] = await this.client('roteiroAtividade')
    .Where({'atividadeId': roteiroAtividade.atividadeId.toString()})
    .andWhere({'roteiroId': roteiroAtividade.roteiroId.toString()})
    .andWhere({'versaoRoteiro': roteiroAtividade.versaoRoteiro.toString()})
      .update()
      .returning("*");

      return firstRow;
  }

  async deleta(roteiroAtividade){
    await this.client('roteiroAtividade')
    .Where({'atividadeId': roteiroAtividade.atividadeId.toString()})
    .andWhere({'roteiroId': roteiroAtividaderoteiroId.toString()})
    .andWhere({'versaoRoteiro': roteiroAtividade.versaoRoteiro.toString()})
      .del()
  }
}