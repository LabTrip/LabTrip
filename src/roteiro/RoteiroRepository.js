export default class RoteiroRepository{
    constructor(client){
      this.client = client;
    }
  
    async buscaTodos(){
      return await this.client('roteiro');
    }
  
    async salva(roteiro){
      console.log(roteiro);
      const [firstRow] = await this.client('roteiro')
        .insert(roteiro)
        .returning("*");
  
        return firstRow;
    }
  
    async buscaPorId(roteiroId, viagemId, versao){
      return await this.client('roteiro')
        .where({'Id': roteiroId
        .andWhere({'viagemId': viagemId.toString()}).first()})
        .andWhere({'versao': versao});
    }
  
    async atualiza(roteiro){
      const [firstRow] = await this.client('roteiro')
        .where({'Id': roteiro.Id})
        .andWhere({'viagemId': roteiro.viagemId})
        .andWhere({'versao': roteiro.versao})
        .update({
          statusId: statusId    
        })
        .returning("*");
  
        return firstRow;
    }
  
    async deleta(roteiro){
      await this.client('roteiro')
        .where('Id', roteiro.id)
        .andWhere({'viagemId': roteiro.viagemId})
        .andWhere({'versao': roteiro.versao})
        .del()
    }
  }