require('dotenv/config');
import Orcamento from './Orcamento'
import DespesaExtra from './DespesaExtra'
import api from '../requesterConfig'
const logger = require('../logger');

const orcamentoViewModel = (orcamento) => ({
  id:  orcamento.id,
  valorConsumido: orcamento.valorConsumido,
  valorTotal: orcamento.valorTotal,
  valorMinimo: orcamento.valorMinimo,
  despesasExtras: orcamento.despesasExtras,
});

const orcamentoUpdateViewModel = (orcamento) => ({
  id:  orcamento.id,
  valorConsumido: orcamento.valorConsumido,
  valorTotal: orcamento.valorTotal,
  valorMinimo: orcamento.valorMinimo,
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

        if(await this.orcamentoExiste(req, preOrcamento.roteiroId, preOrcamento.versaoRoteiro, tipoOrcamento)){
          return res.status(430).json({status: '403', mensagem: 'O orçamento já existe.'});
        }

        const orcamento = await this.orcamentoRepository.salva(preOrcamento);
        orcamento.despesasExtras = [];

        if(tipoOrcamento.descricao == "Individual"){
          await this.orcamentoRepository.linkaOrcamentoUsuario(orcamento.id, req.token.id);
        }

        if(tipoOrcamento.descricao == "Geral"){
          this.notificaOrcamento(req, orcamento, req.method);
        }

        return res.status(201).json(orcamento);
      }
      else{
        return res.status(400).json({status: '400', mensagem: 'O tipo de orçamento buscado não existe.'});
      }
    }
    catch(e){
      logger.error(e)
      logger.info(e.toString(), req.token)
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
      logger.error(e)
      logger.info(e.toString(), req.token)
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
      const tipoOrcamento = await this.buscaTipoOracmento(req.query.tipoOrcamento);
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
      

      return res.status(200).json(orcamento); 
    }
    catch(e){
      logger.error(e)
      logger.info(e.toString(), req.token)
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }
  }


  async atualizaValoresOrcamento(orcamento, tipoOrcamento){
    try{
      let valor = 0;

      if(tipoOrcamento.descricao == 'Geral'){
        const soma = await this.orcamentoRepository.somaValoresAtividadesDoRoteiro(orcamento.roteiroId, orcamento.versaoRoteiro);
        valor += soma.valor;
      }
        const soma = await this.orcamentoRepository.somaValoresDespesasExtras(orcamento.id);
        valor += soma.valor;

      orcamento.valorConsumido = valor;
      if(orcamento.valorTotal < valor){
        orcamento.valorTotal = valor;
      } 
      orcamento.valorMinimo = valor;

      return await this.orcamentoRepository.atualiza(orcamento);
    }
    catch(e){
      logger.error(e)
      logger.info(e.toString(), req.token)
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
      const tipoOrcamento = await this.buscaTipoOracmento(req.query.tipoOrcamento);
      if(!tipoOrcamento){
        return res.status(400).json({status: '400', mensagem: 'O tipo de orçamento buscado não existe.'});
      }

      const preOrcamento = await this.orcamentoExiste(req, req.params.roteiroId, req.params.versaoRoteiro, tipoOrcamento);
      if(!preOrcamento){
        return res.status(400).json({status: '400', mensagem: 'O orçamento buscado não existe.'});
      }

      const orcamento = await this.atualizaValoresOrcamento(preOrcamento, tipoOrcamento);
      orcamento.despesasExtras = await this.orcamentoRepository.buscaDespesasExtras(orcamento.id);

      if(valorTotal >= orcamento.valorMinimo){
        orcamento.valorTotal = valorTotal;
        await this.orcamentoRepository.atualiza(orcamentoUpdateViewModel(orcamento));
        
        if(tipoOrcamento.descricao == "Geral"){
          await this.notificaOrcamento(req, orcamento, req.method);
        }

        return res.status(200).json(orcamento);
      }
      else{
        res.status(403).json({status: '403', mensagem: 'O valor total deve ser igual o menor a ' + preOrcamento.valorMinimo + '.'})
      }

    }
    catch(e){
      logger.error(e)
      logger.info(e.toString(), req.token)
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    } 
    
  }

  async salvaDespesaExtra(req, res){
    try{
      const {orcamentoId, custo, descricao, data} = req.body;

      const despesaExtra = await this.orcamentoRepository.salvaDespesaExtra(new DespesaExtra(orcamentoId, custo, descricao, req.token.id, data));

      if(req.orcamento.tipoOrcamentoId == 1){
        this.notificaDespesaAdicional(req, despesaExtra, req.method);
      }

      return res.status(200).json(despesaExtra);
    }
    catch(e){
      logger.error(e)
      logger.info(e.toString(), req.token)
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }
  }

  async atualizaDespesaExtra(req, res){
    try{
      const {orcamentoId, custo, descricao, data} = req.body;

      const despesaExtra = await this.orcamentoRepository.atualizaDespesaExtra(new DespesaExtra(orcamentoId, custo, descricao, req.token.id, data, req.despesa.id));
      
      this.notificaDespesaAdicional(req, req.despesa, req.method);

      return res.status(200).json(despesaExtra);
    }
    catch(e){
      logger.error(e)
      logger.info(e.toString(), req.token)
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }
  }

  async deletaDespesaExtra(req, res){
    try{
      await this.orcamentoRepository.deletaDespesaExtra(req.despesa);

      if(req.orcamento.tipoOrcamentoId == 1){
        this.notificaDespesaAdicional(req, req.despesa, req.method);
      }

      return res.status(200).json({status: "200", mensagem: "Deletado com sucesso!"});
    }
    catch(e){
      logger.error(e)
      logger.info(e.toString(), req.token)
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }
  }

  async notificaDespesaAdicional(req, despesa, operacao){
    try{
      let titulo, mensagem, dado;
      const participantes = await this.orcamentoRepository.buscaParticipantesDaViagem(despesa.orcamentoId);
      const dados = await this.orcamentoRepository.buscaDadosDaViagem(despesa.orcamentoId);

      switch(operacao){
        case 'POST':
          titulo = 'Despesa extra adicionada em ' + dados[0].descricao
          mensagem = 'A despesa extra ' + despesa.descricao + ' foi adicionada na viagem ' + dados[0].descricao
          break;
        case 'PUT':
          titulo = 'Despesa extra alterada em ' + dados[0].descricao
          mensagem = 'Uma despesa extra foi alterada na viagem ' + dados[0].descricao
          break;
        case 'DELETE':
          titulo = 'Despesa extra excluída de ' + dados[0].descricao
          mensagem = 'A despesa extra ' + despesa.descricao + ' foi excluída da viagem ' + dados[0].descricao
          break;
      }

      const body = {
        icone: 'attach-money',
        participantes: participantes,
        titulo: titulo,
        mensagem: mensagem,
        dado: dados[0]
      }

      this.notifica(req, body);
    }
    catch(e){
      logger.error(e)
      logger.info(e.toString(), req.token)
    }
  }

  async notificaOrcamento(req, orcamento, operacao){
    try{
      let titulo, mensagem, dado;
      const participantes = await this.orcamentoRepository.buscaParticipantesDaViagem(orcamento.id);
      const dados = await this.orcamentoRepository.buscaDadosDaViagem(orcamento.id);

      switch(operacao){
        case 'POST':
          titulo = 'Orçamento ativado em ' + dados[0].descricao
          mensagem = 'O orçamento geral da viagem ' + dados[0].descricao + ' foi ativado.'
          break;
        case 'PUT':
          titulo = 'Orçamento alterado em ' + dados[0].descricao
          mensagem = 'O orçamento geral da viagem ' + dados[0].descricao + ' foi alterado.'
          break;
      }

      const body = {
        icone: 'attach-money',
        participantes: participantes,
        titulo: titulo,
        mensagem: mensagem,
        dado: dados[0]
      }

      this.notifica(req, body);
    }
    catch(e){
      logger.error(e)
      logger.info(e.toString(), req.token)
    }
    
  }


  async notifica(req, body) {
    await api.post("notificacoes/", body,
      {
        headers: {
          'x-access-token': req.headers['x-access-token']
      }
    }).then((response) => {
        //console.log('Response ' + response.data.perfis)
    }).catch((err) => {
        console.error("ops! ocorreu um erro" + err);
        logger.error(err)
        logger.info(err.toString(), req.token)
        return undefined;
    });
  }

}