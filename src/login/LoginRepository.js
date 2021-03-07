export default class LoginRepository{
    constructor(client){
      this.client = client;
    }
  
    async buscaPorEmail(email){
      return await this.client('usuario')
        .where({'email': email.toString()}).first();
    }

    async buscaPorId(id){
      return await this.client('usuario')
        .where({'id': id.toString()}).first();
    }

    async geraCodigo(email, codigoVerificacao){
      const [firstRow] = await this.client('usuario')
      .where({'email': email})
      .update({
        codigoVerificacao: codigoVerificacao
      }).returning("*");

      return firstRow;
    }

    async buscaAgenciaId(id){
      return await this.client('funcionario')
        .where({'usuarioId': id.toString()}).first();
    }

    async redefineSenha(email, senha, novoCodigo){
      const [firstRow] = await this.client('usuario')
      .where({'email': email.toString()})
      .update({
        senha: senha,
        verificado: true,
        codigoVerificacao: novoCodigo
      }).returning("*");

      return firstRow;
    }

    async redefineSenhaPorId(id, senha){
      const [firstRow] = await this.client('usuario')
      .where({'id': id.toString()})
      .update({
        senha: senha
      }).returning("*");

      return firstRow;
    }
    
  }