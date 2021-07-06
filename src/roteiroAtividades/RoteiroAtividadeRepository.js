export default class RoteiroAtividadeRepository{
  constructor(client){
    this.client = client;
  }

  async buscaTodos(req){
    console.log(req.acesso.tipoAcesso)
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
      return await this.client.select('local.*', 'atividade.*','subqueryPositivo.positivo','subqueryNegativo.negativo','roteiro_atividade.*').from('roteiro_atividade')
      .innerJoin('atividade', 'roteiro_atividade.atividadeId', 'atividade.id')
      .innerJoin('local', 'atividade.localId', 'local.id')
      .leftJoin(((builder) => { builder
        .select('roteiroAtividadeId').from('votacao')      
        .count('votacao.gostou as positivo')
        .where({'votacao.gostou': true})
        .groupBy('votacao.roteiroAtividadeId')
        .as('subqueryPositivo')
        }), 'subqueryPositivo.roteiroAtividadeId','roteiro_atividade.id')
      .leftJoin(((builder) => { builder
        .select('roteiroAtividadeId').from('votacao')      
        .count('votacao.gostou as negativo')
        .where({'votacao.gostou': false})
        .groupBy('votacao.roteiroAtividadeId')
        .as('subqueryNegativo')
        }), 'subqueryNegativo.roteiroAtividadeId','roteiro_atividade.id')
     
  }

  async buscaTodos_AcessoGerencial(agenciaId){
    return await this.client.select('local.*', 'atividade.*','subqueryPositivo.positivo','subqueryNegativo.negativo','roteiro_atividade.*').from('roteiro_atividade')
    .innerJoin('atividade', 'roteiro_atividade.atividadeId', 'atividade.id')
    .innerJoin('local', 'atividade.localId', 'local.id')
    .innerJoin('roteiro', function() {
      this.on(function() {
        this.on('roteiro_atividade.roteiroId', '=', 'roteiro.id')
        this.andOn('roteiro_atividade.versaoRoteiro', '=', 'roteiro.versao')
      })
    })
    .innerJoin('viagem', 'roteiro.viagemId', 'viagem.id')
    .leftJoin(((builder) => { builder
      .select('roteiroAtividadeId').from('votacao')      
      .count('votacao.gostou as positivo')
      .where({'votacao.gostou': true})
      .groupBy('votacao.roteiroAtividadeId')
      .as('subqueryPositivo')
      }), 'subqueryPositivo.roteiroAtividadeId','roteiro_atividade.id')
    .leftJoin(((builder) => { builder
      .select('roteiroAtividadeId').from('votacao')      
      .count('votacao.gostou as negativo')
      .where({'votacao.gostou': false})
      .groupBy('votacao.roteiroAtividadeId')
      .as('subqueryNegativo')
      }), 'subqueryNegativo.roteiroAtividadeId','roteiro_atividade.id')
    .where({'viagem.agenciaId': agenciaId.toString()});    
  }

  async buscaTodos_AcessoParcial(usuarioId){
    return await this.client.select( 'local.*', 'atividade.*','subqueryPositivo.positivo','subqueryNegativo.negativo','roteiro_atividade.*').from('roteiro_atividade')
    .innerJoin('atividade', 'roteiro_atividade.atividadeId', 'atividade.id')
    .innerJoin('local', 'atividade.localId', 'local.id')
    .innerJoin('roteiro', function() {
      this.on(function() {
        this.on('roteiro_atividade.roteiroId', '=', 'roteiro.id')
        this.andOn('roteiro_atividade.versaoRoteiro', '=', 'roteiro.versao')
      })
    })
    .innerJoin('viagem', 'roteiro.viagemId', 'viagem.id')
    .innerJoin('usuario_viagem', 'viagem.id', 'usuario_viagem.viagemId')
    .leftJoin(((builder) => { builder
      .select('roteiroAtividadeId').from('votacao')      
      .count('votacao.gostou as positivo')
      .where({'votacao.gostou': true})
      .groupBy('votacao.roteiroAtividadeId')
      .as('subqueryPositivo')
      }), 'subqueryPositivo.roteiroAtividadeId','roteiro_atividade.id')
    .leftJoin(((builder) => { builder
      .select('roteiroAtividadeId').from('votacao')      
      .count('votacao.gostou as negativo')
      .where({'votacao.gostou': false})
      .groupBy('votacao.roteiroAtividadeId')
      .as('subqueryNegativo')
      }), 'subqueryNegativo.roteiroAtividadeId','roteiro_atividade.id')
      .where({'usuario_viagem.usuarioId': usuarioId.toString()});
  
  }

  async buscaTodosPorRoteiro(req){
    //console.log(req)
    switch(req.acesso.tipoAcesso){          
      case 'Total':
       return await this.buscaTodosPorRoteiro_AcessoTotal(req.params.roteiroId, req.params.versaoRoteiro);
       break;
      case 'Gerencial':
          return await this.buscaTodosPorRoteiro_AcessoGerencial(req.token.agenciaId, req.params.roteiroId, req.params.versaoRoteiro);
        break;
      case 'Parcial':
        return await this.buscaTodosPorRoteiro_AcessoParcial(req.token.id,req.params.roteiroId, req.params.versaoRoteiro);
        break;
      default:
        return undefined;
    }
  }

  async buscaTodosPorRoteiro_AcessoTotal(roteiroId, versaoRoteiro){
    return await this.client.select('local.*', 'atividade.*','subqueryPositivo.positivo','subqueryNegativo.negativo','roteiro_atividade.*').from('roteiro_atividade')
    .innerJoin('atividade', 'roteiro_atividade.atividadeId', 'atividade.id')
    .innerJoin('local', 'atividade.localId', 'local.id')
    .innerJoin('roteiro', function() {
      this.on(function() {
        this.on('roteiro_atividade.roteiroId', '=', 'roteiro.id')
        this.andOn('roteiro_atividade.versaoRoteiro', '=', 'roteiro.versao')
      })
    })
    .leftJoin(((builder) => { builder
      .select('roteiroAtividadeId').from('votacao')      
      .count('votacao.gostou as positivo')
      .where({'votacao.gostou': true})
      .groupBy('votacao.roteiroAtividadeId')
      .as('subqueryPositivo')
      }), 'subqueryPositivo.roteiroAtividadeId','roteiro_atividade.id')
    .leftJoin(((builder) => { builder
      .select('roteiroAtividadeId').from('votacao')      
      .count('votacao.gostou as negativo')
      .where({'votacao.gostou': false})
      .groupBy('votacao.roteiroAtividadeId')
      .as('subqueryNegativo')
      }), 'subqueryNegativo.roteiroAtividadeId','roteiro_atividade.id')
    .where({'roteiroId': roteiroId.toString()})
    .andWhere({'versaoRoteiro': versaoRoteiro.toString()})
    .orderBy('roteiro_atividade.dataInicio','asc');;
  }

  async buscaTodosPorRoteiro_AcessoGerencial(agenciaId,roteiroId, versao){
    return await this.client.select('local.*', 'atividade.*','subqueryPositivo.positivo','subqueryNegativo.negativo','roteiro_atividade.*').from('roteiro_atividade')
    .innerJoin('atividade', 'roteiro_atividade.atividadeId', 'atividade.id')
    .innerJoin('local', 'atividade.localId', 'local.id')
    .innerJoin('roteiro', function() {
      this.on(function() {
        this.on('roteiro_atividade.roteiroId', '=', 'roteiro.id')
        this.andOn('roteiro_atividade.versaoRoteiro', '=', 'roteiro.versao')
      })
    })
    .leftJoin(((builder) => { builder
      .select('roteiroAtividadeId').from('votacao')      
      .count('votacao.gostou as positivo')
      .where({'votacao.gostou': true})
      .groupBy('votacao.roteiroAtividadeId')
      .as('subqueryPositivo')
      }), 'subqueryPositivo.roteiroAtividadeId','roteiro_atividade.id')
    .leftJoin(((builder) => { builder
      .select('roteiroAtividadeId').from('votacao')      
      .count('votacao.gostou as negativo')
      .where({'votacao.gostou': false})
      .groupBy('votacao.roteiroAtividadeId')
      .as('subqueryNegativo')
      }), 'subqueryNegativo.roteiroAtividadeId','roteiro_atividade.id')
    .innerJoin('viagem', 'roteiro.viagemId', 'viagem.id')
    .where({'viagem.agenciaId': agenciaId.toString()})
    .andWhere({'roteiroId': roteiroId.toString()})
    .andWhere({'versaoRoteiro': versao.toString()})
    .orderBy('roteiro_atividade.dataInicio','asc');;   
  }

  async buscaTodosPorRoteiro_AcessoParcial(usuarioId,roteiroId, versao){
    return await this.client.select('local.*', 'atividade.*','subqueryPositivo.positivo','subqueryNegativo.negativo','roteiro_atividade.*').from('roteiro_atividade')
    .innerJoin('atividade', 'roteiro_atividade.atividadeId', 'atividade.id')
    .innerJoin('local', 'atividade.localId', 'local.id')
    .innerJoin('roteiro', function() {
      this.on(function() {
        this.on('roteiro_atividade.roteiroId', '=', 'roteiro.id')
        this.andOn('roteiro_atividade.versaoRoteiro', '=', 'roteiro.versao')
      })
    })
    .leftJoin(((builder) => { builder
      .select('roteiroAtividadeId').from('votacao')      
      .count('votacao.gostou as positivo')
      .where({'votacao.gostou': true})
      .groupBy('votacao.roteiroAtividadeId')
      .as('subqueryPositivo')
      }), 'subqueryPositivo.roteiroAtividadeId','roteiro_atividade.id')
    .leftJoin(((builder) => { builder
      .select('roteiroAtividadeId').from('votacao')      
      .count('votacao.gostou as negativo')
      .where({'votacao.gostou': false})
      .groupBy('votacao.roteiroAtividadeId')
      .as('subqueryNegativo')
      }), 'subqueryNegativo.roteiroAtividadeId','roteiro_atividade.id')
    .innerJoin('viagem', 'roteiro.viagemId', 'viagem.id')
    .innerJoin('usuario_viagem', 'viagem.id', 'usuario_viagem.viagemId')
    .where({'usuario_viagem.usuarioId': usuarioId.toString()})
    .andWhere({'roteiro_atividade.roteiroId': roteiroId.toString()})
    .andWhere({'roteiro_atividade.versaoRoteiro': versao.toString()})
    .orderBy('roteiro_atividade.dataInicio','asc');
  }

  async buscaPorId(req){
    switch(req.acesso.tipoAcesso){          
      case 'Total': 
       return await this.buscaPorId_AcessoTotal(req.params.roteiroAtividadeId);
       break;
      case 'Gerencial':
          return await this.buscaPorId_AcessoGerencial(req.params.roteiroAtividadeId, req.token.agenciaId);
        break;
      case 'Parcial':
        return await this.buscaPorId_AcessoParcial(req.params.roteiroAtividadeId, req.token.id);
        break;
      default:
        return undefined;
    }

  }

  async buscaPorId_AcessoTotal(roteiroAtividadeId){
    return await this.client.select('local.*', 'atividade.*','subqueryPositivo.positivo','subqueryNegativo.negativo','roteiro_atividade.*').from('roteiro_atividade')
    .innerJoin('atividade', 'roteiro_atividade.atividadeId', 'atividade.id')
    .leftJoin(((builder) => { builder
      .select('roteiroAtividadeId').from('votacao')      
      .count('votacao.gostou as positivo')
      .where({'votacao.gostou': true})
      .groupBy('votacao.roteiroAtividadeId')
      .as('subqueryPositivo')
      }), 'subqueryPositivo.roteiroAtividadeId','roteiro_atividade.id')
    .leftJoin(((builder) => { builder
      .select('roteiroAtividadeId').from('votacao')      
      .count('votacao.gostou as negativo')
      .where({'votacao.gostou': false})
      .groupBy('votacao.roteiroAtividadeId')
      .as('subqueryNegativo')
      }), 'subqueryNegativo.roteiroAtividadeId','roteiro_atividade.id')
     .innerJoin('local', 'atividade.localId', 'local.id')
      .where({'roteiro_atividade.id': roteiroAtividadeId.toString()}).first();
  }

  async buscaPorId_AcessoGerencial(roteiroAtividadeId, agenciaId){
    return await this.client.select('local.*', 'atividade.*','subqueryPositivo.positivo','subqueryNegativo.negativo','roteiro_atividade.*').from('roteiro_atividade')
      .innerJoin('atividade', 'roteiro_atividade.atividadeId', 'atividade.id')  
      .innerJoin('roteiro', function() {
          this.on(function() {
            this.on('roteiro_atividade.roteiroId', '=', 'roteiro.id')
            this.andOn('roteiro_atividade.versaoRoteiro', '=', 'roteiro.versao')
          })
        })
      .innerJoin('viagem', 'roteiro.viagemId', 'viagem.id')      
      .leftJoin(((builder) => { builder
        .select('roteiroAtividadeId').from('votacao')      
        .count('votacao.gostou as positivo')
        .where({'votacao.gostou': true})
        .groupBy('votacao.roteiroAtividadeId')
        .as('subqueryPositivo')
        }), 'subqueryPositivo.roteiroAtividadeId','roteiro_atividade.id')
      .leftJoin(((builder) => { builder
        .select('roteiroAtividadeId').from('votacao')      
        .count('votacao.gostou as negativo')
        .where({'votacao.gostou': false})
        .groupBy('votacao.roteiroAtividadeId')
        .as('subqueryNegativo')
        }), 'subqueryNegativo.roteiroAtividadeId','roteiro_atividade.id')
      .innerJoin('local', 'atividade.localId', 'local.id')
        .where({'roteiro_atividade.id': roteiroAtividadeId.toString()})
        .andWhere({'viagem.agenciaId': agenciaId.toString()}).first();
  }

  async buscaPorId_AcessoParcial(roteiroAtividadeId, usuarioId){
    return await this.client.select('local.*', 'atividade.*','subqueryPositivo.positivo','subqueryNegativo.negativo','roteiro_atividade.*').from('roteiro_atividade')
      .innerJoin('atividade', 'roteiro_atividade.atividadeId', 'atividade.id')
      .innerJoin('roteiro', function() {
        this.on(function() {
          this.on('roteiro_atividade.roteiroId', '=', 'roteiro.id')
          this.andOn('roteiro_atividade.versaoRoteiro', '=', 'roteiro.versao')
        })
      })
      .innerJoin('viagem', 'roteiro.viagemId', 'viagem.id')
      .innerJoin('usuario_viagem', 'viagem.id', 'usuario_viagem.viagemId')
      .leftJoin(((builder) => { builder
        .select('roteiroAtividadeId').from('votacao')      
        .count('votacao.gostou as positivo')
        .where({'votacao.gostou': true})
        .groupBy('votacao.roteiroAtividadeId')
        .as('subqueryPositivo')
        }), 'subqueryPositivo.roteiroAtividadeId','roteiro_atividade.id')
      .leftJoin(((builder) => { builder
        .select('roteiroAtividadeId').from('votacao')      
        .count('votacao.gostou as negativo')
        .where({'votacao.gostou': false})
        .groupBy('votacao.roteiroAtividadeId')
        .as('subqueryNegativo')
        }), 'subqueryNegativo.roteiroAtividadeId','roteiro_atividade.id')
      .innerJoin('local', 'atividade.localId', 'local.id')
      .where({'roteiro_atividade.id': roteiroAtividadeId.toString()})
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
    .where({'roteiro_atividade.id': roteiroAtividade.id})
    .update({  
      atividadeId: roteiroAtividade.atividadeId,
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
    .where({'roteiro_atividade.id': roteiroAtividade.id}).first()
    .delete()
  }
}