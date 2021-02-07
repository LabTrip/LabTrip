export default class ViagemRepository{
  constructor(client){
    this.client = client;
  }

  async buscaTodos(){
    return await this.client('viagem');
  }

  async buscaTodosComPermissao(id){
    return await this.client('viagem')
      .innerJoin('usuario_viagem', 'viagem.id', 'usuario_viagem.viagemId')
      .where({
        usuarioId: id,
      });
  }

  async salva(viagem){
    const [firstRow] = await this.client('viagem')
      .insert(viagem)
      .returning("*");

      return firstRow;
  }

  async buscaPorId(id){
    return await this.client('viagem')
      .where({'id': id.toString()}).first();
  }

  async atualiza(viagem){
    const [firstRow] = await this.client('viagem')
      .where({'id': viagem.id})
      .update(viagem)
      .returning("*");

      return firstRow;
  }

  async deleta(viagem){
    await this.client('viagem')
      .where('id', viagem.id)
      .update({
        deletedAt: new Date().toISOString,
      })
  }

  async salvaParticipantes(participantes){
    await this.client('usuario_viagem')
      .insert(participantes)
      .returning("*");
  }
}