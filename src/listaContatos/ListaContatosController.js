import ListaContatos from './ListaContatos'
const logger = require('../logger'); 

const listaContatosViewModel = (listaContatos) => ({
    usuarioId: listaContatos.usuarioId,
    contatoId: listaContatos.contatoId,
    nomeUsuario: listaContatos.nomeUsuario,
    apelidoContato: listaContatos.apelido,
    nomeContato: listaContatos.nome,
    emailContato: listaContatos.email,
  });
  
  
  export default class ListaContatosController {
  
    constructor(listaContatosRepository) {
      this.listaContatosRepository = listaContatosRepository;
    }
  
    
    //GET /listaContatos
    async buscaTodos(req, res) {
      try{
        const listaContatos = await this.listaContatosRepository.buscaTodos();
        res.status(200).json(listaContatos.map(u => listaContatosViewModel(u)));
      }
      catch(e){
        logger.error(e)
        logger.info(e.toString(), req.token)
        return res.status(400).json({status: '400', mensagem: e.toString()});
      }
      
    }

    async buscaTodosPorUsuario(req, res) {
      try{
        const listaContatos = await this.listaContatosRepository.buscaTodosPorUsuario(req);
        res.status(200).json(listaContatos.map(u => listaContatosViewModel(u)));
      }
      catch(e){
        logger.error(e)
        logger.info(e.toString(), req.token)
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.', detalhes: e.toString()});
      }
      
    }

    async buscaPorEmail(req, res) {
      try{
        const listaContatos = await this.listaContatosRepository.buscaPorEmail();
        res.status(200).json(listaContatos.map(u => listaContatosViewModel(u)));
      }
      catch(e){
        logger.error(e)
        logger.info(e.toString(), req.token)
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
      }
      
    }

    async buscaPorTelefone(req, res) {
      try{
        const listaContatos = await this.listaContatosRepository.buscaPorTelefone();
        res.status(200).json(listaContatos.map(u => listaContatosViewModel(u)));
      }
      catch(e){
        logger.error(e)
        logger.info(e.toString(), req.token)
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
      }
      
    }
  
    async salva(req, res){
      try{
        const {usuarioId, contatoId, apelido} = req.body;
        const novoContato = new ListaContatos(usuarioId, contatoId, apelido);
        return res.status(201).json(listaContatosViewModel(await this.listaContatosRepository.salva(novoContato)));
      }
      catch(e){
        logger.error(e)
        logger.info(e.toString(), req.token)
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.', detalhes: e.toString()});
      }
      
    }
  
    mostra(req, res){
      try{
        return res.status(200).json(listaContatosViewModel(req.listaContatos)); 
      }
      catch(e){
        logger.error(e)
        logger.info(e.toString(), req.token)
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
      }
      
    }
  
    async atualiza(req,res){     
      try{
        const {usuarioId, contatoId, apelido} = req.body;
        const contato = new ListaContatos(usuarioId, contatoId, apelido);        
        const contatoAtualizado = await this.listaContatosRepository.atualiza(contato);
        return res.status(200).json(listaContatosViewModel(contatoAtualizado));      
      }
      catch(e){
        logger.error(e)
        logger.info(e.toString(), req.token) 
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
      }
      
    }
  
  
    async deleta(req, res){
      try{
        await this.listaContatosRepository.deleta(req.listaContatos);
        return res.status(204).end();
      }
      catch(e){
        logger.error(e)
        logger.info(e.toString(), req.token) 
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
      }
      
    }
  
  }