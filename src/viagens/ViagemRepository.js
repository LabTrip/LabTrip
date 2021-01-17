export default class ViagemRepository{
  constructor(client){
    this.client = client;
  }

  async getAll(){
    return await this.client('viagem');
  }

  async save(viagem){
    console.log(viagem);
    const [firstRow] = await this.client('viagem')
      .insert(viagem)
      .returning("*");

      return firstRow;
  }

  async getById(tripId){
    return await this.client('viagem')
      .where({'ID': tripId.toString()}).first();
  }

  async update(viagem){
    const [firstRow] = await this.client('viagem')
      .where({'ID': viagem.ID})
      .update({
        apelido: viagem.apelido,
        dataInicio: viagem.dataInicio,
        dataFim: viagem.dataFim,
        statusID: viagem.statusID
      })
      .returning("*");

      return firstRow;
  }

  async delete(viagem){
    await this.client('viagem')
      .where('ID', viagem.ID)
      .del()
  }
}