import {v4 as uuidv4} from 'uuid';

export default class Viagem{
  constructor(descricao, agenciaId, statusId, dataInicio, dataFim, usuarioDonoId, criadoPorId, id = uuidv4()){
      this.id = id;
      this.descricao = descricao;
      this.dataInicio = new Date(dataInicio).toISOString();
      this.dataFim = new Date(dataFim).toISOString();
      this.statusId = statusId;
      this.agenciaId = agenciaId;
      this.usuarioDonoId = usuarioDonoId;
      this.criadoPorId = criadoPorId;
      this.criadoEm = new Date().toISOString();
      this.editadoEm = new Date().toISOString();
      this.deletadoEm = null;
  }
}