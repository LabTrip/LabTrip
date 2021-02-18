export default class LocalRepository{
    constructor(client){
      this.client = client;
    }
  
    async buscaTodos(){
      return await this.client('local');
    }
  
    async salva(local){
      const [firstRow] = await this.client('local')
        .insert({
          cidade: local.cidade,
          pais: local.pais,
          endereco: local.endereco,
          latitude: local.latitude,
          longitude: local.longitude,
          local: local.local
        })
        .returning("*");
  
        return firstRow;
    }
  
    async buscaPorId(id){
      return await this.client('local')
        .where({'id': id.toString()}).first();
    }
  
    async atualiza(local){
      const [firstRow] = await this.client('local')
        .where({'id': atividade.id})
        .update({
          cidade: local.cidade,
          pais: local.pais,
          endereco: local.endereco,
          latitude: local.latitude,
          longitude: local.longitude,
          local: local.local
        })
        .returning("*");
  
        return firstRow;
    }
  
    async deleta(local){
      await this.client('local')
        .where('id', atividade.id)
        .delete();
    }
  }