import { formatTokenType } from "sucrase/dist/parser/tokenizer/types";

export default class NotificacaoRepository{
    constructor(client){
      this.client = client;
    }

  
    async salva(notificacao){
      const [firstRow] = await this.client('notificacao')
        .insert(notificacao)
        .returning("*");
  
        return firstRow;
    }

    async salvaUsuarioNotificacao(usuariosNotificacao){
      return await this.client('usuario_notificacao')
        .insert(usuariosNotificacao)
        .returning("*");
    }

    async salvaTokenNotificacao(token, usuarioId){
      const [firstRow] = await this.client('token_notificacao')
        .insert({
          tokenNotificacao: token,
          usuarioId: usuarioId
        })
        .onConflict('tokenNotificacao')
        .ignore()
        .returning("*");
  
        return firstRow;
    }

    async buscaTokenNotificacao(participantes){
      return await this.client.select('tokenNotificacao').from('token_notificacao')
        .whereIn('usuarioId', participantes);         
    }
  
    async buscaPorId(id){
      return await this.client.select(['usuario.*','perfil.descricao'])
      .from('usuario')
      .innerJoin('perfil','usuario.perfilId','perfil.id')
      .where({'usuario.id': id.toString()}).first();
    }

    async buscaNotificacoesPorUsuarioId(usuarioId){
      return await this.client.select(['usuario_notificacao.*','notificacao.descricao as descricao', 'notificacao.iconeLabel as icone'])
      .from('usuario_notificacao')
      .innerJoin('notificacao','usuario_notificacao.notificacaoId','notificacao.id')
      .where({'usuarioId': usuarioId.toString()});
    }

  }