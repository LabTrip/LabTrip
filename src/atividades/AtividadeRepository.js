export default class AtividadeRepository{
    constructor(client){
      this.client = client;
    }
  
    async buscaTodos(){
      return await this.client('atividade');
    }
  
    async salva(atividade){
      const [firstRow] = await this.client('atividade')
        .insert(atividade)
        .returning("*");
  
        return firstRow;
    }
  
    async buscaPorId(id){
      return await this.client('atividade')
        .where({'id': id.toString()}).first();
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