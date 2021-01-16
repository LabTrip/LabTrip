import Viagem from './Viagem'

const viagemViewModel = (viagem) => ({
  tripId: viagem.tripId,
  tripNome: viagem.tripNome,
  tripInicio: viagem.tripInicio,
  tripFim: viagem.tripFim,
  tripStatus: viagem.tripStatus,
  userId: viagem.userId
});

const verificaStatusViagem = (tripFim) => {
  const dataAtual = new Date()
  const dataFinal = new Date(tripFim)
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

  //GET /trips
  async index(req, res) {
    const viagens = await this.viagemRepository.getAll();
    res.status(200).json(viagens.map(u => viagemViewModel(u)));
  }

  async save(req, res){
    const {tripNome, tripInicio, tripFim, userId} = req.body;

    const tripStatus = verificaStatusViagem(tripFim);

    const viagem = new Viagem(tripNome, tripInicio, tripFim, tripStatus, userId);

    await this.viagemRepository.save(viagem);

    res.status(201).json(viagemViewModel(viagem));
  }

  show(req, res){
    return res.status(200).json(viagemViewModel(req.viagem)); 
  }

  async update(req,res){     
    const{tripNome, tripInicio, tripFim, userId} = req.body;

    const tripStatus = verificaStatusViagem(tripFim);

    const viagem = new Viagem(tripNome, tripInicio, tripFim, tripStatus, userId, req.viagem.tripId);
    
    const viagemAtualizada = await this.viagemRepository.update(viagem);

    return res.status(200).json(viagemViewModel(viagemAtualizada));      
  }


  async delete(req, res){
    await this.viagemRepository.delete(req.viagem);
    return res.status(204).end();
  }

}