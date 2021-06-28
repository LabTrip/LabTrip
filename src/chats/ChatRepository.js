export default class ChatRepository{
    constructor(client){
      this.client = client;
    }
  
    async buscaTodos(){
    
      return await this.client('chat');
    }
  
    async salva(chat){
      console.log(chat)
      const [firstRow] = await this.client('chat')
        .insert({
          nome: chat.nome,
          viagemId: chat.viagemId,
          topicoId: chat.chat.topicoId
        })
        .returning("*");
  
        return firstRow;
    }
  

    async buscaPorViagemTopicoId(req){
      switch(req.acesso.tipoAcesso){          
        case 'Total': 
         return await this.buscaPorId_AcessoTotal(req.params.viagemId, req.params.topicoId);
         break;
        case 'Gerencial':
            return await this.buscaPorId_AcessoGerencial(req.params.viagemId, req.params.topicoId, req.token.agenciaId);
          break;
        case 'Parcial':
          return await this.buscaPorId_AcessoParcial(req.params.viagemId, req.params.topicoId, req.token.id);
          break;
        default:
          return undefined;
      }
  
    }
  
    async buscaPorId_AcessoTotal(viagemId, topicoId){
      return await this.client.from('chat')
        .where({
          'chat.vaigemId': viagemId.toString(),
          'chat.topicoId': topicoId.toString()
        }).first();
    }
  
    async buscaPorId_AcessoGerencial(viagemId, topicoId, agenciaId){
      return await this.client.select(['chat.*']).from('chat')
        .innerJoin('viagem', 'chat.viagemId', 'viagem.id')
        .where({
          'chat.vaigemId': viagemId.toString(),
          'chat.topicoId': topicoId.toString()
        })
        .andWhere({'viagem.agenciaId': agenciaId.toString()}).first();
    }
  
    async buscaPorId_AcessoParcial(viagemId, topicoId, usuarioIdToken){
      return await this.client.select(['chat.*']).from('chat')
      .innerJoin('usuario_chat', 'chat.id', 'usuario_chat.chatId')
      .where({
        'chat.vaigemId': viagemId.toString(),
        'chat.topicoId': topicoId.toString()
      })
      .andWhere({'usuario_chat.usuarioId': usuarioIdToken.toString()}).first();
    }

    async buscaTodosPorViagemIdTopicoId(req){
      switch(req.acesso.tipoAcesso){          
        case 'Total': 
         return await this.buscaTodosPorViagemIdTopicoId_AcessoTotal(req.params.viagemId, req.params.topicoId);
         break;
        case 'Gerencial':
            return await this.buscaTodosPorViagemIdTopicoId_AcessoGerencial(req.params.viagemId, req.params.topicoId, req.token.agenciaId);
          break;
        case 'Parcial':
          return await this.buscaTodosPorViagemIdTopicoId_AcessoParcial(req.params.viagemId, req.params.topicoId, req.token.id);
          break;
        default:
          return undefined;
      }
  
    }
  
    async buscaTodosPorViagemIdTopicoId_AcessoTotal(viagemId, topicoId){
      return await this.client.from('chat')
      .where({'chat.viagemId': viagemId.toString()})
      .andWhere({'chat.topicoId': topicoId.toString()});
    }
  
    async buscaTodosPorViagemIdTopicoId_AcessoGerencial(viagemId, topicoId, agenciaId){
      return await this.client.select(['chat.*']).from('chat')
      .innerJoin('viagem', 'chat.viagemId', 'viagem.id')
      .where({'chat.viagemId': viagemId.toString()})
      .andWhere({'chat.topicoId': topicoId.toString()})
      .andWhere({'viagem.agenciaId': agenciaId.toString()})
    }
  
    async buscaTodosPorViagemIdTopicoId_AcessoParcial(viagemId, topicoId, usuarioIdToken){
      return await this.client.select(['chat.*']).from('chat')
      .innerJoin('usuario_chat', 'chat.id', 'usuario_chat.chatId')
      .where({'chat.viagemId': viagemId.toString()})
      .andWhere({'chat.topicoId': topicoId.toString()})
      .andWhere({'chat.usuarioId': usuarioIdToken.toString()});

    }
  
    async atualiza(chat){
      const [firstRow] = await this.client('chat')
        .where({'chat.id': chat.id})
        .update({
          nome: chat.nome
        })
        .returning("*");
  
        return firstRow;
    }
  
    async deleta(chat){
      await this.client('chat')
      .where({'chat.id': chat.id})
      .delete();
    }
  }