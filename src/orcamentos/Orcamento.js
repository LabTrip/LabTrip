export default class Orcamento{
  constructor(valorConsumido, valorTotal, valorMinimo, roteiroId, versaoRoteiro, tipoOrcamentoId, id = undefined){
      if(id){
        this.id = id;
      }
      this.valorConsumido = valorConsumido;
      this.valorTotal = valorTotal;
      this.valorMinimo = valorMinimo;
      this.roteiroId = roteiroId;
      this.versaoRoteiro = versaoRoteiro;
      this.tipoOrcamentoId = tipoOrcamentoId;
  }
}