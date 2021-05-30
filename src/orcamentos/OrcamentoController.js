require('dotenv/config');
import Orcamento from './Orcamento'

const orcamentoViewModel = (orcamento) => ({
  id:  orcamento.id,
  valorConsumido: orcamento.valorConsumido,
  valorTotal: orcamento.valorTotal,
  valorMinimo: orcamento.valorMinimo,
  despesasExtras: orcamento.despesasExtras,
});

const participantesViewModel = (participantes) => ({
    usuarioId:  participantes.usuarioId,
    viagemId: participantes.viagemId,
    permissaoViagemId: participantes.permissaoViagemId,
});

export default class OrcamentoController {

  constructor(orcamentoRepository) {
    this.orcamentoRepository = orcamentoRepository;
  }

  async salva(req, res){
    try{
      const {roteiroId, versaoRoteiro, tipo} = req.body;
      
      const tipoOrcamento = await this.buscaTipoOracmento(tipo);     

      if(tipoOrcamento){
        const preOrcamento = new Orcamento (0, 0, 0, roteiroId, versaoRoteiro, tipoOrcamento.id);

        if(tipoOrcamento.descricao == "Geral"){
          const soma = await this.orcamentoRepository.somaValoresAtividadesDoRoteiro(preOrcamento.roteiroId, preOrcamento.versaoRoteiro);
          preOrcamento.valorConsumido = soma.valor;
          preOrcamento.valorTotal = soma.valor;
          preOrcamento.valorMinimo = soma.valor;
        }

        console.log(preOrcamento)
        if(await this.orcamentoExiste(req, preOrcamento.roteiroId, preOrcamento.versaoRoteiro, tipoOrcamento)){
          return res.status(430).json({status: '403', mensagem: 'O orçamento já existe.'});
        }

        const orcamento = await this.orcamentoRepository.salva(preOrcamento);
        orcamento.despesasExtras = [];

        console.log(orcamento)

        if(tipoOrcamento.descricao == "Individual"){
          await this.orcamentoRepository.linkaOrcamentoUsuario(orcamento.id, req.token.id);
        }

        return res.status(201).json(orcamento);
      }
      else{
        return res.status(400).json({status: '400', mensagem: 'O tipo de orçamento buscado não existe.'});
      }
    }
    catch(e){
      console.log(e)
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }
  }

  async buscaTipoOracmento(desc){
    try{
      let tipoOrcamento
      if(desc){
        tipoOrcamento = await this.orcamentoRepository.buscaTipoOrcamentoId(desc);
      }
      else{
        tipoOrcamento = await this.orcamentoRepository.buscaTipoOrcamentoId("Geral");
      }

      return tipoOrcamento;
    }
    catch(e){
      return undefined;
    }
  }

  async orcamentoExiste(req, roteiroId, versaoRoteiro, tipoOrcamento){
    let orcamento = undefined;
    if(tipoOrcamento.descricao == "Geral"){
      orcamento = await this.orcamentoRepository.buscaPorRoteiroIdVersaoTipoGeral(roteiroId, versaoRoteiro, tipoOrcamento.id);      
    }
    else{
      orcamento = await this.orcamentoRepository.buscaPorRoteiroIdVersaoTipoIndividual(roteiroId, versaoRoteiro, tipoOrcamento.id, req.token.id);
    }

    return orcamento;
  }

  async mostra(req, res){
    try{
      const tipoOrcamento = await this.buscaTipoOracmento(req.query.tipo);
      if(!tipoOrcamento){
        return res.status(404).json({status: '404', mensagem: 'O tipo de orçamento buscado não existe.'});
      }

      const preOrcamento = await this.orcamentoExiste(req, req.params.roteiroId, req.params.versaoRoteiro, tipoOrcamento);
      if(!preOrcamento){
        return res.status(404).json({status: '404', mensagem: 'O orçamento buscado não existe.'});
      }

      //passar orcamento id
      //adicionar soma das despesas
      const orcamento = await this.atualizaValoresOrcamento(preOrcamento, tipoOrcamento);
      orcamento.despesasExtras = await this.orcamentoRepository.buscaDespesasExtras(orcamento.id);
      
      console.log(orcamento);

      return res.status(200).json(orcamento); 
    }
    catch(e){
      console.log(e)
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }
  }


  async atualizaValoresOrcamento(orcamento, tipoOrcamento){
    try{
      let valor = 0;

      if(tipoOrcamento.descricao == 'Geral'){
        const soma = await this.orcamentoRepository.somaValoresAtividadesDoRoteiro(orcamento.roteiroId, orcamento.versaoRoteiro);
        valor += soma.valor;
        console.log('Soma atividades: ' + valor)
      }
        const soma = await this.orcamentoRepository.somaValoresDespesasExtras(orcamento.id);
        valor += soma.valor;
        console.log('Soma despesas: ' + await this.orcamentoRepository.somaValoresDespesasExtras(orcamento.id));

      orcamento.valorConsumido = valor;
      orcamento.valorTotal = valor;
      orcamento.valorMinimo = valor;

      return await this.orcamentoRepository.atualiza(orcamento);
    }
    catch(e){
      console.log(e)
      return undefined;
    }
  }

  async somaValoresAtividade(roteiroId, versaoRoteiro){
      return await this.orcamentoRepository.somaValoresAtividadesDoRoteiro(roteiroId, versaoRoteiro);
  }

  async somaValoresDespesaExtra(orcamentoId){
    return await this.orcamentoRepository.somaValoresDespesasExtras(orcamentoId);
}

  async atualizaOrcamento(req,res){    
    try{
      const {valorTotal} = req.body;
      const tipoOrcamento = await this.buscaTipoOracmento(req.query.tipo);
      if(!tipoOrcamento){
        return res.status(400).json({status: '400', mensagem: 'O tipo de orçamento buscado não existe.'});
      }

      const preOrcamento = await this.orcamentoExiste(req, req.params.roteiroId, req.params.versaoRoteiro, tipoOrcamento);
      if(!preOrcamento){
        return res.status(400).json({status: '400', mensagem: 'O orçamento buscado não existe.'});
      }

      const orcamento = await this.atualizaValoresOrcamento(preOrcamento, tipoOrcamento);
      orcamento.despesasExtras = await this.buscaDespesasExtras(orcamento.id);

      if(valorTotal >= orcamento.valorMinimo){
        orcamento.valorTotal = valorTotal;
        await this.orcamentoRepository.atualiza(orcamento);

        return res.status(200).json(orcamento);
      }
      else{
        res.status(403).json({status: '403', mensagem: 'O valor total deve ser igual o menor a ' + preOrcamento.valorMinimo + '.'})
      }

    }
    catch(e){
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    } 
    
  }

  async salvaDespesaExtra(req, res){
    try{
      const {orcamentoId, custo, descricao, data} = req.body;

      
    }
    catch(e){

    }
  }

}