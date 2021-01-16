export default class AgenciaMiddleware{
  
    constructor(agenciaRepository){
      this.agenciaRepository = agenciaRepository;
    }
  
    async agenciaExiste(req, res, next){
      //const usuario = this.usuarios.find(u => u.id == req.params.id);
      const agenciaController = await this.agenciaRepository.getById(req.params.ID)
      if(!agencia){
        return res.status(404).json({erro: 'Agencia não encontrada!'});       
      }
      req.agencia = agencia;
      next(); 
    }
  }