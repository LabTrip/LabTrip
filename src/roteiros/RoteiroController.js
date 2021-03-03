import Roteiro from './Roteiro'

const roteiroViewModel = (roteiro) => ({
    id: roteiro.id,
    viagemId: roteiro.viagemId,
    statusId: roteiro.statusId,
    versao: roteiro.versao,
  });
  
  
  export default class RoteiroController {
  
    constructor(roteiroRepository) {
      this.roteiroRepository = roteiroRepository;
    }
  
    //GET /roteiros
    async buscaTodos(req, res) {
      try{
        const roteiro = await this.roteiroRepository.buscaTodos();
        res.status(200).json(roteiro.map(u => roteiroViewModel(u)));
      }  
      catch(e){
         return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
        
      }
    }

  
    async salva(req, res){
      try {
        const {viagemId, statusId, versao} = req.body;
        const roteiro = new Roteiro(viagemId, statusId, versao);
        await this.roteiroRepository.salva(roteiro);
        res.status(201).json(roteiroViewModel(roteiro));
      }
      catch(e){
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});       
      }
      
    }
  
    mostra(req, res){
      try{
        return res.status(200).json(roteiroViewModel(req.roteiro)); 

      }catch(e){
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});       
      }
     
    }
  
    async atualiza(req,res){
      try{
        const {viagemId, statusId, versao, id } = req.body;
        const roteiro = new Roteiro(viagemId, statusId, versao, id); 
        const roteiroAtualizado = await this.roteiroRepository.atualiza(roteiro);
        return res.status(200).json(roteiroViewModel(roteiroAtualizado));      
      }catch(e){
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});       
      }    
      
    }    

    async deleta(req, res){
      try{
        await this.roteiroRepository.deleta(req.roteiro);
        return res.status(204).end();
      }catch(e){
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});       
      }  
    
    }
  
  }