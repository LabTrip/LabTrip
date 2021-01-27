export default class AgenciaRepository{
    constructor(client){
      this.client = client;
    }
  
    async getAll(){
      return await this.client('agencia');
    }
  
    async save(agencia){
      const [firstRow] = await this.client('agencia')
        .insert(agencia)
        .returning("*");
  
        return firstRow;
    }
  
    async getById(id){
      return await this.client('agencia')
        .where({'id': id.toString()}).first();
    }
  
    async update(agencia){
      const [firstRow] = await this.client('agencia')
        .where({'id': usuario.id})
        .update({
          nome: usuario.nome,
          updatedAt: new Date().toISOString()
        })
        .returning("*");
  
        return firstRow;
    }
  
    async delete(agencia){
      await this.client('agencia')
        .where('id', agencia.id)
        .del()
    }
  }