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

const verificaStatusViagem = (dataFim) => {
  const dataAtual = new Date()
  const dataFinal = new Date(dataFim)
  if(dataFinal < dataAtual){
    return true
  }
  else{
    return false
  }
}

export default class ViagemController {

  constructor(viagemRepository) {
    this.viagemRepository = viagemRepository;
  }

  //GET /viagens
  async buscaTodos(req, res) {
    let viagens;

    if(req.token.perfilId == 1){
      viagens = await this.viagemRepository.buscaTodos();
    }
    else{
      viagens = await this.viagemRepository.buscaTodosComPermissao(req.token.id);
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

    const tripStatus = verificaStatusViagem(dataFim);

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

      console.log(participantesDeletados);
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
      console.log(participantesDeletados)
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

}