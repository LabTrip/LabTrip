export default class RoteiroAtividadeRepository{
  constructor(client){
    this.client = client;
  }

  async buscaTodos(req){
    switch(req.acesso.tipoAcesso){          
      case 'Total': 
       return await this.buscaTodos_AcessoTotal();
       break;
      case 'Gerencial':
          return await this.buscaTodos_AcessoGerencial(req.token.agenciaId);
        break;
      case 'Parcial':
        return await this.buscaTodos_AcessoParcial(req.token.id);
        break;
      default:
        return undefined;
    }
}

  async buscaTodos_AcessoTotal(){
      return await this.client('roteiro_atividade');
  }

  async buscaTodos_AcessoGerencial(agenciaId){
    return await this.client('roteiro_atividade')
    .innerJoin('roteiro', 'roteiroAtividade.roteiroId', 'roteiro.id')
    .innerJoin('viagem', 'roteiro.viagemId', 'viagem.id')
    .where({'viagem.agenciaId': agenciaId.toString()});    
  }

  async buscaTodos_AcessoParcial(usuarioId){
    return await this.client('roteiro_atividade')
    .innerJoin('roteiro', 'roteiro_atividade.roteiroId', 'roteiro.id')
    .innerJoin('viagem', 'roteiro.viagemId', 'viagem.id')
    .innerJoin('usuario_viagem', 'viagem.id', 'usuario_viagem.viagemId')
      .where({'usuario_viagem.usuarioId': usuarioId.toString()});
  }

  async buscaPorId(req){
    switch(req.acesso.tipoAcesso){          
      case 'Total': 
       return await this.buscaPorId_AcessoTotal(req.params.atividadeId, req.params.roteiroId, req.params.versaoRoteiro);
       break;
      case 'Gerencial':
          return await this.buscaPorId_AcessoGerencial(req.params.atividadeId, req.params.roteiroId, req.params.versaoRoteiro, req.token.agenciaId);
        break;
      case 'Parcial':
        return await this.buscaPorId_AcessoParcial(req.params.atividadeId, req.params.roteiroId, req.params.versaoRoteiro, req.token.id);
        break;
      default:
        return undefined;
    }

  }

  async buscaPorId_AcessoTotal(atividadeId, roteiroId, versaoRoteiro){
    return await this.client('roteiro_atividade')
      .where({'atividadeId': atividadeId})
      .andWhere({'roteiroId': roteiroId})
      .andWhere({'versaoRoteiro': versaoRoteiro}).first();
  }

  async buscaPorId_AcessoGerencial(atividadeId, roteiroId, versaoRoteiro, agenciaId){
    return await this.client.select(['roteiro_atividade.*']).from('roteiro_atividade')
      .innerJoin('viagem', 'roteiro_atividade.viagemId', 'viagem.id')
      .where({'atividadeId': atividadeId})
      .andWhere({'roteiroId': roteiroId})
      .andWhere({'versaoRoteiro': versaoRoteiro.toString()})
      .andWhere({'viagem.agenciaId': agenciaId.toString()}).first();
  }

  async buscaPorId_AcessoParcial(atividadeId, roteiroId, versaoRoteiro, usuarioId){
    return await this.client.select(['roteiro_atividade.*', ]).from('roteiro_atividade')
      .innerJoin('viagem', 'roteiro_atividade.viagemId', 'viagem.id')
      .innerJoin('usuario_viagem', 'viagem.id', 'usuario_viagem.viagemId')
      .where({'atividadeId': atividadeId.toString()})
      .andWhere({'roteiroId': roteiroId.toString()})
      .andWhere({'versaoRoteiro': versaoRoteiro.toString()})
      .andWhere({'usuario_viagem.usuarioId': usuarioId.toString()}).first();
  }

  async salva(roteiroAtividade){
    const [firstRow] = await this.client('roteiro_atividade') 
    .insert({
      atividadeId: roteiroAtividade.atividadeId,
      roteiroId: roteiroAtividade.roteiroId,
      versaoRoteiro: roteiroAtividade.versaoRoteiro,
      dataInicio: roteiroAtividade.dataInicio,
      dataFim: roteiroAtividade.dataFim,
      custo: roteiroAtividade.custo,
      statusId: roteiroAtividade.statusId,
      observacaoCliente: roteiroAtividade.observacaoCliente,
      observacaoAgente: roteiroAtividade.observacaoAgente,
    })
    .returning("*");  
    return firstRow;      
  }

  async atualiza(roteiroAtividade){
    const [firstRow] = await this.client('roteiro_atividade')
    .where({'atividadeId': roteiroAtividade.atividadeId})
    .andWhere({'roteiroId': roteiroAtividade.roteiroId})
    .andWhere({'versaoRoteiro': roteiroAtividade.versaoRoteiro})
    .update({      
      dataInicio: roteiroAtividade.dataInicio,
      dataFim: roteiroAtividade.dataFim,
      custo: roteiroAtividade.custo,
      statusId: roteiroAtividade.statusId,
      observacaoCliente: roteiroAtividade.observacaoCliente,
      observacaoAgente: roteiroAtividade.observacaoAgente,
    })

    .returning("*");

    return firstRow;
  }

  async deleta(roteiroAtividade){
    await this.client('roteiro_atividade')
    .where({'atividadeId': roteiroAtividade.atividadeId})
    .andWhere({'roteiroId': roteiroAtividade.roteiroId})
    .andWhere({'versaoRoteiro': roteiroAtividade.versaoRoteiro}).first()
    .delete()
  }
}