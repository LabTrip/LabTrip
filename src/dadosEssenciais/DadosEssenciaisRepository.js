export default class DadosEssenciaisRepository{
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
      return await this.client.from('dados_essenciais')
        
    }
  
    async buscaTodos_AcessoGerencial(agenciaId){
      return await this.client.select(['dados_essenciais.*']).from('dados_essenciais')
        .innerJoin('roteiro_atividade', 'dados_essenciais.roteiroAtividadeId', 'roteiro_atividade.id')
        .innerJoin('roteiro', function() {
          this.on(function() {
            this.on('roteiro_atividade.roteiroId', '=', 'roteiro.id')
            this.andOn('roteiro_atividade.versaoRoteiro', '=', 'roteiro.versao')
          })
        })
        .innerJoin('viagem', 'roteiro.viagemId', 'viagem.id')
        .where({'viagem.agenciaId': agenciaId.toString()});
    }
  
    async buscaTodos_AcessoParcial(usuarioIdToken){
      return await this.client.select(['dados_essenciais.*']).from('dados_essenciais')
        .innerJoin('roteiro_atividade', 'dados_essenciais.roteiroAtividadeId', 'roteiro_atividade.id')
        .innerJoin('roteiro', function() {
          this.on(function() {
            this.on('roteiro_atividade.roteiroId', '=', 'roteiro.id')
            this.andOn('roteiro_atividade.versaoRoteiro', '=', 'roteiro.versao')
          })
        })
        .innerJoin('viagem', 'roteiro.viagemId', 'viagem.id')
        .innerJoin('usuario_viagem', 'viagem.id', 'usuario_viagem.viagemId')
        //se privado somente quem registrou pode ver entre participantes da viagem
        .whereRaw('("usuario_viagem"."usuarioId" = ? ) and ("dados_essenciais"."usuarioId" = ? or "dados_essenciais"."privado" = ?)', [usuarioIdToken.toString(), usuarioIdToken.toString(), false])
  
    }
  
    async salva(dadosEssenciais){
      const [firstRow] = await this.client('dados_essenciais')
        .insert({
            usuarioId: dadosEssenciais.usuarioId, 
            roteiroAtividadeId: dadosEssenciais.roteiroAtividadeId, 
            nomeArquivo: dadosEssenciais.nomeArquivo, 
            chaveArquivo: dadosEssenciais.chaveArquivo, 
            urlArquivo: dadosEssenciais.urlArquivo,
            dataUpload: dadosEssenciais.dataUpload,  
            privado: dadosEssenciais.privado
        })
        .returning("*");
  
        return firstRow;
    }
  

    async buscaPorId(req){ 
      switch(req.acesso.tipoAcesso){          
        case 'Total': 
         return await this.buscaPorId_AcessoTotal(req.params.dadosEssenciaisId);
         break;
        case 'Gerencial':
            return await this.buscaPorId_AcessoGerencial(req.params.dadosEssenciaisId, req.token.agenciaId);
          break;
        case 'Parcial':
          return await this.buscaPorId_AcessoParcial(req.params.dadosEssenciaisId, req.token.id);
          break;
        default:
          return undefined;
      }
  
    }
  
    async buscaPorId_AcessoTotal(dadosEssenciaisId){
      return await this.client.from('dados_essenciais')
        .where({'dados_essenciais.id': dadosEssenciaisId.toString()}).first();
    }
  
    async buscaPorId_AcessoGerencial(dadosEssenciaisId, agenciaId){
      return await this.client.select(['dados_essenciais.*']).from('dados_essenciais')
        .innerJoin('roteiro_atividade', 'dados_essenciais.roteiroAtividadeId', 'roteiro_atividade.id')
        .innerJoin('roteiro', function() {
          this.on(function() {
            this.on('roteiro_atividade.roteiroId', '=', 'roteiro.id')
            this.andOn('roteiro_atividade.versaoRoteiro', '=', 'roteiro.versao')
          })
        })
        .innerJoin('viagem', 'roteiro.viagemId', 'viagem.id')
        .where({'dados_essenciais.id': dadosEssenciaisId.toString()})
        .andWhere({'viagem.agenciaId': agenciaId.toString()}).first();
    }
  
    async buscaPorId_AcessoParcial(dadosEssenciaisId, usuarioIdToken){
      return await this.client.select(['dados_essenciais.*']).from('dados_essenciais')
        .innerJoin('roteiro_atividade', 'dados_essenciais.roteiroAtividadeId', 'roteiro_atividade.id')
        .innerJoin('roteiro', function() {
          this.on(function() {
            this.on('roteiro_atividade.roteiroId', '=', 'roteiro.id')
            this.andOn('roteiro_atividade.versaoRoteiro', '=', 'roteiro.versao')
          })
        })
        .innerJoin('viagem', 'roteiro.viagemId', 'viagem.id')
        .innerJoin('usuario_viagem', 'viagem.id', 'usuario_viagem.viagemId')
        //se privado somente quem registrou pode ver entre participantes da viagem
        .whereRaw('(dados_essenciais.id= ?) and ("usuario_viagem"."usuarioId" = ? ) and ("dados_essenciais"."usuarioId" = ? or "dados_essenciais"."privado" = ?)', [dadosEssenciaisId.toString(),usuarioIdToken.toString(), usuarioIdToken.toString(), false])
        .first();
    }

    async buscaPorRoteiroAtividadeId(req){
        switch(req.acesso.tipoAcesso){          
          case 'Total': 
           return await this.buscaPorRoteiroAtividadeId_AcessoTotal(req.params.roteiroAtividadeId);
           break;
          case 'Gerencial':
              return await this.buscaPorRoteiroAtividadeId_AcessoGerencial(req.params.roteiroAtividadeId, req.token.agenciaId);
            break;
          case 'Parcial':
            return await this.buscaPorRoteiroAtividadeId_AcessoParcial(req.params.roteiroAtividadeId, req.token.id);
            break;
          default:
            return undefined;
        }
    
      }
    
    async buscaPorRoteiroAtividadeId_AcessoTotal(roteiroAtividadeId){
        return await this.client.from('dados_essenciais')
            .where({'dados_essenciais.roteiroAtividadeId': roteiroAtividadeId.toString()});
    }

    async buscaPorRoteiroAtividadeId_AcessoGerencial(roteiroAtividadeId, agenciaId){
        return await this.client.select(['dados_essenciais.*']).from('dados_essenciais')
            .innerJoin('roteiro_atividade', 'dados_essenciais.roteiroAtividadeId', 'roteiro_atividade.id')
            .innerJoin('roteiro', function() {
              this.on(function() {
                this.on('roteiro_atividade.roteiroId', '=', 'roteiro.id')
                this.andOn('roteiro_atividade.versaoRoteiro', '=', 'roteiro.versao')
              })
            })
            .innerJoin('viagem', 'roteiro.viagemId', 'viagem.id')
            .where({'dados_essenciais.roteiroAtividadeId': roteiroAtividadeId.toString()})
            .andWhere({'viagem.agenciaId': agenciaId.toString()});
    }

    async buscaPorRoteiroAtividadeId_AcessoParcial(roteiroAtividadeId, usuarioIdToken){
        return await this.client.select(['dados_essenciais.*']).from('dados_essenciais')
            .innerJoin('roteiro_atividade', 'dados_essenciais.roteiroAtividadeId', 'roteiro_atividade.id')
            .innerJoin('roteiro', function() {
              this.on(function() {
                this.on('roteiro_atividade.roteiroId', '=', 'roteiro.id')
                this.andOn('roteiro_atividade.versaoRoteiro', '=', 'roteiro.versao')
              })
            })
            .innerJoin('viagem', 'roteiro.viagemId', 'viagem.id')
            .innerJoin('usuario_viagem', 'viagem.id', 'usuario_viagem.viagemId')
            //se privado somente quem registrou pode ver entre participantes da viagem
            .whereRaw('("dados_essenciais"."roteiroAtividadeId"= ?) and ("usuario_viagem"."usuarioId" = ? ) and ("dados_essenciais"."usuarioId" = ? or "dados_essenciais"."privado" = ?)', [ roteiroAtividadeId.toString(),usuarioIdToken.toString(), usuarioIdToken.toString(), false]);
    }   
  
  
    async atualiza(dadosEssenciais){
      console.log(dadosEssenciais)
      const [firstRow] = await this.client('dados_essenciais')
        .where({'id': dadosEssenciais.id})
        .update({
            nomeArquivo: dadosEssenciais.nomeArquivo, 
            chaveArquivo: dadosEssenciais.chaveArquivo, 
            urlArquivo: dadosEssenciais.urlArquivo, 
            privado: dadosEssenciais.privado
        })
        .returning("*");
  
        return firstRow;
    }

    async atualizaArquivoRoteiroAtividade(arquivo, dadosEssenciais){
      const [firstRow] = await this.client('dados_essenciais')
        .where({'id': dadosEssenciais.id})
        .update({
          nomeArquivo: arquivo.name,
          chaveArquivo: arquivo.key,
          urlArquivo: arquivo.url,
          dataUpload: new Date().toISOString(),
        })
        .returning("*");
  
        return firstRow;
    }
  
    async deleta(dadosEssenciais){
      await this.client('dados_essenciais')
      .where({'dados_essenciais.id': dadosEssenciais.dadosEssenciaisId})
      .delete();
    }

    async deletaDadoPorId(dadosEssenciais){
      await this.client('dados_essenciais')
      .where({'dados_essenciais.id': dadosEssenciais.id})
      .delete();
    }
  }