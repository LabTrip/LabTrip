import Usuario from './Usuario'

const usuarioViewModel = (usuario) => ({
  id: usuario.id,
  nome: usuario.nome,
  email: usuario.email,
  telefone: usuario.telefone,
  foto: usuario.foto,
  perfilId: usuario.perfilId,
});

export default class UsuarioController {

  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  //GET /usuarios
  async buscaTodos(req, res) {
    console.log("Busca todos")
    const usuarios = await this.usuarioRepository.buscaTodos();
    res.status(200).json(usuarios.map(u => usuarioViewModel(u)));
  }

  async salva(req, res){
    const {nome, email, senha, telefone, foto, perfilId} = req.body;

    const usuario = new Usuario(nome, email, senha, telefone, foto, perfilId);

    console.log(usuario)

    await this.usuarioRepository.salva(usuario);

    res.status(201).json(usuarioViewModel(usuario));
  }

  mostra(req, res){
    return res.status(200).json(usuarioViewModel(req.usuario)); 
  }

  async atualiza(req,res){     
    const{nome, email, senha, telefone, foto, perfilId} = req.body;

    const usuario = new Usuario(nome, email, senha, telefone, foto, perfilId, req.usuario.id);

    const usuarioAtualizado = await this.usuarioRepository.atualiza(usuario);

    return res.status(200).json(usuarioViewModel(usuarioAtualizado));      
  }


  async deleta(req, res){
    await this.usuarioRepository.deleta(req.usuario);
    return res.status(204).end();
  }

}