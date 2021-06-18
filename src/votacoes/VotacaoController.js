import Votacao from './Votacao'

const votacaoViewModel = (votacao) => ({
    roteiroAtividadeId: votacao.roteiroAtividadeId,
    usuarioId: votacao.usuarioId,
    gostou: votacao.gostou,
  });  
  
  export default class VotacaoController {
  
    constructor(votacaoRepository) {
      this.votacaoRepository = votacaoRepository;
    }
  
    //GET 
    async buscaTodos(req, res) {
      try{
        const votacoes = await this.votacaoRepository.buscaTodos();
        res.status(200).json(votacoes.map(u => votacaoViewModel(u)));
      }
      catch(e){
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
      }
      
    }
  
    async salva(req, res){
      try{
        const {roteiroAtividadeId, usuarioId, gostou} = req.body;
        const votacao = new Votacao(roteiroAtividadeId, usuarioId, gostou);
        return res.status(201).json(votacaoViewModel(await this.votacaoRepository.salva(votacao)));
      }
      catch(e){
        //se tentar salvar com mesma chave, faz delete 
        if(e.detail.includes('Key','already exists')){
          const {roteiroAtividadeId, usuarioId, gostou} = req.body;
          const votacao = new Votacao(roteiroAtividadeId, usuarioId, gostou);
          await this.votacaoRepository.deleta(votacao);
          return res.status(204).end();  
        }else{
          return res.status(400).json({status: '400', mensagem: e.detail});
        }   
      }      
    }
  
    mostra(req, res){
      try{
        return res.status(200).json(votacaoViewModel(req.votacao)); 
      }
      catch(e){
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
      }
      
    }
  
    async atualiza(req,res){     
      try{
        const{gostou} = req.body;
        const votacao = new Votacao(req.params.roteiroAtividadeId, req.params.usuarioId, gostou); 
        
        const votacaoAtualizada = await this.votacaoRepository.atualiza(votacao);
        return res.status(200).json(votacaoViewModel(votacaoAtualizada));      
      }
      catch(e){
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
      }
      
    }
  
  
    async deleta(req, res){
      try{
        const votacao = new Votacao(req.params.roteiroAtividadeId, req.params.usuarioId, false)
        await this.votacaoRepository.deleta(votacao);
        return res.status(204).end();
      }
      catch(e){
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
      }
      
    }
  
  }