import Usuario from './Usuario'
import api from '../requesterConfig'
const cryptoRandomString = require('crypto-random-string');
const aws = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const s3 = new aws.S3();
import {s3Teste} from '../config/s3'
const logger = require('../logger'); 

const usuarioViewModel = (usuario) => ({
  id: usuario.id,
  nome: usuario.nome,
  email: usuario.email,
  telefone: usuario.telefone,
  urlFoto: usuario.urlFoto,
  perfilId: usuario.perfilId,
  descricao: usuario.descricao,
  dataNascimento: usuario.dataNascimento,
});

export default class UsuarioController {

  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  //GET /usuarios
  async buscaTodos(req, res) {
    try {
      const usuarios = await this.usuarioRepository.buscaTodos();
      res.status(200).json(usuarios.map(u => usuarioViewModel(u)));
    }
    catch (e) {
      logger.error(e)
	    logger.info(e.toString(), req.token)
      return res.status(400).json({ status: '400', mensagem: 'Entrada de informações incorretas.' });
    }
  }

  async salva(req, res) {
    try {

      const { nome, email, telefone, perfilId, dataNascimento } = req.body;
      const perfis = await this.verificaPermissaoCriarUsuario(req);

      let acesso = false;

      if (perfis) {
        for (let perfil of perfis) {
          if (perfil.id == perfilId) {
            acesso = true;
          }
        }
      }

      if (!acesso) {
        return res.status(403).json({ status: '403', mensagem: 'Perfil de usuário inexistente ou sem permissão de acesso.' });
      }

      const senhaProvisoria = cryptoRandomString({ length: 15, type: 'distinguishable' });
      const codigoVerificacao = cryptoRandomString({ length: 6, type: 'distinguishable' });
      const usuario = new Usuario(nome, email, telefone, null, null, null, perfilId, dataNascimento, codigoVerificacao, senhaProvisoria, undefined);

      await this.usuarioRepository.salva(usuario);

      res.status(201).json(usuarioViewModel(usuario));
    }
    catch (e) {
      logger.error(e)
	    logger.info(e.toString(), req.token)
      return res.status(400).json({ status: '400', mensagem: 'Entrada de informações incorretas.' });
    }

  }

  async salvaTokenNotificacao(req, res) {
    try {

      const { token } = req.body;

      await this.usuarioRepository.salvaTokenNotificacao(token, req.token.id);

      res.status(200).json({status: "200", mensagem: 'Token salvo com sucesso'});
    }
    catch (e) {
      logger.error(e)
	    logger.info(e.toString(), req.token)
      return res.status(400).json({ status: '400', mensagem: 'Entrada de informações incorretas.' });
    }

  }

  async mostraTokenNotificacao(req, res) {
    try {

      const tokens = await this.usuarioRepository.buscaTokenNotificacao(req.token.id);

      res.status(200).json(tokens);
    }
    catch (e) {
      logger.error(e)
	    logger.info(e.toString(), req.token)
      return res.status(400).json({ status: '400', mensagem: 'Entrada de informações incorretas.' });
    }

  }

  async verificaPermissaoCriarUsuario(req) {
    try {
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
    catch (e) {
      logger.error(e)
	    logger.info(e.toString(), req.token)
      return res.status(400).json({ status: '400', mensagem: 'Entrada de informações incorretas.' });
    }
  }

  mostra(req, res) {
    const usuarios = req.usuario;
    if (usuarios.length > 0) {
      return res.status(200).json(usuarios.map(u => usuarioViewModel(u)));
    }
    else {
      return res.status(200).json(usuarioViewModel(usuarios));
    }

  }

  async atualiza(req, res) {
    try {

      const acesso = await this.podeRealizarOperacaoPorId(req.acesso.tipoAcesso, req.usuario.id, req.token.id, req)

      if (acesso) {
        const { nome, email, telefone, foto, perfilId, dataNascimento } = req.body;

        const usuario = new Usuario(nome, email, telefone, null, null, null, perfilId, dataNascimento, null, null, req.usuario.id);

        const usuarioAtualizado = await this.usuarioRepository.atualiza(usuario);

        return res.status(200).json(usuarioViewModel(usuarioAtualizado));
      }
      else {
        return res.status(403).json({ status: '403', mensagem: 'Sem permissão de acesso.' });
      }

    }
    catch (e) {
      logger.error(e)
	    logger.info(e.toString(), req.token)
      return res.status(400).json({ status: '400', mensagem: 'Entrada de informações incorretas. ' + e});
    }

  }

  async atualizaSenha(req, res) {

    try {

      const acesso = await this.podeRealizarOperacaoPorId(req.acesso.tipoAcesso, req.usuario.id, req.token.id);

      if (acesso) {
        const usuario = new Usuario(req.usuario.nome, req.usuario.email, req.usuario.telefone, null, null, null, req.usuario.perfilId, req.usuario.dataNascimento, req.usuario.codigoVerificacao, req.body.senha, req.usuario.id);

        await this.usuarioRepository.atualizaSenha(usuario);

        return res.status(200).json({ codigo: "200", message: "Senha atualizada com sucesso." });
      }
      else {
        return res.status(403).json({ status: '403', mensagem: 'Sem permissão de acesso.' });
      }

    }
    catch (e) {
      logger.error(e)
	    logger.info(e.toString(), req.token)
      return res.status(400).json({ status: '400', mensagem: 'Entrada de informações incorretas.' });
    }

  }

  async deleta(req, res) {

    try {
      await this.usuarioRepository.deleta(req.usuario);
      return res.status(204).end();
    }
    catch (e) {
      logger.error(e)
	    logger.info(e.toString(), req.token)
      return res.status(400).json({ status: '400', mensagem: 'Entrada de informações incorretas.' });
    }

  }

  async mostraFotoPerfil(req, res) {
    try{
      const usuario = req.usuario;
      var readStream = null;

      if(usuario.chaveFoto && usuario.chaveFoto != ''){
        readStream = await s3.getObject({Key: usuario.chaveFoto, Bucket: process.env.BUCKET_NAME}).createReadStream();
      }
      else{
        readStream = await s3.getObject({Key: 'pattern-foto-de-perfil.png', Bucket: process.env.BUCKET_NAME}).createReadStream();
      }
      

      readStream.pipe(res);
    }
    catch(e){
      logger.error(e)
	    logger.info(e.toString(), req.token)
      return res.status(500).json({status: '500', mensagem: 'Server internal error.'});
    }

  }

  async atualizaFotoPerfil(req, res) {
    try{
      const usuario = req.usuario;
      console.log(req.headers);
      const {name, size, key} = req.file;
      const url = '/usuarios/fotoperfil/' + key;

      const foto = {name: name, size: size, key: key, url: url}

      await this.usuarioRepository.atualizaFotoPerfil(foto, usuario);

      if(usuario.chaveFoto){
        await this.deletaArquivo(usuario.chaveFoto);
      }
    
      return res.status(200).json({status: '200', mensagem: 'Foto atualizada com sucesso.'});
    }
    catch(e){
      logger.error(e)
	    logger.info(e.toString(), req.token)
      return res.status(500).json({status: '500', mensagem: 'Server internal error.'});
    }

  }

  async deletaFotoPerfil(req, res) {
    try{
      const usuario = req.usuario;

      await this.usuarioRepository.atualizaFotoPerfil({name: '', key: '', url: ''}, usuario);

      await this.deletaArquivo(usuario.chaveFoto);

      return res.status(204).json({status: '200', mensagem: 'Foto deleta com sucesso.'});    
    }
    catch(e){
      logger.error(e)
	    logger.info(e.toString(), req.token)
      return res.status(500).json({status: '500', mensagem: 'Server internal error.'});
    }
  }

  async deletaArquivo(key){
    if (process.env.STORAGE_TYPE === "s3") {
      return s3
        .deleteObject({
          Bucket: process.env.BUCKET_NAME,
          Key: key,
        })
        .promise()
        .then((response) => {
          //console.log(response.status);
        })
        .catch((response) => {
          //console.log(response.status);
        });
    } else {
      return promisify(fs.unlink)(
        path.resolve(__dirname, "..", "..", "tmp", "uploads", key)
      );
    }
  }

  async podeRealizarOperacaoPorId(tipoAcesso, id, usuarioId, request = undefined) {
    try {

      let acesso = false;
      switch (tipoAcesso) {
        case 'Total':
          acesso = true;
          break;
        case 'Gerencial':
          if (id == usuarioId) {
            acesso = true;
          }
          else if(request){
            acesso = await this.podeAlterarUsuario(tipoAcesso, id, usuarioId, request)
          }
          break;
        case 'Parcial':
          if (id == usuarioId) {
            acesso = true;
          }
          else if(request){
            acesso = await this.podeAlterarUsuario(tipoAcesso, id, usuarioId, request)
          }
          break;
      }

      return acesso;

    }
    catch (e) {
      logger.error(e)
	    logger.info(e.toString(), req.token)
    }

  }

  async podeAlterarUsuario(tipoAcesso, id, usuarioId, req) {
    try {
      let perfis = [];
      let acesso = false;
      // Buscando perfis disponíveis para o usuario solicitatne
      await api.get("perfis/", {
        headers: {
          'x-access-token': req.headers['x-access-token']
        }
      })
        .then((response) => {
          //console.log('Response ' + response.data.perfis)
          perfis = response.data.perfis;
          perfis.map(p => {
            if(p.id == req.body.perfilId && p.id == req.usuario.perfilId){
                acesso = true
            }
          })
        })
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
      
      

      return acesso;

    }
    catch (e) {
      logger.error(e)
	    logger.info(e.toString(), req.token)
      console.log(e)
    }

  }

  async verificaSenha(req, res) {
    let response = await user.findOne({
      where: {
        id: req.body.id, password: body.senhaAntiga
      }
    });
    if (response === null) {
      res.send(JSON.stringify('Senha antiga não confere.'));
    } else {
      if (req.body.novaSenha === req.body.confNovaSenha) {
        response.password = req.body.novaSenha;
        response.save();
        res.send(JSON.stringify('Senha atualizada com sucesso!'));
      } else {
        res.send(JSON.stringify('Nova senha e confirmação não conferem.'));
      }
    }
  }
}