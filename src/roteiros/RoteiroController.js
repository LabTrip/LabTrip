import Roteiro from './Roteiro'
import api from '../requesterConfig'

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
        const {viagemId, statusId, versao, descricaoRoteiro, id} = req.roteiro;
        const versaoAtual = versao + 1
        const roteiro = await this.roteiroRepository.versiona({id, versao: versaoAtual, viagemId, statusId, descricaoRoteiro});
        let roteiroAtividades = await await this.roteiroRepository.buscaRoteiroAtividades({id,versao})
        
        if(roteiroAtividades && roteiroAtividades.length > 0){
          roteiroAtividades.map((dado, index) => {
            roteiroAtividades[index].roteiroId = roteiro.id;
            roteiroAtividades[index].versaoRoteiro = roteiro.versao;
            delete roteiroAtividades[index].id;
          });

          await await this.roteiroRepository.versionaRoteiroAtividades(roteiroAtividades);
        }
        
        res.status(201).json(roteiroViewModel(roteiro));
      }
      catch(e){
        console.log(e)
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
        const viagem = await this.buscaViagemPorId(req);
        if(viagem){
          let roteiros;
          if(viagem.status != "Em planejamento"){
            roteiros = await this.roteiroRepository.buscaPorViagemIdRoteiroAprovado(viagem.id);
          }
          else{
            roteiros = await this.roteiroRepository.buscarPorViagemId(req);
          }          

          return res.status(200).json(roteiros.map(r => roteiroViewModel(r))); 
        }
        else{
          return res.status(404).json({status: '403', mensagem: 'Viagem do roteiro não encontrada ou sem permissão de acesso.'});
        }        

      }catch(e){
        console.log(e)
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});       
      }     
    }

    async buscaViagemPorId(req){
      try {
        let viagem;
        // Buscando perfis disponíveis para o usuario solicitatne
        await api.get("viagens/"+req.params.viagemId, {
          headers: {
            'x-access-token': req.headers['x-access-token']
          }
        })
          .then((response) => {
            //console.log('Response ' + response.data.perfis)
            viagem = response.data;
          })
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
            return undefined;
          });
  
        return viagem;
      }
      catch (e) {
        console.log(e)
        return undefined;
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