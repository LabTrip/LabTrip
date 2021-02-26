import Viagem from './Viagem'

const viagemViewModel = (viagem) => ({
  id:  viagem.id,
  descricao: viagem.descricao,
  dataInicio: viagem.dataInicio,
  dataFim: viagem.dataFim,
  statusId: viagem.statusId,
  status: viagem.status,
  agenciaId: viagem.agenciaId,
  usuarioDonoId: viagem.usuarioDonoId,
  criadoPorId: viagem.criadoPorId,
  participantes: viagem.participantes,
});

const participantesViewModel = (participantes) => ({
    usuarioId:  participantes.usuarioId,
    viagemId: participantes.viagemId,
    permissaoViagemId: participantes.permissaoViagemId,
});

const permissoesViagemViewModel = (permissoes) => ({
  id:  permissoes.id,
  descricao: permissoes.descricao,
});

const verificaStatusViagem = (dataFim) => {
  const dataAtual = new Date()
  const dataFinal = new Date(dataFim)
  return (dataFinal < dataAtual)
}

export default class ViagemController {

  constructor(viagemRepository) {
    this.viagemRepository = viagemRepository;
  }

  //GET /viagens
  async buscaTodos(req, res) {
    let viagens;

    switch(req.acesso.tipoAcesso){
      case 'Total':
          viagens = await this.viagemRepository.buscaTodos();
        break;
      case 'Gerencial':
          viagens = await this.viagemRepository.buscaTodosDaAgencia(req.token.agenciaId);
        break;
      case 'Parcial':
          viagens = await this.viagemRepository.buscaTodosComPermissao(req.token.id);
        break;
      default:
          return res.status(404).json({status:'403', mensagem:'Acesso restrito.'})
    }
    
    res.status(200).json(viagens.map(u => viagemViewModel(u)));
  }


  async salva(req, res){
    const {descricao, agenciaId, statusId, dataInicio, dataFim, usuarioDonoId, criadoPorId, participantes} = req.body;

    const viagem = new Viagem(descricao, agenciaId, statusId, dataInicio, dataFim, usuarioDonoId, criadoPorId);
  
    await this.viagemRepository.salva(viagem);

    if(!participantes){
      const participantesAtualizados = [];

      for(let participante of participantes){
        participantesAtualizados.push({
          usuarioId: participante.usuarioId,
          permissaoViagemId: participante.permissaoViagemId,
          viagemId: viagem.id
        });
      }

      await this.viagemRepository.salvaParticipantes(participantesAtualizados);
    }

    res.status(201).json(viagemViewModel(viagem));
  }

  async mostra(req, res){
    const participantes =  await this.viagemRepository.buscaParticipantes(req.viagem);
    req.viagem.participantes = participantes;
    return res.status(200).json(viagemViewModel(req.viagem)); 
  }

  async atualiza(req,res){     
    const{descricao, agenciaId, statusId, dataInicio, dataFim, usuarioDonoId, criadoPorId, participantes, deletarParticipantes} = req.body;

    const viagem = new Viagem(descricao, agenciaId, statusId, dataInicio, dataFim, usuarioDonoId, criadoPorId, req.viagem.id);
    
    await this.viagemRepository.atualiza(viagem);

    if(deletarParticipantes){

      const participantesDeletados = [];

      for(let participante of deletarParticipantes){
        participantesDeletados.push({
          usuarioId: participante.usuarioId,
          viagemId: req.viagem.id
        });
      }

      await this.viagemRepository.deletaParticipantes(participantesDeletados);
    }

    if(participantes){
      const participantesAtualizados = [];

      for(let participante of participantes){
        participantesAtualizados.push({
          usuarioId: participante.usuarioId,
          permissaoViagemId: participante.permissaoViagemId,
          viagemId: req.viagem.id
        });
      }

      await this.viagemRepository.salvaParticipantes(participantesAtualizados);
    }

    const viagemAtualizada = await this.viagemRepository.buscaPorId(req.viagem.id) 
    const novosParticipantes =  await this.viagemRepository.buscaParticipantes(req.viagem);
    viagemAtualizada.participantes = novosParticipantes;
    return res.status(200).json(viagemViewModel(viagemAtualizada));
  }

  async buscaParticipantes(req, res){
    const participantes = await this.viagemRepository.buscaParticipantes(req.viagem);

    return res.status(200).json({participantes: participantes.map(p => participantesViewModel(p))});
  }

  async deleta(req, res){
    await this.viagemRepository.deleta(req.viagem);
    return res.status(204).end();
  }

  async deletaParticipantes(req, res){
    const participantes = req.body.participantes;
    
    if(participantes){
      
      const participantesDeletados = [];

      for(let participante of participantes){
        participantesDeletados.push({
          usuarioId: participante.usuarioId,
          viagemId: req.viagem.id
        });
      }
      await this.viagemRepository.deletaParticipantes(participantesDeletados);
    }

    return res.status(204).end();
  }

  async salvaParticipantes(req, res){
    const participantes = req.body.participantes;

    if(participantes){
      const participantesAtualizados = [];

      for(let participante of participantes){
        participantesAtualizados.push({
          usuarioId: participante.usuarioId,
          permissaoViagemId: participante.permissaoViagemId,
          viagemId: req.viagem.id
        });
      }

      await this.viagemRepository.salvaParticipantes(participantesAtualizados);
    }
    
    if(req.method == 'PUT'){
      return res.status(202).end();
    }
    else{
      return res.status(201).end();
    }
  }

  async buscaPermissoes(req, res){
    const permissoes =  await this.viagemRepository.buscaPermissoes();
    return res.status(200).json({permissoes: permissoes.map(u => permissoesViagemViewModel(u))}); 
  }

}