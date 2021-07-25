export default class ViagemRepository{
  constructor(client){
    this.client = client;
  }

  async buscaTodos(){
    return await this.client.select(['viagem.*', 'status.descricao as status', 'usuario.nome as dono', 'moeda.descricaoMoeda']).from('viagem')
    .innerJoin('status', 'viagem.statusId', 'status.id')
    .innerJoin('usuario', 'viagem.usuarioDonoId', 'usuario.id')
    .innerJoin('moeda','viagem.moedaId','moeda.id')
    .orderBy('viagem.criadoEm','desc');
  }

  async buscaTodosAtivos(){
    return await this.client.select(['viagem.*', 'status.descricao as status', 'usuario.nome as dono']).from('viagem')
    .innerJoin('status', 'viagem.statusId', 'status.id')
    .innerJoin('usuario', 'viagem.usuarioDonoId', 'usuario.id')
    .where({'deletadoEm': null})
    .orderBy('viagem.criadoEm','desc');
  }

  async buscaComFiltro(filtro, userId){
    return await this.client('viagem')
      .innerJoin('usuario_viagem', 'viagem.id', 'usuario_viagem.viagemId')
      .where(filtro);
  }

  async buscaTodosComPermissao(id){
    return await this.client.select(['viagem.*', 'status.descricao as status', 'usuario.nome as dono', 'moeda.descricaoMoeda']).from('viagem')
    .innerJoin('status', 'viagem.statusId', 'status.id')
    .innerJoin('usuario', 'viagem.usuarioDonoId', 'usuario.id')
    .innerJoin('moeda','viagem.moedaId','moeda.id')
    .innerJoin('usuario_viagem', 'viagem.id', 'usuario_viagem.viagemId')
      .where({
        usuarioId: id,
      })
      .orderBy('viagem.criadoEm','desc');
  }

  async buscaTodosDaAgencia(agenciaId){
    return await this.client.select(['viagem.*', 'status.descricao as status', 'usuario.nome as dono', 'moeda.descricaoMoeda']).from('viagem')
    .innerJoin('status', 'viagem.statusId', 'status.id')
    .innerJoin('usuario', 'viagem.usuarioDonoId', 'usuario.id')
    .innerJoin('moeda','viagem.moedaId','moeda.id')
      .where({
        agenciaId: agenciaId.toString(),
      })
      .orderBy('viagem.criadoEm','desc');
  }

  async salva(viagem){
    const [firstRow] = await this.client('viagem')
      .insert(viagem)
      .returning("*");

      return firstRow;
  }

  async buscaPorId(id){
    return await this.client.select(['viagem.*', 'status.descricao as status', 'usuario.nome as dono', 'moeda.descricaoMoeda']).from('viagem')
    .innerJoin('status', 'viagem.statusId', 'status.id')
    .innerJoin('usuario', 'viagem.usuarioDonoId', 'usuario.id')
    .innerJoin('moeda','viagem.moedaId','moeda.id')
      .where({'viagem.id': id.toString()}).first();
  }
  

  async buscaPorId_AcessoGerencial(id, agenciaId){
    return await this.client.select(['viagem.*', 'status.descricao as status', 'usuario.nome as dono', 'moeda.descricaoMoeda']).from('viagem')
    .innerJoin('status', 'viagem.statusId', 'status.id')
    .innerJoin('usuario', 'viagem.usuarioDonoId', 'usuario.id')
    .innerJoin('moeda','viagem.moedaId','moeda.id')
      .where({'viagem.id': id.toString()})
      .andWhere({'viagem.agenciaId': agenciaId.toString()}).first();
  }

  async buscaPorId_AcessoParcial(id, usuarioId){
    return await this.client.select(['viagem.*', 'status.descricao as status', 'usuario.nome as dono', 'moeda.descricaoMoeda']).from('viagem')
    .innerJoin('status', 'viagem.statusId', 'status.id')
    .innerJoin('usuario', 'viagem.usuarioDonoId', 'usuario.id')
    .innerJoin('usuario_viagem', 'viagem.id', 'usuario_viagem.viagemId')
    .innerJoin('moeda','viagem.moedaId','moeda.id')
    .where({'viagem.id': id.toString()})
    .andWhere({'usuario_viagem.usuarioId': usuarioId.toString()}).first();
  }

  async atualiza(viagem){
    const [firstRow] = await this.client('viagem')
      .where({'id': viagem.id})
      .update(viagem)
      .returning("*");

      return firstRow;
  }

  async deleta(viagem){
    await this.client('viagem')
      .where('id', viagem.id)
      .update({
        deletadoEm: new Date().toISOString,
      })
  }

  async salvaParticipantes(participante){
    await this.client('usuario_viagem')
      .insert({usuarioId: participante.usuarioId,
        permissaoViagemId: participante.permissaoViagemId,
        viagemId: participante.viagemId})
      .onConflict(["usuarioId","viagemId"])
      .merge()
      .returning("*");
  }

  async deletaParticipantes(participantes){
    for(let participante of participantes){
      await this.client('usuario_viagem')
        .where((builder) => {
          builder.where('usuarioId', participante.usuarioId).andWhere('viagemId', participante.viagemId)
        })
        .delete();
    }
  }

  async buscaParticipantes(viagem){
    return await this.client.select(['usuario_viagem.*','usuario.nome as nome','permissao_viagem.descricao as descricao'])
      .from('usuario_viagem')
      .innerJoin('usuario','usuario_viagem.usuarioId','usuario.id')
      .innerJoin('permissao_viagem','usuario_viagem.permissaoViagemId','permissao_viagem.id')
      .where('viagemId', viagem.id)
      .orderByRaw("permissao_viagem.descricao = 'Proprietário' desc, permissao_viagem.descricao='Agente' desc, usuario.nome asc");
  }

  async buscaPermissaoDoUsuario(usuarioId, viagemId){
    return await this.client('usuario_viagem')
    .where({
      usuarioId: usuarioId.toString(),
      viagemId: viagemId.toString()
    }).first();
  }

  async buscaPermissoesProprietario(){
    return await this.client('permissao_viagem')
    .where({descricao: 'Proprietário'})
    .orWhere({descricao: 'Membro'});
  }

  async buscaPermissoesMembro(){
    return await this.client('permissao_viagem')
    .where({descricao: 'Membro'});
  }

  async buscaPermissoes(){
    return await this.client('permissao_viagem')
      .whereNot({id: 4});
  }

  async buscaUsuarioPorId(id){
    return await this.client.select(['usuario.*','perfil.descricao'])
    .from('usuario')
    .innerJoin('perfil','usuario.perfilId','perfil.id')
    .where({'usuario.id': id.toString()}).first();
  }

  async buscaStatusComFiltro(filtro){
    return await this.client('status')
      .where(filtro).first();
  }

  async buscaStatus(filtro){
    return await this.client('status');
  }

  async buscaRoteiroAprovadoDaViagemId(viagemId, status){
    return await this.client.select(['roteiro.*','status.descricao as status']).from('roteiro')
      .innerJoin('status','roteiro.statusId','status.id')
      .where({
        'roteiro.viagemId': viagemId,
        'status.descricao': status
      })
      .first();
  }

  async buscaMoedas(){
    return await this.client('moeda');
  }
}