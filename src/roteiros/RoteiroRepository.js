export default class RoteiroRepository{
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
        return await this.client('roteiro');
    }

    async buscaTodos_AcessoGerencial(agenciaId){
      return await this.client('roteiro')
      .innerJoin('viagem', 'roteiro.viagemId', 'viagem.id')
      .where({'viagem.agenciaId': agenciaId.toString()});    
    }

    async buscaTodos_AcessoParcial(usuarioId){
      return await this.client('roteiro')
      .innerJoin('viagem', 'roteiro.viagemId', 'viagem.id')
      .innerJoin('usuario_viagem', 'viagem.id', 'usuario_viagem.viagemId')
      .where({'usuario_viagem.usuarioId': usuarioId.toString()});    
    }

    async buscaPorId(req){
      switch(req.acesso.tipoAcesso){          
        case 'Total': 
         return await this.buscaPorId_AcessoTotal(req.params.id, req.params.versao)
        case 'Gerencial':
            return await this.buscaPorId_AcessoGerencial(req.params.id, req.params.versao, req.token.agenciaId);
          break;
        case 'Parcial':
          return await this.buscaPorId_AcessoParcial(req.params.id, req.params.versao, req.token.id);
          break;
        default:
          return undefined;
      }
  
    }

    async buscaPorId_AcessoTotal(id, versao){
      console.log(id)
      console.log(versao)
      return await this.client('roteiro')
        .where({'id': id.toString()})
        .andWhere({'versao': versao.toString()}).first();
    }


    async buscaPorId_AcessoGerencial(roteiroId, versao, agenciaId){
      return await this.client.select(['roteiro.*']).from('roteiro')
        .innerJoin('viagem', 'roteiro.viagemId', 'viagem.id')
        .where({'roteiro.id': roteiroId.toString()})
        .andWhere({'versao': versao.toString()})
        .andWhere({'viagem.agenciaId': agenciaId.toString()}).first();
    }
  
    async buscaPorId_AcessoParcial(id, versao, usuarioId){
      return await this.client.select(['roteiro.*', ]).from('roteiro')
        .innerJoin('viagem', 'roteiro.viagemId', 'viagem.id')
        .innerJoin('usuario_viagem', 'viagem.id', 'usuario_viagem.viagemId')
        .where({'roteiro.id': id.toString()})
        .andWhere({'versao': versao.toString()})
        .andWhere({'usuario_viagem.usuarioId': usuarioId.toString()}).first();
    }

    async buscaPorViagemId(viagemId, versao){
      return await this.client('roteiro')
        .Where({'viagemId': viagemId.toString()}).first()
        .andWhere({'versao': versao.toString()}).first();
    }

    async buscaPorViagemId_AcessoGerencial(viagemId, agenciaId){
      return await this.client.select(['roteiro.*']).from('roteiro')
        .innerJoin('viagem', 'roteiro.viagemId', 'viagem.id')
        .where({'roteiro.viagemId': viagemId.toString()})
        .andWhere({'viagem.agenciaId': agenciaId.toString()}).first();
    }
  
    async buscaPorViagemId_AcessoParcial(viagemId, usuarioId){
      return await this.client.select(['roteiro.*', ]).from('roteiro')
        .innerJoin('viagem', 'roteiro.viagemId', 'viagem.id')
        .innerJoin('usuario_viagem', 'viagem.id', 'usuario_viagem.viagemId')
        .where({'roteiro.viagemId': id.toString()})
        .andWhere({'usuario_viagem.usuarioId': usuarioId.toString()}).first();
    }  

    async salva(roteiro){
      const [firstRow] = await this.client('roteiro')
     .insert({
       viagemId: roteiro.viagemId,
       statusId: roteiro.statusId,
       versao: roteiro.versao
     })
       .returning("*");  
       return firstRow;     
    }    
  
    async atualiza(roteiro){
      const [firstRow] = await this.client('roteiro')
        .where({'id': roteiro.id.toString()})
        .andWhere({'versao': roteiro.versao.toString()})
        .update({
          statusId: roteiro.statusId   
        })
        .returning("*");
  
        return firstRow;
    }
  
    async deleta(roteiro){
      await this.client('roteiro')
        .where('id', roteiro.id)
        .andWhere({'versao': roteiro.versao})
        .delete()
    }
  }