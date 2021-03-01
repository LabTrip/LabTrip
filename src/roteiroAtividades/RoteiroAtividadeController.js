import RoteiroAtividade from './RoteiroAtividade'

const roteiroAtividadeViewModel = (roteiroAtividade) => ({  
    atividadeid: roteiroAtividade.atividadeid,
    roteiroId: roteiroAtividade.roteiroId,
    versaoRoteiro: roteiroAtividade.versaoRoteiro,
    dataInicio: roteiroAtividade.dataInicio,
    dataFim: roteiroAtividade.dataFim,
    custo: roteiroAtividade.custo,
    statusId: roteiroAtividade.statusId,
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
        const roteiroAtividade= await this.roteiroAtividadeRepository.buscaTodos();
        res.status(200).json(roteiroAtividade.map(u => roteiroViewModel(u)));
      }  
      catch(e){
         return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
        
      }
    }

  
    async salva(req, res){
      try {
        const {atividadeid, roteiroId, versaoRoteiro, dataInicio, dataFim, custo, statusId, observacaoCliente, observacaoAgente} = req.body;
        const roteiroAtividade= new RoteiroAtividade(atividadeid, roteiroId, versaoRoteiro, dataInicio, dataFim, custo, statusId, observacaoCliente, observacaoAgente);
        await this.roteiroAtividadeRepository.salva(roteiroAtividade);
        res.status(201).json(roteiroViewModel(roteiroAtividade));
      }
      catch(e){
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});       
      }
      
    }
  
    mostra(req, res){
      try{
        return res.status(200).json(roteiroViewModel(req.roteiroAtividade)); 

      }catch(e){
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});       
      }
     
    }
  
    async atualiza(req,res){
      try{
        const {atividadeid, roteiroId, versaoRoteiro, dataInicio, dataFim, custo, statusId, observacaoCliente, observacaoAgente} = req.body;
        const roteiroAtividade= new RoteiroAtividade(atividadeid, roteiroId, versaoRoteiro, dataInicio, dataFim, custo, statusId, observacaoCliente, observacaoAgente);
        const roteiroAtividadeAtualizado = await this.roteiroAtividadeRepository.atualiza(roteiroAtividade);
        return res.status(200).json(roteiroViewModel(roteiroAtividadeAtualizado));      
      }catch(e){
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});       
      }    
      
    }    

    async deleta(req, res){
      try{
        await this.roteiroAtividadeRepository.deleta(req.roteiroAtividade);
        return res.status(204).end();
      }catch(e){
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});       
      }  
    
    }
  
  }