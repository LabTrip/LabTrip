export default class DespesaExtra{
  constructor(orcamentoId, custo, descricao, usuarioId, data = undefined, id = undefined){
      if(id){
        this.id = id;
      }
      this.orcamentoId = orcamentoId;
      this.custo = custo;
      this.descricao = descricao;
      this.usuarioId = usuarioId;
      if(!data){
        this.data = new Date().toISOString();
      }
      else{
        this.data = data;
      }      
  }
}