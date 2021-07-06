import RoteiroAtividade from './RoteiroAtividade'
const logger = require('../logger'); 

const roteiroAtividadeViewModel = (roteiroAtividade) => ({  
    id: roteiroAtividade.id,
    atividadeId: roteiroAtividade.atividadeId,
    local: roteiroAtividade.local,
    endereco: roteiroAtividade.endereco,
    cidade: roteiroAtividade.cidade,
    pais: roteiroAtividade.pais,
    latitude: roteiroAtividade.latitude,
    longitude: roteiroAtividade.longitude,
    roteiroId: roteiroAtividade.roteiroId,    
    versaoRoteiro: roteiroAtividade.versaoRoteiro,
    dataInicio: roteiroAtividade.dataInicio,
    dataFim: roteiroAtividade.dataFim,
    custo: roteiroAtividade.custo,
    statusId: roteiroAtividade.statusId,
    votoPositivo:roteiroAtividade.positivo,
    votoNegativo:roteiroAtividade.negativo,
    observacaoCliente: roteiroAtividade.observacaoCliente,
    observacaoAgente: roteiroAtividade.observacaoAgente,
  });
  
  
  export default class RoteiroAtividadeController {
  
    constructor(roteiroAtividadeRepository) {
      this.roteiroAtividadeRepository = roteiroAtividadeRepository;
    }
  
    //GET /roteiroAtividades
    async buscaTodos(req, res) {
      try{
        const roteiroAtividade= await this.roteiroAtividadeRepository.buscaTodos(req);
        res.status(200).json(roteiroAtividade.map(u => roteiroAtividadeViewModel(u)));
      }  
      catch(e){
        logger.error(e)
	      logger.info(e.toString(), req.token)
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
                 
      }
    }


    //GET /roteiroAtividades
    async buscaTodosPorRoteiro(req, res) {
    
      try{
 
        const roteiroAtividade = await this.roteiroAtividadeRepository.buscaTodosPorRoteiro(req);
        
        res.status(200).json(roteiroAtividade.map(u => roteiroAtividadeViewModel(u)));
      }  
      catch(e){
        logger.error(e)
	      logger.info(e.toString(), req.token)
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
                  
      }
    } 
  
    async salva(req, res){
      try {
        const {atividadeId, roteiroId, versaoRoteiro, dataInicio, dataFim, custo, statusId, observacaoCliente, observacaoAgente} = req.body;
        const roteiroAtividade= new RoteiroAtividade(atividadeId, roteiroId, versaoRoteiro, dataInicio, dataFim, custo, statusId, observacaoCliente, observacaoAgente);
        await this.roteiroAtividadeRepository.salva(roteiroAtividade);
        res.status(201).json(roteiroAtividadeViewModel(roteiroAtividade));
      }
      catch(e){
        logger.error(e)
	      logger.info(e.toString(), req.token)
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.', detalhes: e.toString()});       
      }      
    }
  
    mostra(req, res){
      try{
        return res.status(200).json(roteiroAtividadeViewModel(req.roteiroAtividade)); 

      }catch(e){
        logger.error(e)
	      logger.info(e.toString(), req.token)
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});       
      }
     
    }
  
    async atualiza(req,res){
      try{
        const {atividadeId, roteiroId, versaoRoteiro, dataInicio, dataFim, custo, statusId, observacaoCliente, observacaoAgente, id} = req.body;
        const roteiroAtividade= new RoteiroAtividade(atividadeId, roteiroId, versaoRoteiro, dataInicio, dataFim, custo, statusId, observacaoCliente, observacaoAgente, id);
        const roteiroAtividadeAtualizado = await this.roteiroAtividadeRepository.atualiza(roteiroAtividade);

        return res.status(200).json(roteiroAtividadeViewModel(roteiroAtividadeAtualizado));      
      }catch(e){
        logger.error(e)
	      logger.info(e.toString(), req.token)
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});       
      }     
    }    

    async deleta(req, res){
       try{
        await this.roteiroAtividadeRepository.deleta(req.roteiroAtividade);     
        return res.status(204).json({status: '204', mensagem: 'Excluído com sucesso.'});
      }catch(e){
        logger.error(e)
	      logger.info(e.toString(), req.token)
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});       
      }    
    }
  
  }