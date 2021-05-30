import api from '../requesterConfig'

export default class OrcamentoMiddleware{
  
    constructor(orcamentoRepository){
      this.orcamentoRepository = orcamentoRepository;
    }
  
    async roteiroExiste(req, res, next){
      const roteiro = await this.requestRoteiro(req, req.params.roteiroId, req.params.versaoRoteiro);
      
      if(!roteiro){
        return res.status(403).json({status: '403', mensagem: 'O roteiro vinculado ao orçamento não encontrado ou sem permissão de acesso.'});       
      }
      req.roteiro = roteiro;
      next(); 
    }


    async orcamentoExiste(req, res, next){
      try{
        let orcamento;
        if(req.route.path == '/despesaExtra'){
          console.log(req.body.orcamentoId);
          orcamento = await this.orcamentoRepository.buscaPorId(req.body.orcamentoId);
        }
        else if(req.route.path == '/despesaExtra/:id'){
          console.log(req.body.orcamentoId);
          orcamento = await this.orcamentoRepository.buscaPorId(req.despesa.orcamentoId);
        }
        else{
          orcamento = await this.orcamentoRepository.buscaPorId(req.params.orcamentoId);
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
        console.log(e);
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
      }
    }

    async podeCriarDespesa(req, res, next){
      let temPermissao = false;
      if(req.orcamento.tipoOrcamentoId == 1){
        const roteiro = await this.requestRoteiro(req, req.orcamento.roteiroId, req.orcamento.versaoRoteiro)
        console.log(roteiro)
        const permissaoViagem = await this.orcamentoRepository.buscaPermissaoViagem(roteiro.viagemId, req.token.id);

        if(permissaoViagem && (permissaoViagem.descricao == 'Proprietário' || permissaoViagem.descricao == 'Agente' || req.token.perfilId == 2 || req.token.perfilId == 1)){
          temPermissao = true;
        }
      }
      else{
        console.log(req.orcamento.id, req.token.id)
        const usuarioOrcamento = await this.orcamentoRepository.buscaUsuarioOrcamento(req.orcamento.id, req.token.id);
        console.log(usuarioOrcamento)
        if(usuarioOrcamento){
          temPermissao = true;
        }
      }

      if(temPermissao){
        next();
      }
      else{
        return res.status(403).json({status: '403', mensagem: 'Sem permissão de acesso para este orçamento.'});       
      }
    }

    async requestRoteiro(req, roteiroId, versaoRoteiro){
      try{
        const roteiro = await api.get("roteiros/"+roteiroId+'/'+versaoRoteiro, {
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
        
        return roteiro;
      }
      catch(e){
        console.log(e)
        return undefined;
      }
    }

    async despesaExtraExiste(req, res, next){
      const despesa = this.orcamentoExiste.buscaDespesaPorId(req.params.id);

      if(!despesa){
        return res.status(403).json({status: '403', mensagem: 'A despesa não foi encontrada.'});       
      }

      req.despesa = despesa;
      next();
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