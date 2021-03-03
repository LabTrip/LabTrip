import RoteiroAtividade from './RoteiroAtividade'

const roteiroAtividadeViewModel = (roteiroAtividade) => ({  
    atividadeId: roteiroAtividade.atividadeId,
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
        const roteiroAtividade= await this.roteiroAtividadeRepository.buscaTodos(req);
        res.status(200).json(roteiroAtividade.map(u => roteiroAtividadeViewModel(u)));
      }  
      catch(e){
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
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});       
      }      
    }
  
    mostra(req, res){
      try{
        return res.status(200).json(roteiroAtividadeViewModel(req.roteiroAtividade)); 

      }catch(e){
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});       
      }
     
    }
  
    async atualiza(req,res){
      try{
        const {atividadeId, roteiroId, versaoRoteiro, dataInicio, dataFim, custo, statusId, observacaoCliente, observacaoAgente} = req.body;
        const roteiroAtividade= new RoteiroAtividade(atividadeId, roteiroId, versaoRoteiro, dataInicio, dataFim, custo, statusId, observacaoCliente, observacaoAgente);
        const roteiroAtividadeAtualizado = await this.roteiroAtividadeRepository.atualiza(roteiroAtividade);

        return res.status(200).json(roteiroAtividadeViewModel(roteiroAtividadeAtualizado));      
      }catch(e){
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});       
      }     
    }    

    async deleta(req, res){
      console.log("deletacontroler")
      try{
       
        await this.roteiroAtividadeRepository.deleta(req.roteiroAtividade);     
        return res.status(204).end();
      }catch(e){
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});       
      }    
    }
  
  }