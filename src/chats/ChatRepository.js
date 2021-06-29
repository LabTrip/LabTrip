export default class ChatRepository{
    constructor(client){
      this.client = client;
    }
  
    async buscaTodos(){
    
      return await this.client('chat');
    }
  
    async salva(chat){
     
      const [firstRow] = await this.client('chat')
        .insert({
          nome: chat.nome,
          viagemId: chat.viagemId,
          topicoId: chat.topicoId
        })
        .returning("*");
  
        return firstRow;
    }

    async salvaParticipantes(participantes){
      return await this.client('usuario_chat')
        .insert(participantes);
    }
  

    async buscaPorViagemTopicoId(req){
      switch(req.acesso.tipoAcesso){          
        case 'Total': 
         return await this.buscaPorId_AcessoTotal(req.params.viagemId, req.params.topico);
         break;
        case 'Gerencial':
            return await this.buscaPorId_AcessoGerencial(req.params.viagemId, req.params.topico, req.token.agenciaId);
          break;
        case 'Parcial':
          return await this.buscaPorId_AcessoParcial(req.params.viagemId, req.params.topico, req.token.id);
          break;
        default:
          return undefined;
      }
  
    }
  
    async buscaPorId_AcessoTotal(viagemId, topico){
      return await this.client.select(['chat.*']).from('chat')
        .innerJoin('topico_chat','chat.topicoId','topico_chat.id')
        .where({
          'chat.viagemId': viagemId.toString(),
          'topico_chat.descricao': topico.toString()
        }).first();
    }
  
    async buscaPorId_AcessoGerencial(viagemId, topico, agenciaId){
      return await this.client.select(['chat.*']).from('chat')
        .innerJoin('viagem', 'chat.viagemId', 'viagem.id')
        .innerJoin('topico_chat','chat.topicoId','topico_chat.id')
        .where({
          'chat.viagemId': viagemId.toString(),
          'topico_chat.descricao': topico.toString()
        })
        .andWhere({'viagem.agenciaId': agenciaId.toString()}).first();
    }
  
    async buscaPorId_AcessoParcial(viagemId, topico, usuarioIdToken){
      return await this.client.select(['chat.*']).from('chat')
      .innerJoin('usuario_chat', 'chat.id', 'usuario_chat.chatId')
      .innerJoin('topico_chat','chat.topicoId','topico_chat.id')
      .where({
        'chat.viagemId': viagemId.toString(),
        'topico_chat.descricao': topico.toString()
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

    async buscaTopico(topico){
      return await this.client('topico_chat')
        .where({'descricao': topico.toString()})
        .first();
    }

    async buscaMensagens(chatId){
      return await this.client.select(['mensagem.*','usuario.nome as enviadoPor'])
        .from('mensagem')
        .innerJoin('usuario','mensagem.usuarioId','usuario.id')
        .where({'chatId': chatId.toString()})
    }

    async salvarMensagem(socketUser, mensagem){
      return await this.client('mensagem')
        .insert({
          mensagem: mensagem,
          usuarioId: socketUser.userId,
          enviadoEm: new Date().toUTCString(),
          chatId: socketUser.chat.id
        }).returning('*');
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