export default class UsuarioRepository{
    constructor(client){
      this.client = client;
    }
  
    async getAll(){
      return await this.client('usuarios');
    }
  
    async save(usuario){
      const [firstRow] = await this.client('usuarios')
        .insert(usuario)
        .returning("*");
  
        return firstRow;
    }
  
    async getById(id){
      return await this.client('usuarios')
        .where({'id': id.toString()}).first();
    }
  
    async update(usuario){
      const [firstRow] = await this.client('usuarios')
        .where({'id': usuario.id})
        .update({
          nome: usuario.nome,
          email: usuario.email,
          senha: usuario.senha,
          updatedAt: new Date().toISOString()
        })
        .returning("*");
  
        return firstRow;
    }
  
    async delete(usuario){
      await this.client('usuarios')
        .where('id', usuario.id)
        .del()
    }
  }