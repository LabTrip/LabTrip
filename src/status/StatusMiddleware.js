export default class StatusMiddleware{
  
    constructor(statusRepository){
      this.statusRepository = statusRepository;
    }
  
    async statusViagemExiste(req, res, next){
      const status = await this.statusRepository.getById(req.body.statusId)
      if(!status){
        return res.status(404).json({erro: 'Status não existe.'});       
      }
      else if(status.descricao == 'Aprovado' || status.descricao == 'Reprovado'){
        return res.status(400).json({erro: 'Status não permitido para viagens.'});
      }
      req.viagem = viagem;
      next(); 
    }
}