import Roteiro from './Roteiro'

const roteiroViewModel = (roteiro) => ({
    id: roteiro.id,
    viagemId: roteiro.viagemId,
    statusId: roteiro.statusId,
    status: roteiro.status,
    versao: roteiro.versao,
    descricaoRoteiro: roteiro.descricaoRoteiro,
  });
  
  
  export default class RoteiroController {
  
    constructor(roteiroRepository) {
      this.roteiroRepository = roteiroRepository;
    }
  
    //GET /roteiros
    async buscaTodos(req, res) {
      try{
        const roteiro = await this.roteiroRepository.buscaTodos(req);
        res.status(200).json(roteiro.map(u => roteiroViewModel(u)));
      }  
      catch(e){
         return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});        
      }
    }


  
    async salva(req, res){
      try {
        const {viagemId, statusId, versao, descricaoRoteiro} = req.body;
        const roteiro = await this.roteiroRepository.salva(new Roteiro(viagemId, statusId, versao, descricaoRoteiro));
        
        res.status(201).json(roteiroViewModel(roteiro));
      }
      catch(e){
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});       
      }      
    }

    async versiona(req, res){
      try {
        const {viagemId, statusId, versao, descricaoRoteiro} = req.roteiro;
        const versaoAtual = versao + 1
        const roteiro = await this.roteiroRepository.salva(new Roteiro(viagemId, statusId, versaoAtual, descricaoRoteiro));
        
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

    async buscaRoteirosPorViagemId(req, res){
      try{
        console.log(req.params.viagemId)
        const roteiros = await this.roteiroRepository.buscarPorViagemId(req);
        return res.status(200).json(roteiros.map(r => roteiroViewModel(r))); 

      }catch(e){
        console.log(e)
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});       
      }     
    }
  
    async atualiza(req,res){
      try{
        const {viagemId, statusId, versao, descricaoRoteiro, id } = req.body;
        const roteiro = await this.roteiroRepository.atualiza(new Roteiro(viagemId, statusId, versao, descricaoRoteiro, id));
        return res.status(200).json(roteiroViewModel(roteiro));      
      }catch(e){
        console.log(e)
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