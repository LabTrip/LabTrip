import {v4 as uuidv4} from 'uuid';

export default class Local{
  constructor(local, endereco, cidade, pais, latitude, longitude, id = null){
    this.id = id;
    this.local = local;
    this.endereco = endereco;
    this.cidade = cidade;
    this.pais = pais;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}