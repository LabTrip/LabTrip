export default class ListaContatosMiddleware{
  
    constructor(listaContatosRepository){
      this.listaContatosRepository = listaContatosRepository;
    }
  
    async contatoExiste(req, res, next){   
      const listaContatos = await this.verificaAcessoListaContatos(req)
       if(!listaContatos){
        return res.status(404).json({status: '403', mensagem: 'Contato não encontrado na lista.'});       
      }
      req.listaContatos = listaContatos;
      next(); 
    }

    async verificaAcesso(req, res, next){
      if(req.acesso.tipoAcesso== "Total" || req.acesso.tipoAcesso== "Gerencial"|| req.acesso.tipoAcesso== "Parcial"){
        next();
      }else{
        return res.status(403).json({status: '403', mensagem: 'Sem permissão de acesso.'}); 
      }
    }

    async verificaAcessoListaContatos(req){
      if(req.acesso.tipoAcesso== "Total" || req.acesso.tipoAcesso== "Gerencial"|| req.acesso.tipoAcesso== "Parcial"){
        return await this.listaContatosRepository.buscaPorId(req);
      }else{
        return undefined;
      }
    }

}