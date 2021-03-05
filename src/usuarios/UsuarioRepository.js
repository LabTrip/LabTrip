export default class UsuarioRepository{
    constructor(client){
      this.client = client;
    }
  
    async buscaTodos(){
      return await this.client('usuario');
    }
  
    async salva(usuario){
      const [firstRow] = await this.client('usuario')
        .insert(usuario)
        .returning("*");
  
        return firstRow;
    }
  
    async buscaPorId(id){
      return await this.client('usuario')
        .where({'id': id.toString()}).first();
    }

    async buscaPorEmail(email){
      return await this.client('usuario')
        .where({'email': email.toString()}).first();
    }

    async buscaPorEmailLike(email){
      return await this.client('usuario')
        .where('email','like', '%'+ email +'%');
    }
  
    async atualiza(usuario){
      const [firstRow] = await this.client('usuario')
        .where({'id': usuario.id})
        .update({
          nome: usuario.nome,
          email: usuario.email,
          telefone: usuario.telefone,
          perfilId: usuario.perfilId,
          dataNascimento: usuario.dataNascimento,
          editadoEm: new Date().toISOString()
        })
        .returning("*");
  
        return firstRow;
    }

    async atualizaSenha(usuario){
      const [firstRow] = await this.client('usuario')
        .where({'id': usuario.id})
        .update({
          senha: usuario.senha,
          editadoEm: new Date().toISOString()
        })
        .returning("*");
  
        return firstRow;
    }
  
    async deleta(usuario){
      await this.client('usuario')
        .where({'id': usuario.id})
        .update({
          deletadoEm: new Date().toISOString()
        })
    }
  }