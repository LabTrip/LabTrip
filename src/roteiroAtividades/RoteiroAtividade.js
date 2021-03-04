export default class RoteiroAtividade{
    constructor(atividadeId, roteiroId, versaoRoteiro, dataInicio, dataFim, custo, statusId, observacaoCliente, observacaoAgente){
      this.atividadeId = atividadeId;
      this.roteiroId = roteiroId;
      this.versaoRoteiro = versaoRoteiro;
      this.dataInicio = new Date(dataInicio).toISOString();
      this.dataFim = new Date(dataFim).toISOString();
      this.custo = custo;
      this.statusId = statusId;
      this.observacaoCliente = observacaoCliente;
      this.observacaoAgente = observacaoAgente;
    }
  }