import Roteiro from './Roteiros'

const roteiroViewModel = (roteiro) => ({
    id: roteiro.id,
    viagemId: roteiro.viagemId,
    statusId: roteiro.statusId,
    versao: roteiro.versao,
  });
  
  
  export default class RoteiroController {
  
    constructor(RoteiroRepository) {
      this.roteiroRepository = roteiroRepository;
    }
  
    //GET /roteiros
    async index(req, res) {
      const roteiro = await this.roteiroRepository.buscaTodos();
      res.status(200).json(roteiro.map(u => roteiroViewModel(u)));
    }
  
    async salva(req, res){
      const {viagemId, statusId, versao} = req.body;
      const roteiro = new Roteiro(viagemId, statusId, versao);

      await this.roteiroRepository.salva(roteiro);
      res.status(201).json(roteiroViewModel(roteiro));
    }
  
    mostra(req, res){
      return res.status(200).json(roteiroViewModel(req.roteiro)); 
    }
  
    async atualiza(req,res){
      const {viagemId, statusId, versao} = req.body;
      const roteiro = new Roteiro(viagemId, statusId, versao);
      const roteiroAtualizado = await this.roteiroRepository.atualiza(roteiro);
      return res.status(200).json(roteiroViewModel(roteiroAtualizado));      
    } 
    

      async deleta(req, res){
      await this.roteiroRepository.deleta(req.roteiro);
      return res.status(204).end();
    }
  
  }