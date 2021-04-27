import {v4 as uuidv4} from 'uuid';
import sha256 from 'crypto-js/sha256'

export default class Usuario{
  constructor(nome, email, telefone, nomeFoto, chaveFoto, urlFoto, perfilId, dataNascimento, codigoVerificacao = null, senha = null, id = uuidv4()){
      this.id = id;
      this.nome = nome;
      this.email = email;
      this.telefone = telefone;
      this.nomeFoto = nomeFoto;
      this.chaveFoto = chaveFoto;
      this.urlFoto = urlFoto;
      this.perfilId = perfilId;
      this.dataNascimento = new Date(Date.parse(dataNascimento)).toISOString();
      this.codigoVerificacao = codigoVerificacao;
      this.senha = sha256(senha).toString();
      this.criadoEm = new Date().toISOString();
      this.editadoEm = new Date().toISOString();
      this.deletadoEm = null;
  }
}