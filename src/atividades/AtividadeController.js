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
      try{
        let atividades;
        switch(req.acesso.tipoAcesso){
          case 'Total':
            atividades = await this.atividadeRepository.buscaTodos();
            break;
          case 'Gerencial':
            atividades = await this.atividadeRepository.buscaTodos_AcessoParcial(req.token.agenciaId);
            break;
          case 'Parcial':
            atividades = await this.atividadeRepository.buscaTodos_AcessoParcial(req.token.agenciaId);
            break;
          default:
            return res.status(403).json({status: '403', mensagem: 'Sem permissão de acesso.'});
        }
        
        return res.status(200).json(atividades.map(u => atividadeViewModel(u)));
      }
      catch(e){
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
      }
      
    }

    async salvaLocal(local){
      try{
        const {id, poi, address, position} = local;
        const localidade = new Local(poi.name, address.freeformAddress, address.municipality, address.country, position.lat, position.lon, id);
  
        return await this.atividadeRepository.salvaLocal(localidade) || localidade;
      }
      catch(e){
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
      }
      
    }
  
    async salva(req, res){
      try{
        const {descricao, localId, local, agenciaId} = req.body;
        if(req.token.agenciaId == agenciaId || req.acesso.tipoAcesso == "Total"){
          const localidade = await this.salvaLocal(local);
  
          const atividade = new Atividade(descricao, agenciaId, localidade.id);
          
          await this.atividadeRepository.salva(atividade);
          return res.status(201).json(atividadeViewModel(atividade));
        }
        else{
          return res.status(403).json({status: '403', mensagem: 'Você não tem permissão para criar atividades na agencia informada.'}); 
        }
      }
      catch(e){
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
      }
            
    }
  
    mostra(req, res){
      try{
        return res.status(200).json(atividadeViewModel(req.atividade)); 
      }
      catch(e){
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
      }
      
    }

    async mostraBusca(req, res){
      try{
        const descricaoAtividade = req.query.descricaoAtividade

        let atividades

        if(req.acesso.tipoAcesso == "Total"){
          atividades = await this.atividadeRepository.buscaPorDescricaoAtividade(descricaoAtividade);
        }
        else{
          atividades = await this.atividadeRepository.buscaPorDescricaoAtividadeAgenciaId(descricaoAtividade, req.token.agenciaId);
        }
        
        if(atividades.length == 0){
          atividades.push({id: 1, descricao: 'Nenhuma atividade encontrada'})
        }

        return res.status(200).json(atividades.map((a) => atividadeViewModel(a))); 
      }
      catch(e){
        console.log(e)
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
      }
      
    }
  
    localExiste(localId){
      try{
        const local = this.atividadeRepository.buscaLocalPorId(localId);
        return local;
      }
      catch(e){
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
      }
      
    }

    async atualiza(req,res){     
      try{
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
      catch(e){
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
      }
                 
    }

    async deleta(req, res){
      try{
        await this.atividadeRepository.deleta(req.atividade);
        return res.status(204).end();
      }
      catch(e){
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
      }
      
    }
  
  }