import Local from './Local'

const localViewModel = (local) => ({
    id: local.id,
    local: local.local,
    endereco: local.endereco,
    cidade: local.cidade,
    pais: local.pais,
    latitude: local.latitude,
    longitude: local.longitude,
  });
  
  
  export default class LocalController {
  
    constructor(localRepository) {
      this.localRepository = localRepository;
    }
  
    //GET /atividades
    async buscaTodos(req, res) {
      const locais = await this.localRepository.buscaTodos();
      res.status(200).json(locais.map(u => localViewModel(u)));
    }
  
    async salva(req, res){
      const {poi, address, position} = req.body;
      const localidade = new Local(poi.name, address.freeformAddress, address.municipality, address.country, position.lat, position.lon);
      return res.status(201).json(localViewModel(await this.localRepository.salva(localidade)));
    }
  
    mostra(req, res){
      return res.status(200).json(localViewModel(req.local)); 
    }
  
    async atualiza(req,res){     
      const{descricao, localId} = req.body;
      const local = new Local(descricao, localId, req.atividade.id); 
      
      const localAtualizado = await this.localRepository.atualiza(local);
      return res.status(200).json(localViewModel(localAtualizado));      
    }
  
  
    async deleta(req, res){
      await this.localRepository.deleta(req.local);
      return res.status(204).end();
    }
  
  }