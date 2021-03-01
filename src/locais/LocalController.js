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
  
    //GET /locais
    async buscaTodos(req, res) {
      try{
        const locais = await this.localRepository.buscaTodos();
        res.status(200).json(locais.map(u => localViewModel(u)));
      }
      catch(e){
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
      }
      
    }
  
    async salva(req, res){
      try{
        const {poi, address, position} = req.body;
        const localidade = new Local(poi.name, address.freeformAddress, address.municipality, address.country, position.lat, position.lon);
        return res.status(201).json(localViewModel(await this.localRepository.salva(localidade)));
      }
      catch(e){
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
      }
      
    }
  
    mostra(req, res){
      try{
        return res.status(200).json(localViewModel(req.local)); 
      }
      catch(e){
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
      }
      
    }
  
    async atualiza(req,res){     
      try{
        const{descricao, localId} = req.body;
        const local = new Local(descricao, localId, req.atividade.id); 
        
        const localAtualizado = await this.localRepository.atualiza(local);
        return res.status(200).json(localViewModel(localAtualizado));      
      }
      catch(e){
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
      }
      
    }
  
  
    async deleta(req, res){
      try{
        await this.localRepository.deleta(req.local);
        return res.status(204).end();
      }
      catch(e){
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
      }
      
    }
  
  }