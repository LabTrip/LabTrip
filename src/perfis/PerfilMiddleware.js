export default class PerfilMiddleware{
  
    constructor(perfilRepository){
      this.perfilRepository = perfilRepository;
    }
  
    async perfilExiste(req, res, next){
      //const usuario = this.usuarios.find(u => u.id == req.params.id);
      const perfil = await this.perfilRepository.buscaPorId(req.params.id)
      if(!perfil){
        return res.status(404).json({erro: 'Perfil não encontrado!'});       
      }
      req.perfil = perfil;
      next(); 
    }
  }