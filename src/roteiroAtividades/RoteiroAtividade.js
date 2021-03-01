export default class RoteiroAtividade{
    constructor(atividadeid, roteiroId, versaoRoteiro, dataInicio, dataFim, custo, statusId, observacaoCliente, observacaoAgente){
      this.atividadeid = atividadeid;
      this.roteiroId = roteiroId;
      this.versaoRoteiro = versaoRoteiro;
      this.dataInicio = dataInicio;
      this.dataFim = dataFim;
      this.custo = custo;
      this.statusId = statusId;
      this.observacaoCliente = observacaoCliente;
      this.observacaoAgente = observacaoAgente;
    }
  }