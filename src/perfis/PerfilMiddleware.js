export default class PerfilMiddleware{
  
    constructor(perfilRepository){
      this.perfilRepository = perfilRepository;
    }
  
    async perfilExiste(req, res, next){
      const perfil = await this.perfilRepository.buscaPorId(req.params.id)
      if(!perfil){
        return res.status(404).json({erro: 'Perfil não encontrado.'});       
      }
      req.perfil = perfil;
      next(); 
    }

    async perfilUsuarioExiste(req, res, next){
      const perfil = await this.perfilRepository.buscaPorId(req.body.perfilId)
      if(!perfil){
        return res.status(404).json({erro: 'Perfil não encontrado.'});       
      }
      req.perfil = perfil;
      next(); 
    }
  }