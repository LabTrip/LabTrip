export default class RoteiroRepository{
    constructor(client){
      this.client = client;
    }
  
    async buscaTodos(){
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
 

    async buscaPorId(id, versao){
      return await this.client('roteiro')
        .Where({'id': id.toString()}).first()
        .andWhere({'versao': versao.toString()}).first();
    }

    async buscaPorId(viagemId){
      return await this.client('roteiro')
        .Where({'viagemId': viagemId.toString()}).first();
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
  
  
    async atualiza(roteiro){
      const [firstRow] = await this.client('roteiro')
        .where({'id': roteiro.Id})
        .andWhere({'viagemId': roteiro.viagemId})
        .andWhere({'versao': roteiro.versao})
        .update({
          statusId: statusId    
        })
        .returning("*");
  
        return firstRow;
    }
  
    async deleta(roteiro){
      await this.client('roteiro')
        .where('id', roteiro.id)
        .andWhere({'viagemId': roteiro.viagemId})
        .andWhere({'versao': roteiro.versao})
        .del()
    }
  }