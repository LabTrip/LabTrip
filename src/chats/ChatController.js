import Chat from './Chat'

const chatViewModel = (chat) => ({
    viagemId: chat.viagemId,
    nome: chat.nome,
    topico: chat.topicoId,
  });  
  
  export default class ChatController {
  
    constructor(chatRepository) {
      this.chatRepository = chatRepository;
    }
  
    //GET 
    async buscaTodos(req, res) {
      try{
        const chats = await this.chatRepository.buscaTodos();
        res.status(200).json(chats.map(u => chatViewModel(u)));
      }
      catch(e){
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
      }
      
    }

    async buscaTodosPorViagemIdTopicoId(req, res) {
      try{
        const chats = await this.chatRepository.buscaTodosPorViagemIdTopicoId(req);
        res.status(200).json(chats.map(u => chatViewModel(u)));
      }
      catch(e){
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.', detalhes: e});
      }
      
    }
  
    async salva(req, res){
      try{
        const {nome, viagemId, topicoId} = req.body;
        const chat = new Chat(nome, viagemId, topicoId);
        return res.status(201).json(chatViewModel(await this.chatRepository.salva(chat)));
      }
      catch(e){
          return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});           
      }      
    }
  
    mostra(req, res){
      try{
        return res.status(200).json(chatViewModel(req.chat)); 
      }
      catch(e){
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
      }
      
    }
  
    async atualiza(req,res){     
      try{
        const{id, nome, viagemId, topicoId} = req.body;
        const chat = new Chat(id, nome, viagemId, topicoId); 
        
        const chatAtualizado = await this.chatRepository.atualiza(chat);
        return res.status(200).json(chatViewModel(chatAtualizado));      
      }
      catch(e){
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
      }
      
    }
  
  
    async deleta(req, res){
      try{
        await this.chatRepository.deleta(req.chat);
        return res.status(204).end();
      }
      catch(e){
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
      }
      
    }
  
  }