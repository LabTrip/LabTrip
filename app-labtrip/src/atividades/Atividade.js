import {v4 as uuidv4} from 'uuid';

export default class Atividade{
  constructor(atividadeNome, atividadeDesc, atividadeValor, atividadeHr, tripId, atividadeId = uuidv4()){
      
      this.atividadeNome = atividadeNome;
      this.atividadeDesc = atividadeDesc;
      this.atividadeValor = atividadeValor;
      this.atividadeHr = atividadeHr;
      this.tripId = tripId;
      this.atividadeId = atividadeId;
  }
}