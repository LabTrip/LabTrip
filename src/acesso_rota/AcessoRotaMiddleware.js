export default class AcessoRotaMiddleware{
  
    constructor(acessoRotaRepository){
      this.acessoRotaRepository = acessoRotaRepository;
    }

    async acessoRota(req, res, next){
      const requistante = 
      {
        perfilId: req.token.perfilId,
        endpoint: req.baseUrl + req.route.path,
        metodo: req.method
      }

      const acesso = await this.acessoRotaRepository.buscaAcesso(requistante)
      
      if(!acesso){
        return res.status(404).json({erro: 'Viagem não encontrada.'});       
      }
      req.acesso = acesso;
      next(); 
    }
  }