import Viagem from './Viagem'

const viagemViewModel = (viagem) => ({
  ID:  viagem.ID,
  apelido: viagem.apelido,
  dataInicio: viagem.dataInicio,
  dataFim: viagem.dataFim,
  statusID: viagem.statusID,
  local: viagem.local,
  codCidade: viagem.codCidade,
  agenciaID: viagem.agenciaID,
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

  //GET /trips
  async index(req, res) {
    const viagens = await this.viagemRepository.getAll();
    res.status(200).json(viagens.map(u => viagemViewModel(u)));
  }

  async save(req, res){
    const {apelido, dataInicio, dataFim} = req.body;

    const tripStatus = verificaStatusViagem(dataFim);

    const viagem = new Viagem(apelido, dataInicio, dataFim, statusID);

    await this.viagemRepository.save(viagem);

    res.status(201).json(viagemViewModel(viagem));
  }

  show(req, res){
    return res.status(200).json(viagemViewModel(req.viagem)); 
  }

  async update(req,res){     
    const{apelido, dataInicio, dataFim} = req.body;

    const tripStatus = verificaStatusViagem(dataFim);

    const viagem = new Viagem(apelido, datInicio, dataFim, statusID, req.viagem.ID);
    
    const viagemAtualizada = await this.viagemRepository.update(viagem);

    return res.status(200).json(viagemViewModel(viagemAtualizada));      
  }


  async delete(req, res){
    await this.viagemRepository.delete(req.viagem);
    return res.status(204).end();
  }

}