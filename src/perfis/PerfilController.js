
const perfilViewModel = (perfil) => ({
  id: perfil.id,
  descricao: perfil.descricao
});

export default class PerfilController {

  constructor(perfilRepository) {
    this.perfilRepository = perfilRepository;
  }

  //GET /perfis
  async buscaTodos(req, res) {
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
          return res.status(404).json({status:'404', mensagem:'Acesso restrito.'})
    }
    
    res.status(200).json({perfis: perfis.map(u => perfilViewModel(u))});
  }

  mostra(req, res){
    return res.status(200).json(perfilViewModel(req.perfil)); 
  }

}