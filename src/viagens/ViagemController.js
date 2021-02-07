import Viagem from './Viagem'

const viagemViewModel = (viagem) => ({
  id:  viagem.id,
  descricao: viagem.descricao,
  dataInicio: viagem.dataInicio,
  dataFim: viagem.dataFim,
  statusId: viagem.statusId,
  agenciaId: viagem.agenciaId,
  usuarioDonoId: viagem.usuarioDonoId,
  criadoPorId: viagem.criadoPorId
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

    if(req.perfilId == 1){
      viagens = await this.viagemRepository.buscaTodos();
    }
    else{
      viagens = await this.viagemRepository.buscaTodosComPermissao(req.id);
    }
    
    res.status(200).json(viagens.map(u => viagemViewModel(u)));
  }

  async salva(req, res){
    const {descricao, agenciaId, statusId, dataInicio, dataFim, usuarioDonoId, criadoPorId, participantes} = req.body;

    const viagem = new Viagem(descricao, agenciaId, statusId, dataInicio, dataFim, usuarioDonoId, criadoPorId);

    const participantesAtualizados = [];

    for(let participante of participantes){
      participantesAtualizados.push({
        usuarioId: participante.usuarioId,
        permissaoViagemId: participante.permissaoViagemId,
        viagemId: viagem.id
      });
    }

    await this.viagemRepository.salva(viagem);

    await this.viagemRepository.salvaParticipantes(participantesAtualizados);

    res.status(201).json(viagemViewModel(viagem));
  }

  mostra(req, res){
    return res.status(200).json(viagemViewModel(req.viagem)); 
  }

  async atualiza(req,res){     
    const{descricao, agenciaId, statusId, dataInicio, dataFim, usuarioDonoId, criadoPorId} = req.body;

    const tripStatus = verificaStatusViagem(dataFim);

    const viagem = new Viagem(descricao, agenciaId, statusId, dataInicio, dataFim, usuarioDonoId, criadoPorId, req.viagem.id);
    
    const viagemAtualizada = await this.viagemRepository.atualiza(viagem);

    return res.status(200).json(viagemViewModel(viagemAtualizada));      
  }


  async deleta(req, res){
    await this.viagemRepository.deleta(req.viagem);
    return res.status(204).end();
  }

}