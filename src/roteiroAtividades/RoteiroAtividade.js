export default class RoteiroAtividade{
    constructor(id, atividadeId, roteiroId, versaoRoteiro, dataInicio, dataFim, custo, statusId, observacaoCliente, observacaoAgente){
      this.roteiroAtividadeId = id;
      this.atividadeId = atividadeId;
      this.atividade = new Atividade();
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