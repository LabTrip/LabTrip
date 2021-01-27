import Agencia from './Agencia'

const agenciaViewModel = (agencia) => ({
  id: agencia.id,
  nome: agencia.nome
});

export default class AgenciaController {

  constructor(agenciaRepository) {
    this.agenciaRepository = agenciaRepository;
  }

  //GET /agencias
  async index(req, res) {
    const agencias = await this.agenciaRepository.getAll();
    res.status(200).json(agencias.map(u => agenciaViewModel(u)));
  }

  async save(req, res){
    const {nome} = req.body;

    const agencia = new Agencia(nome);

    console.log(agencia)

    await this.agenciaRepository.save(agencia);

    res.status(201).json(agenciaViewModel(agencia));
  }

  show(req, res){
    return res.status(200).json(agenciaViewModel(req.agencia)); 
  }

  async update(req,res){     
    const{nome} = req.body;

    const agencia = new Agencia(nome, req.agencia.id);

    const agenciaAtualizada = await this.agenciaRepository.update(agencia);

    return res.status(200).json(agenciaViewModel(agenciaAtualizada));      
  }


  async delete(req, res){
    await this.agenciaRepository.delete(req.agencia);
    return res.status(204).end();
  }

}