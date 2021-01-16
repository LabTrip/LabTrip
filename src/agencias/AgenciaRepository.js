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
  
    async getById(ID){
      return await this.client('agencia')
        .where({'ID': id.toString()}).first();
    }
  
    async update(agencia){
      const [firstRow] = await this.client('agencia')
        .where({'ID': usuario.id})
        .update({
          nome: usuario.nome,
          updatedAt: new Date().toISOString()
        })
        .returning("*");
  
        return firstRow;
    }
  
    async delete(agencia){
      await this.client('agencia')
        .where('ID', agencia.ID)
        .del()
    }
  }