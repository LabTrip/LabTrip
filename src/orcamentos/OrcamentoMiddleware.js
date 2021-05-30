import api from '../requesterConfig'

export default class OrcamentoMiddleware{
  
    constructor(orcamentoRepository){
      this.orcamentoRepository = orcamentoRepository;
    }
  
    async roteiroExiste(req, res, next){
      const roteiro = await api.get("roteiros/"+req.params.roteiroId+'/'+req.params.versaoRoteiro, {
        headers: {
          'x-access-token': req.headers['x-access-token']
        }
      })
        .then((response) => {
          //console.log('Response ' + response.data.perfis)
          return response.data;
        })
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
          return undefined;
        });
      
      if(!roteiro){
        return res.status(403).json({status: '403', mensagem: 'O roteiro vinculado ao orçamento não encontrado ou sem permissão de acesso.'});       
      }
      req.roteiro = roteiro;
      next(); 
    }

    async orcamentoExiste(req, res, next){
      try{
        if(req.path.route == '/orcamentos/despesas-extras'){
          const orcamento = await this.orcamentoRepository.buscaPorId(req.body.orcamentoId);
        }
        else{
          const orcamento = await this.orcamentoRepository.buscaPorId(req.params.orcamentoId);
        }
        
        if(!orcamento){
          return res.status(403).json({status: '403', mensagem: 'Orçamento não encontrado ou sem permissão de acesso.'});       
        }

        const roteiro = await api.get("roteiros/"+orcamento.roteiroId+'/'+orcamento.versaoRoteiro, {
          headers: {
            'x-access-token': req.headers['x-access-token']
          }
        })
          .then((response) => {
            //console.log('Response ' + response.data.perfis)
            return response.data;
          })
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
            return undefined;
          });
        
        if(!roteiro){
          return res.status(403).json({status: '403', mensagem: 'O roteiro vinculado ao orçamento não encontrado ou sem permissão de acesso.'});       
        }

        req.orcamento = orcamento;
        next();
      }
      catch(e){
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
      }
    }

    async usuarioProprietario(req, res, next){
      
    }

    async verificaAcesso(req){
      
      switch(req.acesso.tipoAcesso){
        case 'Total':
          return await this.orcamentoRepository.buscaPorId(req.params.id);
          break;
        case 'Gerencial':
            return await this.orcamentoRepository.buscaPorId_AcessoGerencial(req.params.id, req.token.agenciaId);
          break;
        case 'Parcial':
          return await this.orcamentoRepository.buscaPorId_AcessoParcial(req.params.id,req.token.id);
          break;
        default:
          return undefined;
      }
    }

  }