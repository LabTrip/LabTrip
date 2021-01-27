export default class UsuarioRepository{
    constructor(client){
      this.client = client;
    }
  
    async getAll(){
      return await this.client('usuario');
    }
  
    async save(usuario){
      const [firstRow] = await this.client('usuario')
        .insert(usuario)
        .returning("*");
  
        return firstRow;
    }
  
    async getById(id){
      return await this.client('usuario')
        .where({'id': id.toString()}).first();
    }
  
    async update(usuario){
      const [firstRow] = await this.client('usuario')
        .where({'id': usuario.id})
        .update({
          nome: usuario.nome,
          email: usuario.email,
          senha: usuario.senha,
          perfilId: usuario.perfilId
        })
        .returning("*");
  
        return firstRow;
    }
  
    async delete(usuario){
      await this.client('usuario')
        .where('id', usuario.id)
        .del()
    }
  }