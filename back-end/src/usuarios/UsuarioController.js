import Usuario from './Usuario'

const usuarioViewModel = (usuario) => ({
  id: usuario.id,
  nome: usuario.nome,
  email: usuario.email
});

export default class UsuarioController {

  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  //GET /usuarios
  async index(req, res) {
    const usuarios = await this.usuarioRepository.getAll();
    res.status(200).json(usuarios.map(u => usuarioViewModel(u)));
  }

  async save(req, res){
    const {nome, email, senha} = req.body;

    const usuario = new Usuario(nome, email, senha);

    await this.usuarioRepository.save(usuario);

    res.status(201).json(usuarioViewModel(usuario));
  }

  show(req, res){
    return res.status(200).json(usuarioViewModel(req.usuario)); 
  }

  async update(req,res){     
    const{nome, email, senha} = req.body;

    const usuario = new Usuario(nome, email, senha, req.usuario.id);

    const usuarioAtualizado = await this.usuarioRepository.update(usuario);

    return res.status(200).json(usuarioViewModel(usuarioAtualizado));      
  }


  async delete(req, res){
    await this.usuarioRepository.delete(req.usuario);
    return res.status(204).end();
  }

}