export default class ListaContatosRepository{
    constructor(client){
      this.client = client;
    }
  
    async buscaTodos(){    
      return await this.client.select(['lista_contatos.*', 'user.nome as nomeUsuario','usuario.*'])
      .from('lista_contatos')
      .innerJoin(( (builder) => {builder.from('usuario').as('user')}) , 'lista_contatos.usuarioId', 'user.id')
      .innerJoin('usuario', 'lista_contatos.contatoId', 'usuario.id');      
    }
  
    async salva(listaContatos){
      console.log(listaContatos)
      const [firstRow] = await this.client('lista_contatos')
        .insert({            
            usuarioId: listaContatos.usuarioId,
            contatoId: listaContatos.contatoId,
            apelido: listaContatos.apelido,
        })
        .returning("*");
  
        return firstRow;
    }
  

    async buscaPorId(req){
      switch(req.acesso.tipoAcesso){          
        case 'Total': 
         return await this.buscaPorId_AcessoTotal(req.params.usuarioId, req.params.contatoId);
         break;
        case 'Gerencial':
            return await this.buscaPorId_AcessoGerencial(req.params.usuarioId, req.params.contatoId, req.token.agenciaId);
          break;
        case 'Parcial':
          return await this.buscaPorId_AcessoParcial(req.params.usuarioId, req.params.contatoId, req.token.id);
          break;
        default:
          return undefined;
      }
  
    }
  
    async buscaPorId_AcessoTotal(usuarioId, contatoId){
      return await this.client.select(['lista_contatos.*', 'user.nome as nomeUsuario','usuario.*'])
        .from('lista_contatos')
        .innerJoin(( (builder) => {builder.from('usuario').as('user')}) , 'lista_contatos.usuarioId', 'user.id')
        .innerJoin('usuario', 'lista_contatos.contatoId', 'usuario.id')
        .where({'lista_contatos.usuarioId': usuarioId.toString()})
        .andWhere({'lista_contatos.contatoId': contatoId.toString()}).first();
    }
  
    async buscaPorId_AcessoGerencial(usuarioId, contatoId, agenciaId){
        return await this.client.select(['lista_contatos.*', 'user.nome as nomeUsuario','usuario.*'])
        .from('lista_contatos')
        .innerJoin(( (builder) => {builder.from('usuario').as('user')}) , 'lista_contatos.usuarioId', 'user.id')
        .innerJoin('usuario', 'lista_contatos.contatoId', 'usuario.id')
        .innerJoin('usuario_viagem', 'lista_contatos.usuarioId', 'usuario_viagem.usuarioId')
        .innerJoin('viagem', 'usuario_viagem.viagemId', 'viagem.id')
        .where({'lista_contatos.usuarioId': usuarioId.toString()})
        .andWhere({'lista_contatos.contatoId': contatoId.toString()})
        .andWhere({'viagem.agenciaId': agenciaId.toString()}).first();
    }
  
    async buscaPorId_AcessoParcial(usuarioId, contatoId, usuarioIdToken){
        return await this.client.select(['lista_contatos.*', 'user.nome as nomeUsuario','usuario.*'])
        .from('lista_contatos')
        .innerJoin(( (builder) => {builder.from('usuario').as('user')}) , 'lista_contatos.usuarioId', 'user.id')
        .innerJoin('usuario', 'lista_contatos.contatoId', 'usuario.id')
        .innerJoin('usuario_viagem', 'lista_contatos.usuarioId', 'usuario_viagem.usuarioId')
        .innerJoin('viagem', 'usuario_viagem.viagemId', 'viagem.id')
        .where({'lista_contatos.usuarioId': usuarioId.toString()})
        .andWhere({'lista_contatos.contatoId': contatoId.toString()})
        .andWhere({'viagem.agenciaId': agenciaId.toString()})
        .andWhere({'usuario_viagem.usuarioId': usuarioIdToken.toString()}).first();
    }

    async buscaTodosPorUsuario(req){
        switch(req.acesso.tipoAcesso){          
          case 'Total': 
           return await this.buscaTodosPorUsuario_AcessoTotal(req.params.usuarioId);
           break;
          case 'Gerencial':
              return await this.buscaTodosPorUsuario_AcessoGerencial(req.params.usuarioId, req.token.agenciaId);
            break;
          case 'Parcial':
            return await this.buscaTodosPorUsuario_AcessoParcial(req.params.usuarioId, req.token.id);
            break;
          default:
            return undefined;
        }
    
      }
    
    async buscaTodosPorUsuario_AcessoTotal(usuarioId){
        return await this.client.select(['lista_contatos.*', 'user.nome as nomeUsuario','usuario.*'])
        .from('lista_contatos')
        .innerJoin(( (builder) => {builder.from('usuario').as('user')}) , 'lista_contatos.usuarioId', 'user.id')
        .innerJoin('usuario', 'lista_contatos.contatoId', 'usuario.id')
        .where({'lista_contatos.usuarioId': usuarioId.toString()});
    }
    
    async buscaTodosPorUsuario_AcessoGerencial(usuarioId, agenciaId){
        return await this.client.select(['lista_contatos.*', 'user.nome as nomeUsuario','usuario.*'])
        .from('lista_contatos')
        .innerJoin(( (builder) => {builder.from('usuario').as('user')}) , 'lista_contatos.usuarioId', 'user.id')
        .innerJoin('usuario', 'lista_contatos.contatoId', 'usuario.id')
        .innerJoin('usuario_viagem', 'lista_contatos.usuarioId', 'usuario_viagem.usuarioId')
        .innerJoin('viagem', 'usuario_viagem.viagemId', 'viagem.id')
        .where({'lista_contatos.usuarioId': usuarioId.toString()})
        .andWhere({'viagem.agenciaId': agenciaId.toString()});
    }
    
    async buscaTodosPorUsuario_AcessoParcial(usuarioId, usuarioIdToken){
        return await this.client.select(['lista_contatos.*', 'user.nome as nomeUsuario','usuario.*'])
        .from('lista_contatos')
        .innerJoin(( (builder) => {builder.from('usuario').as('user')}) , 'lista_contatos.usuarioId', 'user.id')
        .innerJoin('usuario', 'lista_contatos.contatoId', 'usuario.id')
        .innerJoin('usuario_viagem', 'lista_contatos.usuarioId', 'usuario_viagem.usuarioId')
        .innerJoin('viagem', 'usuario_viagem.viagemId', 'viagem.id')
        .where({'lista_contatos.usuarioId': usuarioId.toString()})
        .andWhere({'viagem.agenciaId': agenciaId.toString()})
        .andWhere({'usuario_viagem.usuarioId': usuarioIdToken.toString()});
    }

     
    async atualiza(listaContatos){
      const [firstRow] = await this.client('lista_contatos')
        .where({'lista_contatos.usuarioId': listaContatos.usuarioId})
        .andWhere({'lista_contatos.contatoId': listaContatos.contatoId})
        .update({
          apelido: listaContatos.apelido
        })
        .returning("*");
  
        return firstRow;
    }
  
    async deleta(listaContatos){
      await this.client('lista_contatos')
      .where({'lista_contatos.usuarioId': listaContatos.usuarioId})
      .andWhere({'lista_contatos.contatoId': listaContatos.contatoId})
        .delete();
    }
  }