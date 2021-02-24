export default class AtividadeRepository{
    constructor(client){
      this.client = client;
    }
  
    async buscaTodos(){
      return await this.client.select(['local.*', 'atividade.*']).from('atividade')
      .innerJoin('local', 'atividade.localId', 'local.id');
    }

    async buscaTodos2(){
      return await this.client.select('local.* as l').select('a.*').from('atividade as a')
      .innerJoin('local', 'a.localId', 'local.id');
    }
  
    async salva(atividade){
      const [firstRow] = await this.client('atividade')
        .insert(atividade)
        .returning("*");
  
        return firstRow;
    }

    async salvaLocal(local){
      const [firstRow] = await this.client('local')
        .insert({
          cidade: local.cidade,
          pais: local.pais,
          endereco: local.endereco,
          latitude: local.latitude,
          longitude: local.longitude,
          local: local.local
        })
        .returning("*");
  
        return firstRow;
    }

    async buscaLocalPorId(id){
      return await this.client('local')
        .where({'id': id.toString()}).first();
    }
  
    async buscaPorId(id){
      return await this.client.select(['local.*', 'atividade.*']).from('atividade')
      .innerJoin('local', 'atividade.localId', 'local.id')
      .where({'atividade.id': id.toString()}).first();
    }
  
    async atualiza(atividade){
      const [firstRow] = await this.client('atividade')
        .where({'id': atividade.id})
        .update({
          descricao: atividade.descricao,
          localId: atividade.localId,
          editadoEm: new Date().toISOString(),
        })
        .returning("*");
  
        return firstRow;
    }
  
    async deleta(atividade){
      await this.client('atividade')
        .where('id', atividade.atividadeId)
        .update({
          deletadoEm: new Date().toISOString()
        });
    }
  }