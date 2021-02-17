
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
    const perfis = await this.perfilRepository.buscaTodos();
    res.status(200).json(perfis.map(u => perfilViewModel(u)));
  }

  mostra(req, res){
    return res.status(200).json(perfilViewModel(req.perfil)); 
  }

}