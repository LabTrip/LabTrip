import Atividade from './Atividade'
import Local from '../locais/Local';

const atividadeViewModel = (atividade) => ({
    id: atividade.id,
    descricao: atividade.descricao,
    localId: atividade.localId,
    agenciaId: atividade.agenciaId,
    local: atividade.local,
    endereco: atividade.endereco,
    cidade: atividade.cidade,
    pais: atividade.pais,
    latitude: atividade.latitude,
    longitude: atividade.longitude,
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

    async salvaLocal(local){
      const {poi, address, position} = local;
      const localidade = new Local(poi.name, address.freeformAddress, address.municipality, address.country, position.lat, position.lon);
      return await this.atividadeRepository.salvaLocal(localidade);
    }
  
    async salva(req, res){
      const {descricao, localId, local, agenciaId} = req.body;
    
      const localidade = await this.salvaLocal(local);

      const atividade = new Atividade(descricao, agenciaId, localidade.id);
      
      await this.atividadeRepository.salva(atividade);
      res.status(201).json(atividadeViewModel(atividade));
    }
  
    mostra(req, res){
      console.log(req.atividade)
      return res.status(200).json(atividadeViewModel(req.atividade)); 
    }
  
    localExiste(localId){
      const local = this.atividadeRepository.buscaLocalPorId(localId);
      return local;
    }

    async atualiza(req,res){     
      const{descricao, localId} = req.body;
      const atividade = new Atividade(descricao, localId, req.atividade.id);
      const local = await this.localExiste(localId);
      if(local){
        const atividadeAtualizada = await this.atividadeRepository.atualiza(atividade);
        return res.status(200).json(atividadeViewModel(atividadeAtualizada)); 
      }
      else{
        return res.status(404).json({erro: 'Id do local não encontrado.'});       
      }           
    }

    async deleta(req, res){
      await this.atividadeRepository.deleta(req.atividade);
      return res.status(204).end();
    }
  
  }