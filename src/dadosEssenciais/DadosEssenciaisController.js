import DadosEssenciais from './DadosEssenciais'

const dadosEssenciaisViewModel = (dadosEssenciais) => ({
    id: dadosEssenciais.id, 
    usuarioId: dadosEssenciais.usuarioId, 
    roteiroAtividadeId: dadosEssenciais.roteiroAtividadeId, 
    nomeArquivo: dadosEssenciais.nomeArquivo, 
    chaveArquivo: dadosEssenciais.chaveArquivo, 
    urlArquivo: dadosEssenciais.urlArquivo, 
    privado: dadosEssenciais.privado
  });  
  
  export default class DadosEssenciaisController {
  
    constructor(dadosEssenciaisRepository) {
      this.dadosEssenciaisRepository = dadosEssenciaisRepository;
    }
  
    //GET 
    async buscaTodos(req, res) {
      try{
        const dadosEssenciais = await this.dadosEssenciaisRepository.buscaTodos();
        res.status(200).json(dadosEssenciais.map(u => dadosEssenciaisViewModel(u)));
      }
      catch(e){        
        return res.status(400).json({status: '400', mensagem: e});
      }
      
    }

    async buscaPorRoteiroAtividadeId(req, res) {
      try{
        const dadosEssenciais = await this.dadosEssenciaisRepository.buscaPorRoteiroAtividadeId(req);
        res.status(200).json(dadosEssenciais.map(u => dadosEssenciaisViewModel(u)));
      }
      catch(e){
        console.log(e)
        return res.status(400).json({status: '400', mensagem: e.detail});
      }
      
    }
  
    async salva(req, res){
      try{
        const {id, usuarioId, roteiroAtividadeId, nomeArquivo, chaveArquivo, urlArquivo, privado} = req.body;
        const dadosEssenciais = new DadosEssenciais(id, usuarioId, roteiroAtividadeId, nomeArquivo, chaveArquivo, urlArquivo, privado);
        return res.status(201).json(dadosEssenciaisViewModel(await this.dadosEssenciaisRepository.salva(dadosEssenciais)));
      }
      catch(e){        
        return res.status(400).json({status: '400', mensagem: e.detail});
          
      }      
    }
  
    mostra(req, res){
      try{
        return res.status(200).json(dadosEssenciaisViewModel(req.dadosEssenciais)); 
      }
      catch(e){
        return res.status(400).json({status: '400', mensagem: e.detail});
      }
      
    }
  
    async atualiza(req,res){     
      try{
        const{id, usuarioId, roteiroAtividadeId, nomeArquivo, chaveArquivo, urlArquivo, privado} = req.body;
        const dadosEssenciais = new DadosEssenciais(id, usuarioId, roteiroAtividadeId, nomeArquivo, chaveArquivo, urlArquivo, privado); 
        
        const dadosEssenciaisAtualizado = await this.dadosEssenciaisRepository.atualiza(dadosEssenciais);
        return res.status(200).json(dadosEssenciaisViewModel(dadosEssenciaisAtualizado));      
      }
      catch(e){
        return res.status(400).json({status: '400', mensagem: e.detail});
      }
      
    }
  
  
    async deleta(req, res){
      try{
        const dadosEssenciais = new DadosEssenciais(req.params.dadosEssenciaisId)
        await this.dadosEssenciaisRepository.deleta(dadosEssenciais);
        return res.status(204).end();
      }
      catch(e){
        return res.status(400).json({status: '400', mensagem: e.detail});
      }
      
    }
  
  }