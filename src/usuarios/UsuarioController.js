import Usuario from './Usuario'
import api from '../requesterConfig'
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
    try{
      console.log("Busca todos")
      const usuarios = await this.usuarioRepository.buscaTodos();
      res.status(200).json(usuarios.map(u => usuarioViewModel(u)));
    }
    catch(e){
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }
  }

  async salva(req, res){
    try{

      const {nome, email, telefone, foto, perfilId, dataNascimento} = req.body;
      const perfis = await this.verificaPermissaoCriarUsuario(req);

      let acesso = false;

      if(perfis){
        for(let perfil of perfis){
          if(perfil.id == perfilId){
            acesso = true;
          }
        }
      }

      if(!acesso){
        return res.status(403).json({status: '403', mensagem: 'Perfil de usuário inexistente ou sem permissão de acesso.'});
      }

      const senhaProvisoria = cryptoRandomString({length: 15, type: 'distinguishable'});
      const codigoVerificacao = cryptoRandomString({length: 6, type: 'distinguishable'});
      const usuario = new Usuario(nome, email,telefone, foto, perfilId, dataNascimento, codigoVerificacao, senhaProvisoria, undefined);

      await this.usuarioRepository.salva(usuario);

      res.status(201).json(usuarioViewModel(usuario));
    }
    catch(e){
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }

  }

  async verificaPermissaoCriarUsuario(req){
    try{
      let perfis = undefined;
      // Buscando perfis disponíveis para o usuario solicitatne
      await api.get("perfis/", {
        headers: {
          'x-access-token': req.headers['x-access-token']
        }
      })
      .then((response) => {
        //console.log('Response ' + response.data.perfis)
        perfis = response.data.perfis;
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });

      return perfis;
    }
    catch(e){
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }
  }

  mostra(req, res){
    const usuarios  = req.usuario;
    if(usuarios.length > 0){
      return res.status(200).json(usuarios.map(u => usuarioViewModel(u))); 
    }
    else{
      return res.status(200).json(usuarioViewModel(usuarios)); 
    }
    
  }

  async atualiza(req,res){   
    try{

      const acesso = this.podeRealizarOperacaoPorId(req.acesso.tipoAcesso, req.usuario.id, req.token.id)
    
      if(acesso){
        const{nome, email, telefone, foto, perfilId, dataNascimento} = req.body;

        const usuario = new Usuario(nome, email, telefone, foto, perfilId, dataNascimento, null, null, req.usuario.id);

        const usuarioAtualizado = await this.usuarioRepository.atualiza(usuario);

        return res.status(200).json(usuarioViewModel(usuarioAtualizado));    
      }
      else{
        return res.status(403).json({status: '403', mensagem: 'Sem permissão de acesso.'});    
      }
    
    }
    catch(e){
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }

  }

  async atualizaSenha(req, res){

    try{

      const acesso = this.podeRealizarOperacaoPorId(req.acesso.tipoAcesso, req.usuario.id, req.token.id);

      if(acesso){
        const usuario = new Usuario(req.usuario.nome, req.usuario.email, req.usuario.telefone, req.usuario.foto, req.usuario.perfilId, req.usuario.dataNascimento, req.usuario.codigoVerificacao, req.body.senha, req.usuario.id);

        await this.usuarioRepository.atualizaSenha(usuario);

        return res.status(200).json({codigo:"200", message: "Senha atualizada com sucesso."});
      }
      else{
        return res.status(403).json({status: '403', mensagem: 'Sem permissão de acesso.'});    
      }
      
    }
    catch(e){
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }

  }

  async deleta(req, res){
    
    try{
      await this.usuarioRepository.deleta(req.usuario);
      return res.status(204).end();
    }
    catch(e){
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }

  }

  podeRealizarOperacaoPorId(tipoAcesso, id, usuarioId){
    try{

      let acesso = false;
      switch(tipoAcesso){
        case 'Total':
            acesso = true;
          break;
        case 'Parcial':
          if(id == usuarioId){
            acesso = true;
          }
          break;
      }

      return acesso;
    
    }
    catch(e){
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }

  }

}