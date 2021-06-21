import { formatTokenType } from "sucrase/dist/parser/tokenizer/types";

export default class NotificacaoRepository{
    constructor(client){
      this.client = client;
    }

  
    async salva(usuario){
      const [firstRow] = await this.client('usuario')
        .insert(usuario)
        .returning("*");
  
        return firstRow;
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
        .where((builder) => {
          const p = participantes.map(p => p.usuarioId)

          builder.whereIn('usuarioId', p);         
        });
    }
  
    async buscaPorId(id){
      return await this.client.select(['usuario.*','perfil.descricao'])
      .from('usuario')
      .innerJoin('perfil','usuario.perfilId','perfil.id')
      .where({'usuario.id': id.toString()}).first();
    }

  }