export default class AtividadeRepository{
    constructor(client){
      this.client = client;
    }
  
    async getAll(){
      return await this.client('atividades');
    }
  
    async save(atividade){
      console.log(atividade);
      const [firstRow] = await this.client('atividades')
        .insert(atividade)
        .returning("*");
  
        return firstRow;
    }
  
    async getById(atividadeId){
      return await this.client('atividades')
        .where({'atividadeId': atividadeId.toString()}).first();
    }
  
    async update(atividade){
      const [firstRow] = await this.client('atividades')
        .where({'atividadeId': atividade.atividadeId})
        .update({
          atividadeNome: atividade.atividadeNome,
          atividadeDesc: atividade.atividadeDesc,
          atividadeValor: atividade.atividadeValor,
          atividadeHr: atividade.atividadeHr,
          tripId: atividade.tripId
        })
        .returning("*");
  
        return firstRow;
    }
  
    async delete(atividade){
      await this.client('atividades')
        .where('atividadeId', atividade.atividadeId)
        .del()
    }
  }