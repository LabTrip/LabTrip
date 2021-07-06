import DadosEssenciais from './DadosEssenciais'
import api from '../requesterConfig'
const cryptoRandomString = require('crypto-random-string');
const aws = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const s3 = new aws.S3();
const logger = require('../logger'); 

const dadosEssenciaisViewModel = (dadosEssenciais) => ({
    id: dadosEssenciais.id, 
    usuarioId: dadosEssenciais.usuarioId, 
    roteiroAtividadeId: dadosEssenciais.roteiroAtividadeId, 
    nomeArquivo: dadosEssenciais.nomeArquivo, 
    chaveArquivo: dadosEssenciais.chaveArquivo, 
    urlArquivo: dadosEssenciais.urlArquivo, 
    dataUpload: dadosEssenciais.dataUpload,
    privado: dadosEssenciais.privado
  });  
  
  export default class DadosEssenciaisController {
  
    constructor(dadosEssenciaisRepository) {
      this.dadosEssenciaisRepository = dadosEssenciaisRepository;
    }
  
    //GET 
    async buscaTodos(req, res) {
      try{
        const dadosEssenciais = await this.dadosEssenciaisRepository.buscaTodos(req);
        res.status(200).json(dadosEssenciais.map(u => dadosEssenciaisViewModel(u)));
      }
      catch(e){ 
        logger.error(e)
        logger.info(e.toString(), req.token)       
        return res.status(400).json({status: '400', mensagem: e.toString()});
      }
      
    }

    async buscaPorRoteiroAtividadeId(req, res) {
      try{
        const dadosEssenciais = await this.dadosEssenciaisRepository.buscaPorRoteiroAtividadeId(req);
        res.status(200).json(dadosEssenciais.map(u => dadosEssenciaisViewModel(u)));
      }
      catch(e){
        logger.error(e)
        logger.info(e.toString(), req.token) 
        return res.status(400).json({status: '400', mensagem: e});
      }
      
    }
  
    async salva(req, res){
      try{
        const {usuarioId, roteiroAtividadeId, nomeArquivo, privado} = req.body;
        console.log(req.body)
        const dadosEssenciais = new DadosEssenciais(usuarioId, roteiroAtividadeId, nomeArquivo, null, null, privado);
        return res.status(201).json(dadosEssenciaisViewModel(await this.dadosEssenciaisRepository.salva(dadosEssenciais)));
      }
      catch(e){  
        logger.error(e)
        logger.info(e.toString(), req.token)       
        return res.status(400).json({status: '400', mensagem: e.toString()});
          
      }      
    }
  
    mostra(req, res){
      try{
        return res.status(200).json(dadosEssenciaisViewModel(req.dadosEssenciais)); 
      }
      catch(e){
        logger.error(e)
        logger.info(e.toString(), req.token) 
        return res.status(400).json({status: '400', mensagem:e.toString()});
      }
      
    }
  
    async atualiza(req,res){     
      try{
        const{usuarioId, roteiroAtividadeId, nomeArquivo, chaveArquivo, urlArquivo, privado} = req.body;
        const dadosEssenciais = new DadosEssenciais(usuarioId, roteiroAtividadeId, nomeArquivo, chaveArquivo, urlArquivo, privado, req.dadosEssenciais.id); 
        
        const dadosEssenciaisAtualizado = await this.dadosEssenciaisRepository.atualiza(dadosEssenciais);
        return res.status(200).json(dadosEssenciaisViewModel(dadosEssenciaisAtualizado));      
      }
      catch(e){
        logger.error(e)
        logger.info(e.toString(), req.token) 
        return res.status(400).json({status: '400', mensagem: e.toString()});
      }
      
    }
  
  
    async deleta(req, res){
      try{
        const dadosEssenciais = new DadosEssenciais(req.params.dadosEssenciaisId)
        await this.dadosEssenciaisRepository.deleta(dadosEssenciais);
        return res.status(204).end();
      }
      catch(e){
        logger.error(e)
        logger.info(e.toString(), req.token) 
        return res.status(400).json({status: '400', mensagem: e.toString()});
      }
      
    }

    
  async mostraArquivoRoteiroAtividade(req, res) {
    try{
      const dadosEssenciais = req.dadosEssenciais;
      var readStream = null;


      if(dadosEssenciais.chaveArquivo && dadosEssenciais.chaveArquivo != ''){
        readStream = await s3.getObject({Key: dadosEssenciais.chaveArquivo, Bucket: process.env.BUCKET_NAME}).createReadStream();
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

  async atualizaArquivoRoteiroAtividade(req, res) {
    try{
      const dadosEssenciais = req.dadosEssenciais;
      console.log(req.headers);
      const {name, size, key} = req.file;
      const url = '/dadosEssenciais/arquivoDadosEssenciais/' + key;

      const arquivo = {name: name, size: size, key: key, url: url}

      await this.dadosEssenciaisRepository.atualizaArquivoRoteiroAtividade(arquivo, dadosEssenciais);

      if(dadosEssenciais.chaveArquivo){
        await this.deletaArquivo(dadosEssenciais.chaveArquivo);
      }

      return res.status(200).json({status: '200', mensagem: 'Arquivo atualizado com sucesso.'});
    }

    catch(e){
      logger.error(e)
      logger.info(e.toString(), req.token) 
      return res.status(500).json({status: '500', mensagem: 'Server internal error.'});
    }
  }

  async deletaArquivoRoteiroAtividade(req, res) {
    try{
      const dadosEssenciais = req.dadosEssenciais;
      console.log(req.dadosEssenciais)
      await this.dadosEssenciaisRepository.atualizaArquivoRoteiroAtividade({name: '', key: '', url: ''}, dadosEssenciais);

      await this.deletaArquivo(dadosEssenciais.chaveFoto);

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
  
  }