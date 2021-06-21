export default class OrcamentoRepository{
  constructor(client){
    this.client = client;
  }

  async buscaParticipantesDaViagem(orcamentoId){
    return await this.client.select([
      'p.usuarioId'
    ])
    .from('usuario_viagem as p')
    .distinct()
    .join('viagem as v', 'p.viagemId', 'v.id')
    .join('roteiro as r', 'p.viagemId', 'r.viagemId')
    .join('orcamento as o', 'r.id', 'o.roteiroId')
    .where({
      'o.id': orcamentoId
    });
  }

  async buscaDadosDaViagem(orcamentoId){
    return await this.client.select([
      'v.*',
      'r.*',
      'o.*'
    ])
    .from('usuario_viagem as p')
    .distinct()
    .join('viagem as v', 'p.viagemId', 'v.id')
    .join('roteiro as r', 'p.viagemId', 'r.viagemId')
    .join('orcamento as o', 'r.id', 'o.roteiroId')
    .where({
      'o.id': orcamentoId
    });
  }

  async salva(orcamento){
    const [firstRow] = await this.client('orcamento')
      .insert(orcamento)
      .returning("*");

      return firstRow;
  }

  async buscaPorId(id){
    return await this.client('orcamento')
      .where({'id': id.toString()}).first();
  }

  async buscaPorRoteiroIdVersaoTipoGeral(id, versao, tipoId){
    return await this.client('orcamento')
      .where({
              'roteiroId': id.toString(),
              'versaoRoteiro': versao.toString(),
              'tipoOrcamentoId': tipoId.toString()
            }).first();
  }

  async buscaPorRoteiroIdVersaoTipoIndividual(id, versao, tipoId, usuarioId){
    return await this.client.select(['orcamento.*'])
      .from('orcamento')
      .innerJoin('usuario_orcamento','orcamento.id','usuario_orcamento.orcamentoId')
      .where({
              'orcamento.roteiroId': id.toString(),
              'orcamento.versaoRoteiro': versao.toString(),
              'orcamento.tipoOrcamentoId': tipoId.toString(),
              'usuario_orcamento.usuarioId': usuarioId.toString()
            }).first();
  }


  async atualiza(orcamento){
    const [firstRow] = await this.client('orcamento')
      .where({'id': orcamento.id})
      .update(orcamento)
      .returning("*");

      return firstRow;
  }

  async buscaParticipantes(viagem){
    return await this.client('usuario_viagem')
      .where('viagemId', viagem.id);
  }

  async buscaPermissoes(){
    return await this.client('permissao_viagem');
  }

  async buscaTipoOrcamentoId(tipo){
    return await this.client('tipo_orcamento')
      .where({
        'descricao': tipo.toString()
      }).first();
  }

  async buscaUsuarioPorId(id){
    return await this.client.select(['usuario.*','perfil.descricao'])
    .from('usuario')
    .innerJoin('perfil','usuario.perfilId','perfil.id')
    .where({'usuario.id': id.toString()}).first();
  }

  async somaValoresAtividadesDoRoteiro(id, versao){
    const coalesce = this.client.raw('COALESCE(SUM(custo),0) as valor')
    return await this.client.select(coalesce)
    .from('roteiro_atividade')
    .where({
      'roteiroId': id.toString(),
      'versaoRoteiro': versao.toString()
    }).first();
  }

  async somaValoresDespesasExtras(orcamentoId){
    const coalesce = this.client.raw('COALESCE(SUM(custo),0) as valor')
    return await this.client.select(coalesce)
    .from('despesa_extra')
    .where({
      'orcamentoId': orcamentoId.toString()
    }).first();
  }

  async buscaUsuarioOrcamento(orcamentoId, usuarioId){
    return await this.client('usuario_orcamento')
      .where({
        usuarioId: usuarioId,
        orcamentoId: orcamentoId
      })
      .first();
  }

  async linkaOrcamentoUsuario(orcamentoId, usuarioId){
    await this.client('usuario_orcamento')
      .insert({
        usuarioId: usuarioId,
        orcamentoId: orcamentoId
      })
      .onConflict(["usuarioId","orcamentoId"])
      .ignore();
  }

  async buscaDespesasExtras(orcamentoId){
    return await this.client.select(['despesa_extra.*','usuario.nome as nomeUsuario'])
      .from('despesa_extra')
      .innerJoin('usuario','usuario.id','usuarioId')
      .where({'despesa_extra.orcamentoId': orcamentoId.toString()})
      .orderBy('data','desc');
  }

  async buscaPermissaoViagem(viagemId, usuarioId){
    return await this.client.select(['usuario_viagem.*','permissao_viagem.descricao'])
      .from('usuario_viagem')
      .innerJoin('permissao_viagem','permissao_viagem.id','permissaoViagemId')
      .where({
        'usuario_viagem.usuarioId': usuarioId.toString(),
        'usuario_viagem.viagemId': viagemId.toString()
      }).first();
  }

  async buscaDespesaPorId(despesaId){
    return await this.client('despesa_extra')
      .where({'id': despesaId}).first();
  }

  async salvaDespesaExtra(despesa){
    const [firstRow] = await this.client('despesa_extra')
      .insert(despesa)
      .returning("*");

    return firstRow;
  }

  async atualizaDespesaExtra(despesa){
    const [firstRow] = await this.client('despesa_extra')
      .where({'id': despesa.id})
      .update(despesa)
      .returning("*");

      return firstRow;
  }

  async deletaDespesaExtra(despesa){
    await this.client('despesa_extra')
      .where({'id': despesa.id})
      .delete();
  }
}