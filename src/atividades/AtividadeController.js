import Atividade from './Atividade'

const atividadeViewModel = (atividade) => ({
    id: atividade.id,
    descricao: atividade.descricao,
    localId: atividade.localId,
  });
  
  
  export default class AtividadeController {
  
    constructor(atividadeRepository) {
      this.atividadeRepository = atividadeRepository;
    }
  
    //GET /atividades
    async buscaTodos(req, res) {
      const atividades = await this.atividadeRepository.buscaTodos();
      res.status(200).json(atividades.map(u => atividadeViewModel(u)));
    }
  
    async salva(req, res){
      const {descricao, localId} = req.body;
      const atividade = new Atividade(descricao, localId);

      await this.atividadeRepository.salva(atividade);
      res.status(201).json(atividadeViewModel(atividade));
    }
  
    mostra(req, res){
      return res.status(200).json(atividadeViewModel(req.atividade)); 
    }
  
    async atualiza(req,res){     
      const{descricao, localId} = req.body;
      const atividade = new Atividade(descricao, localId, req.atividade.id); 
      
      const atividadeAtualizada = await this.atividadeRepository.atualiza(atividade);
      return res.status(200).json(atividadeViewModel(atividadeAtualizada));      
    }
  
  
    async deleta(req, res){
      await this.atividadeRepository.deleta(req.atividade);
      return res.status(204).end();
    }
  
  }