export default class ViagemRepository{
  constructor(client){
    this.client = client;
  }

  async buscaTodos(){
    return await this.client.select(['viagem.*', 'status.descricao as status', 'usuario.nome as dono']).from('viagem')
    .innerJoin('status', 'viagem.statusId', 'status.id')
    .innerJoin('usuario', 'viagem.usuarioDonoId', 'usuario.id')
  }

  async buscaTodosAtivos(){
    return await this.client.select(['viagem.*', 'status.descricao as status', 'usuario.nome as dono']).from('viagem')
    .innerJoin('status', 'viagem.statusId', 'status.id')
    .innerJoin('usuario', 'viagem.usuarioDonoId', 'usuario.id')
    .where({'deletadoEm': null});
  }

  async buscaComFiltro(filtro, userId){
    return await this.client('viagem')
      .innerJoin('usuario_viagem', 'viagem.id', 'usuario_viagem.viagemId')
      .where(filtro);
  }

  async buscaTodosComPermissao(id){
    return await this.client.select(['viagem.*', 'status.descricao as status', 'usuario.nome as dono']).from('viagem')
    .innerJoin('status', 'viagem.statusId', 'status.id')
    .innerJoin('usuario', 'viagem.usuarioDonoId', 'usuario.id')
      .innerJoin('usuario_viagem', 'viagem.id', 'usuario_viagem.viagemId')
      .where({
        usuarioId: id,
      });
  }

  async buscaTodosDaAgencia(agenciaId){
    return await this.client.select(['viagem.*', 'status.descricao as status', 'usuario.nome as dono']).from('viagem')
    .innerJoin('status', 'viagem.statusId', 'status.id')
    .innerJoin('usuario', 'viagem.usuarioDonoId', 'usuario.id')
      .where({
        agenciaId: agenciaId.toString(),
      });
  }

  async salva(viagem){
    const [firstRow] = await this.client('viagem')
      .insert(viagem)
      .returning("*");

      return firstRow;
  }

  async buscaPorId(id){
    return await this.client.select(['viagem.*', 'status.descricao as status', 'usuario.nome as dono']).from('viagem')
    .innerJoin('status', 'viagem.statusId', 'status.id')
    .innerJoin('usuario', 'viagem.usuarioDonoId', 'usuario.id')
      .where({'viagem.id': id.toString()}).first();
  }

  async buscaPorId_AcessoGerencial(id, agenciaId){
    return await this.client.select(['viagem.*', 'status.descricao as status', 'usuario.nome as dono']).from('viagem')
    .innerJoin('status', 'viagem.statusId', 'status.id')
    .innerJoin('usuario', 'viagem.usuarioDonoId', 'usuario.id')
      .where({'viagem.id': id.toString()})
      .andWhere({'viagem.agenciaId': agenciaId.toString()}).first();
  }

  async buscaPorId_AcessoParcial(id, usuarioId){
    return await this.client.select(['viagem.*', 'status.descricao as status', 'usuario.nome as dono']).from('viagem')
    .innerJoin('status', 'viagem.statusId', 'status.id')
    .innerJoin('usuario', 'viagem.usuarioDonoId', 'usuario.id')
    .innerJoin('usuario_viagem', 'viagem.id', 'usuario_viagem.viagemId')
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
    return await this.client('usuario_viagem')
      .where('viagemId', viagem.id);
  }

  async buscaPermissoes(){
    return await this.client('permissao_viagem');
  }

  async buscaUsuarioPorId(id){
    return await this.client.select(['usuario.*','perfil.descricao'])
    .from('usuario')
    .innerJoin('perfil','usuario.perfilId','perfil.id')
    .where({'usuario.id': id.toString()}).first();
  }
}