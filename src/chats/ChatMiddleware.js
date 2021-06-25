export default class ChatMiddleware{
  
    constructor(chatRepository){
      this.chatRepository = chatRepository;
    }
  
    async chatExiste(req, res, next){   
      const chat = await this.verificaAcessoChat(req)
       if(!chat){
        return res.status(404).json({status: '403', mensagem: 'Chat não encontrado.'});       
      }
      req.chat = chat;
      next(); 
    }

    async verificaAcesso(req, res, next){
      if(req.acesso.tipoAcesso== "Total" || req.acesso.tipoAcesso== "Gerencial"|| req.acesso.tipoAcesso== "Parcial"){
        next();
      }else{
        return res.status(403).json({status: '403', mensagem: 'Sem permissão de acesso.'}); 
      }
    }

    async verificaAcessoChat(req){
      if(req.acesso.tipoAcesso== "Total" || req.acesso.tipoAcesso== "Gerencial"|| req.acesso.tipoAcesso== "Parcial"){
        return await this.chatRepository.buscaPorId(req);
      }else{
        return undefined;
      }
    }

}