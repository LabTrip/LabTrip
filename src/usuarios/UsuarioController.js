import Usuario from './Usuario'
const cryptoRandomString = require('crypto-random-string');

const usuarioViewModel = (usuario) => ({
  id: usuario.id,
  nome: usuario.nome,
  email: usuario.email,
  telefone: usuario.telefone,
  foto: usuario.foto,
  perfilId: usuario.perfilId,
  dataNascimento: usuario.dataNascimento,
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
    const {nome, email, telefone, foto, perfilId, dataNascimento} = req.body;
    const senhaProvisoria = cryptoRandomString({length: 15, type: 'distinguishable'});
    const codigoVerificacao = cryptoRandomString({length: 6, type: 'distinguishable'});
    const usuario = new Usuario(nome, email,telefone, foto, perfilId, dataNascimento, codigoVerificacao, senhaProvisoria, undefined);

    await this.usuarioRepository.salva(usuario);

    res.status(201).json(usuarioViewModel(usuario));
  }

  mostra(req, res){
    return res.status(200).json(usuarioViewModel(req.usuario)); 
  }

  async atualiza(req,res){     
    const{nome, email, telefone, foto, perfilId, dataNascimento} = req.body;

    const usuario = new Usuario(nome, email, telefone, foto, perfilId, dataNascimento, null, null, req.usuario.id);

    const usuarioAtualizado = await this.usuarioRepository.atualiza(usuario);

    return res.status(200).json(usuarioViewModel(usuarioAtualizado));      
  }

  async atualizaSenha(req, res){
    const u = await this.usuarioRepository.buscaPorId(req.body.id);

    const usuario = new Usuario(u.nome, u.email, u.telefone, u.foto, u.perfilId, u.dataNascimento, u.codigoVerificacao, req.body.senha, req.usuario.id);

    await this.usuarioRepository.atualizaSenha(usuario);

    return res.status(200).json({codigo:"200", message: "Senha atualizada com sucesso"});
  }

  async deleta(req, res){
    await this.usuarioRepository.deleta(req.usuario);
    return res.status(204).end();
  }

}