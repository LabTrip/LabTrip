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
  async buscaTodos(req, res) {
    const agencias = await this.agenciaRepository.buscaTodos();
    res.status(200).json(agencias.map(u => agenciaViewModel(u)));
  }

  async salva(req, res){
    const {nome} = req.body;

    const agencia = new Agencia(nome);

    console.log(agencia)

    await this.agenciaRepository.salva(agencia);

    res.status(201).json(agenciaViewModel(agencia));
  }

  mostra(req, res){
    return res.status(200).json(agenciaViewModel(req.agencia)); 
  }

  async atualiza(req,res){     
    const{nome} = req.body;

    const agencia = new Agencia(nome, req.agencia.id);

    const agenciaAtualizada = await this.agenciaRepository.atualiza(agencia);

    return res.status(200).json(agenciaViewModel(agenciaAtualizada));      
  }


  async deleta(req, res){
    await this.agenciaRepository.deleta(req.agencia);
    return res.status(204).end();
  }

}