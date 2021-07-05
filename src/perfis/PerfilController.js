
const perfilViewModel = (perfil) => ({
  id: perfil.id,
  descricao: perfil.descricao
});
const logger = require('../logger'); 
export default class PerfilController {

  constructor(perfilRepository) {
    this.perfilRepository = perfilRepository;
  }

  //GET /perfis
  async buscaTodos(req, res) {
    try{
      let perfis;
      switch(req.acesso.tipoAcesso){
        case 'Total':
            perfis = await this.perfilRepository.buscaTodos();
          break;
        case 'Gerencial':
            perfis = await this.perfilRepository.buscaTodos_AcessoGerencial();
          break;
        case 'Parcial':
            perfis = await this.perfilRepository.buscaTodos_AcessoParcial();
          break;
        default:
            return res.status(403).json({status:'403', mensagem:'Sem permissão de acesso.'})
      }
      
      res.status(200).json({perfis: perfis.map(u => perfilViewModel(u))});
    }
    catch(e){
      logger.error(e)
      logger.info(e.toString(), req.token)
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }
    
  }

  mostra(req, res){
    try{
      return res.status(200).json(perfilViewModel(req.perfil));
    }
    catch(e){
      logger.error(e)
      logger.info(e.toString(), req.token)
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }
     
  }

}