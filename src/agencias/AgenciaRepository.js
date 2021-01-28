export default class AgenciaRepository{
    constructor(client){
      this.client = client;
    }
  
    async buscaTodos(){
      return await this.client('agencia');
    }
  
    async salva(agencia){
      const [firstRow] = await this.client('agencia')
        .insert(agencia)
        .returning("*");
  
        return firstRow;
    }
  
    async buscaPorId(id){
      return await this.client('agencia')
        .where({'id': id.toString()}).first();
    }
  
    async atualiza(agencia){
      const [firstRow] = await this.client('agencia')
        .where({'id': agencia.id})
        .update({
          nome: agencia.nome,
          editadoEm: new Date().toISOString()
        })
        .returning("*");
  
        return firstRow;
    }
  
    async deleta(agencia){
      await this.client('agencia')
        .where({'id': agencia.id})
        .update({
          deletadoEm: new Date().toISOString()
        })
    }
  }