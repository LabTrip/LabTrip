import api from '../requesterConfig'

export default class ChatMiddleware{
  
    constructor(chatRepository){
      this.chatRepository = chatRepository;
    }

    async buscaChat(token, caminhoChat){
      const chat = await api.get('chats/'+ caminhoChat, {
        headers: {
          'x-access-token': token
        }
      }).then((response) => {
          //console.log('Response ' + response.data)
          return response.data
      }).catch((err) => {
          console.error("ops! ocorreu um erro" + err);
          return undefined;
      });
      
      return chat;
    }
  
    async chatExiste(req, res, next){   
      
      const chat = await this.verificaAcessoChat(req)
       if(!chat){
        return res.status(404).json({status: '404', mensagem: 'Chat não encontrado.'});       
      }
      req.chat = chat;
      next(); 
    }

    async autentica(token){
      
      const auth = await api.post("login/verifica/",null,
          {
            headers: {
              'x-access-token': token.toString()
          }
        }).then((response) => {
            //console.log('Response ' + response.data)
            return response.data
        }).catch((err) => {
            console.error("ops! ocorreu um erro" + err);
            return undefined;
        });
      
      if(!auth){
        return auth;
      }

      const user = api.get("usuarios/" + auth.sessionInfo.id,
          {
            headers: {
              'x-access-token': token
          }
        }).then((response) => {
            //console.log('Response ' + response.data.perfis)
            return response.data
        }).catch((err) => {
            console.error("ops! ocorreu um erro" + err);
            return undefined;
        });

      return user;
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
        return await this.chatRepository.buscaPorViagemTopicoId(req);
      }else{
        return undefined;
      }
    }

}