import {v4 as uuidv4} from 'uuid';

export default class Viagem{
  constructor(apelido, local, codCidade, agenciaID, statusID, dataInicio, dataFim, ID = uuidv4()){
      this.ID = ID;
      this.apelido = apelido;
      this.dataInicio = new Date(dataInicio).toISOString();
      this.dataFim = new Date(dataFim).toISOString();
      this.statusID = statusID;
      this.local = local;
      this.codCidade = codCidade;
      this.agenciaID = agenciaID;
  }
}