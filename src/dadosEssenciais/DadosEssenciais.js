export default class DadosEssenciais{
    constructor(id, usuarioId, roteiroAtividadeId, nomeArquivo, chaveArquivo, urlArquivo, privado){
        this.id = id;
        this.usuarioId = usuarioId;
        this.roteiroAtividadeId = roteiroAtividadeId;
        this.nomeArquivo = nomeArquivo;
        this.chaveArquivo = chaveArquivo;
        this.urlArquivo = urlArquivo;
        this.dataUpload = new Date(Date.parse(dataUpload)).toISOString();
        this.privado = privado;
    }
  }