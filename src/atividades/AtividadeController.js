import Atividade from './Atividade'

const atividadeViewModel = (atividade) => ({
    atividadeNome: atividade.atividadeNome,
    atividadeDesc: atividade.atividadeDesc,
    atividadeValor: atividade.atividadeValor,
    atividadeHr: atividade.atividadeHr,
    tripId: atividade.tripId,
    atividadeId: atividade.atividadeId,
  });
  
  
  export default class AtividadeController {
  
    constructor(atividadeRepository) {
      this.atividadeRepository = atividadeRepository;
    }
  
    //GET /atividades
    async index(req, res) {
      const atividades = await this.atividadeRepository.getAll();
      res.status(200).json(atividades.map(u => atividadeViewModel(u)));
    }
  
    async save(req, res){
      const {atividadeNome, atividadeDesc, atividadeValor, atividadeHr, tripId} = req.body;
      const atividade = new Atividade(atividadeNome, atividadeDesc, atividadeValor, atividadeHr, tripId);

      await this.atividadeRepository.save(atividade);
      res.status(201).json(atividadeViewModel(atividade));
    }
  
    show(req, res){
      return res.status(200).json(atividadeViewModel(req.atividade)); 
    }
  
    async update(req,res){     
      const{atividadeNome, atividadeDesc, atividadeValor, atividadeHr, tripId} = req.body;
      const atividade = new Atividade(atividadeNome, atividadeDesc, atividadeValor, atividadeHr, tripId, req.atividade.atividadeId); 
      
      const atividadeAtualizada = await this.atividadeRepository.update(atividade);
      return res.status(200).json(atividadeViewModel(atividadeAtualizada));      
    }
  
  
    async delete(req, res){
      await this.atividadeRepository.delete(req.atividade);
      return res.status(204).end();
    }
  
  }