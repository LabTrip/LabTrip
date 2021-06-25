export default class VotacaoRepository{
    constructor(client){
      this.client = client;
    }
  
    async buscaTodos(){
    
      return await this.client('votacao');
    }
  
    async salva(votacao){
      console.log(votacao)
      const [firstRow] = await this.client('votacao')
        .insert({
          roteiroAtividadeId: votacao.roteiroAtividadeId,
          usuarioId: votacao.usuarioId,
          gostou: votacao.gostou
        })
        .returning("*");
  
        return firstRow;
    }
  

    async buscaPorId(req){
      switch(req.acesso.tipoAcesso){          
        case 'Total': 
         return await this.buscaPorId_AcessoTotal(req.params.roteiroAtividadeId, req.params.usuarioId);
         break;
        case 'Gerencial':
            return await this.buscaPorId_AcessoGerencial(req.params.roteiroAtividadeId, req.params.usuarioId, req.token.agenciaId);
          break;
        case 'Parcial':
          return await this.buscaPorId_AcessoParcial(req.params.roteiroAtividadeId, req.params.usuarioId, req.token.id);
          break;
        default:
          return undefined;
      }
  
    }
  
    async buscaPorId_AcessoTotal(roteiroAtividadId, usuarioId){
      return await this.client.from('votacao')
        .where({'votacao.roteiroAtividadeId': roteiroAtividadId.toString()})
        .andWhere({'votacao.usuarioId': usuarioId.toString()}).first();
    }
  
    async buscaPorId_AcessoGerencial(roteiroAtividadeId, usuarioId, agenciaId){
      return await this.client.select(['votacao.*']).from('votacao')
        .innerJoin('roteiro_atividade', 'votacao.roteiroAtividadeId', 'roteiro_atividade.id')
        .innerJoin('viagem', 'roteiro_atividade.viagemId', 'viagem.id')
        .where({'votacao.roteiroAtividadeId': roteiroAtividadeId.toString()})
        .andWhere({'votacao.usuarioId': usuarioId.toString()})
        .andWhere({'viagem.agenciaId': agenciaId.toString()}).first();
    }
  
    async buscaPorId_AcessoParcial(roteiroAtividadeId, usuarioId, usuarioIdToken){
      return await this.client.select(['votacao.*']).from('votacao')
      .innerJoin('roteiro_atividade', 'votacao.roteiroAtividadeId', 'roteiro_atividade.id')
      .innerJoin('viagem', 'roteiro_atividade.viagemId', 'viagem.id')
      .innerJoin('usuario_viagem', 'viagem.id', 'usuario_viagem.viagemId')
      .where({'votacao.roteiroAtividadeId': roteiroAtividadeId.toString()})
      .andWhere({'votacao.usuarioId': usuarioId.toString()})
      .andWhere({'usuario_viagem.usuarioId': usuarioIdToken.toString()}).first();

    }

    async buscaTodosPorRoteiroAtividade(req){
      switch(req.acesso.tipoAcesso){          
        case 'Total': 
         return await this.buscaTodosPorRoteiroAtividade_AcessoTotal(req.params.roteiroAtividadeId);
         break;
        case 'Gerencial':
            return await this.buscaTodosPorRoteiroAtividade_AcessoGerencial(req.params.roteiroAtividadeId, req.token.agenciaId);
          break;
        case 'Parcial':
          return await this.buscaTodosPorRoteiroAtividade_AcessoParcial(req.params.roteiroAtividadeId, req.token.id);
          break;
        default:
          return undefined;
      }
  
    }
  
    async buscaTodosPorRoteiroAtividade_AcessoTotal(roteiroAtividadId){
      return await this.client.from('votacao')
        .where({'votacao.roteiroAtividadeId': roteiroAtividadId.toString()});
    }
  
    async buscaTodosPorRoteiroAtividade_AcessoGerencial(roteiroAtividadeId, agenciaId){
      return await this.client.select(['votacao.*']).from('votacao')
        .innerJoin('roteiro_atividade', 'votacao.roteiroAtividadeId', 'roteiro_atividade.id')
        .innerJoin('viagem', 'roteiro_atividade.viagemId', 'viagem.id')
        .where({'votacao.roteiroAtividadeId': roteiroAtividadeId.toString()})
        .andWhere({'viagem.agenciaId': agenciaId.toString()});
    }
  
    async buscaTodosPorRoteiroAtividade_AcessoParcial(roteiroAtividadeId, usuarioId, usuarioIdToken){
      return await this.client.select(['votacao.*']).from('votacao')
      .innerJoin('roteiro_atividade', 'votacao.roteiroAtividadeId', 'roteiro_atividade.id')
      .innerJoin('viagem', 'roteiro_atividade.viagemId', 'viagem.id')
      .innerJoin('usuario_viagem', 'viagem.id', 'usuario_viagem.viagemId')
      .where({'votacao.roteiroAtividadeId': roteiroAtividadeId.toString()})
      .andWhere({'usuario_viagem.usuarioId': usuarioIdToken.toString()});

    }
  
    async atualiza(votacao){
      const [firstRow] = await this.client('votacao')
        .where({'votacao.roteiroAtividadeId': votacao.roteiroAtividadeId})
        .andWhere({'usuarioId': votacao.usuarioId})
        .update({
          gostou: votacao.gostou
        })
        .returning("*");
  
        return firstRow;
    }
  
    async deleta(votacao){
      await this.client('votacao')
      .where({'roteiroAtividadeId': votacao.roteiroAtividadeId})
      .andWhere({'usuarioId': votacao.usuarioId})
        .delete();
    }
  }