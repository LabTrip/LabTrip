export default class AcessoRotaMiddleware{
  
    constructor(acessoRotaRepository){
      this.acessoRotaRepository = acessoRotaRepository;
    }

    async acessoRota(req, res, next){
      const requisitante = 
      {
        perfilId: req.token.perfilId,
        endpoint: req.baseUrl + req.route.path,
        metodo: req.method
      }

      console.log(requisitante.endpoint)

      if((requisitante.perfilId == 2 || requisitante.perfilId == 3)){
        if(!this.verificaAgenciaAtrelada(req)){
          return res.status(403).json({status: '403', mensagem: 'Sem permissão de acesso: usuário de funcionário sem agência atrelada.'});
        }        
      }

      const acesso = await this.acessoRotaRepository.buscaAcesso(requisitante)
      
      if(!acesso){
        return res.status(403).json({status: '403', mensagem: 'Sem permissão de acesso.'});       
      }
      req.acesso = acesso;
      next(); 
    }


    async verificaAgenciaAtrelada(req){
      let acesso = false;

      if((this.rotaNecessitaAgencia(req.route.path)) && (req.token.agenciaId == null || req.token.agenciaId == undefined)){
        acesso = false
      }
      else{
        acesso = true
      }

      return acesso;
    }

    rotaNecessitaAgencia(rota){
      const rotasRequireAgenciaAtrelada = [
        'viagens',
        'roteiros',
        'orcamentos',
        'atividades',
        'agencias'
      ];
      let necessita = false;

      rotasRequireAgenciaAtrelada.map((r) => {
        if(rota.includes(r)){
          let necessita = true;
        }
      })

      return necessita
    }
  }