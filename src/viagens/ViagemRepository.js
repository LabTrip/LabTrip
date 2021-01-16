export default class ViagemRepository{
  constructor(client){
    this.client = client;
  }

  async getAll(){
    return await this.client('trips');
  }

  async save(viagem){
    console.log(viagem);
    const [firstRow] = await this.client('trips')
      .insert(viagem)
      .returning("*");

      return firstRow;
  }

  async getById(tripId){
    return await this.client('trips')
      .where({'tripId': tripId.toString()}).first();
  }

  async update(viagem){
    const [firstRow] = await this.client('trips')
      .where({'tripId': viagem.tripId})
      .update({
        tripNome: viagem.tripNome,
        tripInicio: viagem.tripInicio,
        tripFim: viagem.tripFim,
        tripStatus: viagem.tripStatus
      })
      .returning("*");

      return firstRow;
  }

  async delete(viagem){
    await this.client('trips')
      .where('tripId', viagem.tripId)
      .del()
  }
}