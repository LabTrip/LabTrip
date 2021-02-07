export default class AgenciaMiddleware{
  
    constructor(agenciaRepository){
      this.agenciaRepository = agenciaRepository;
    }
  
    async agenciaExiste(req, res, next){
      //const usuario = this.usuarios.find(u => u.id == req.params.id);
      const agencia = await this.agenciaRepository.buscaPorId(req.params.id)
      if(!agencia){
        return res.status(404).json({erro: 'Agencia não encontrada.'});       
      }
      req.agencia = agencia;
      next(); 
    }
  }