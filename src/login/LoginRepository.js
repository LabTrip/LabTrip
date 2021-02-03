export default class LoginRepository{
    constructor(client){
      this.client = client;
    }
  
    async buscaPorEmail(email){
      return await this.client('usuario')
        .where({'email': email.toString()}).first();
    }

    async geraCodigo(email, codigoVerificacao){
      const [firstRow] = await this.client('usuario')
      .where({'email': email})
      .update({
        codigoVerificacao: codigoVerificacao
      }).returning("*");

      return firstRow;
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
    
  }