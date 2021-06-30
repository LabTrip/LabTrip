export default class DadosEssenciais{
    constructor( usuarioId, roteiroAtividadeId, nomeArquivo, chaveArquivo, urlArquivo, privado, id = null,){
        if(id){
            this.id = id;
        }
        this.usuarioId = usuarioId;
        this.roteiroAtividadeId = roteiroAtividadeId;
        this.nomeArquivo = nomeArquivo;
        this.chaveArquivo = chaveArquivo;
        this.urlArquivo = urlArquivo;
        this.dataUpload = new Date().toISOString();
        this.privado = privado;
    }
  }