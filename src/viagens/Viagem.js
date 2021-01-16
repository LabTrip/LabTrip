import {v4 as uuidv4} from 'uuid';

export default class Viagem{
  constructor(tripNome, tripInicio, tripFim, tripStatus, userId, tripId = uuidv4()){
      this.tripId = tripId;
      this.tripNome = tripNome;
      this.tripInicio = new Date(tripInicio).toISOString();
      this.tripFim = new Date(tripFim).toISOString();
      this.tripStatus = tripStatus;
      this.userId = userId;
  }
}