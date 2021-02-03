import Login from './Login'
const jwt = require('jsonwebtoken');
import sha256 from 'crypto-js/sha256'
const cryptoRandomString = require('crypto-random-string');
const nodemailer = require("nodemailer");
require('dotenv/config');

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // generated ethereal user
    pass: process.env.EMAIL_PASSWORD, // generated ethereal password
  },
  tls:{
    rejectUnauthorized: false
  }
});

const loginViewModel = (usuario) => ({
  id: usuario.id,
  nome: usuario.nome,
  email: usuario.email,
  foto: usuario.foto,
  telefone: usuario.telefone,
  perfilId: usuario.perfilId,
  token: usuario.token,
  codigo: usuario.codigo
});

export default class LoginController {

  constructor(loginRepository) {
    this.loginRepository = loginRepository;
  }

  async autentica(req, res){
    const{email, senha} = req.body;

    const usuario = await this.loginRepository.buscaPorEmail(email);

    if(usuario.verificado == false){
      return res.status(401).json({erro:"A conta do usuário ainda não foi verificada. Por favor, redefina sua senha antes de tentar autenticar",
      codigo:"401"});
    }
    else if(usuario.senha == sha256(senha).toString()){
      console.log("A senha foi aceita para o e-mail:" + email);
      const token = jwt.sign(usuario.email, process.env.SECRET);
      const usuarioAuth = new Login(usuario.id, usuario.nome, usuario.email, usuario.foto, usuario.telefone, usuario.perfilId, token, "200")
      return res.status(200).json(loginViewModel(usuarioAuth)); 
    }
    else{
      console.log("A senha foi recusada para o e-mail:" + email);
      return res.status(401).json({erro:"Senha incorreta.",codigo:"401"});
    }
    
  }

  validaToken(req, res){

  }

  async geraCodigo(req, res){
    const {email} = req.body;
    const codigoVerificacao = cryptoRandomString({length: 6, type: 'distinguishable'});
    console.log(codigoVerificacao);
    console.log(process.env.EMAIL_USER);
    console.log(process.env.EMAIL_PASSWORD);
    const usuario = await this.loginRepository.geraCodigo(email, codigoVerificacao);
    await this.enviaCodigoVerificacao(usuario);
    console.log(usuario);
    return res.status(200).json({codigo:"200", message: "Código gerado com sucesso"});
  }

  async validaCodigo(req, res){
    const {email, codigoVerificacao} = req.body;
    const dados = await this.loginRepository.buscaPorEmail(email);

    if(codigoVerificacao == dados.codigoVerificacao.toString()){
      return res.status(200).json({codigo:"200", message: "Código verificado com sucesso."});
    }
    else{
      return res.status(401).json({codigo:"402", error: "Código incorreto."});
    }
    
  }

  async redefine(req, res){
    const {email, senha} = req.body;
    await this.loginRepository.redefineSenha(email, sha256(senha).toString());
    return res.status(200).json({codigo:"200", message: "Senha redefinida com sucesso."});
  }

  async enviaCodigoVerificacao(usuario){

    let info = await transporter.sendMail({
      from: 'LabTrip <mailer@labtrip.com>', // sender address
      to: usuario.email, // list of receivers
      subject: "Código de verificação - LabTrip", // Subject line
      html: this.montaCorpoEmailVerificacao(usuario), // html body
    });

  }

  montaCorpoEmailVerificacao(usuario){

    const corpo = "<!DOCTYPE html><html><head>" +
        "<meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>" +
        "<style type='text/css'>html,body{margin: 0;padding: 1%;background: white;}" +
        "body {background: #FFFFFF;font-family: Arial, Verdana, sans-serif;font-size: 14px;color: #333333;}" +
        "table {width: 100%;border-collapse: collapse;}" +
        "table.titulo {background: #FFFFFF;padding-bottom: 7px;border-bottom: solid 2px #3385FF;}" +
        "table.titulo tr {background: #FFFFFF;color: #3385FF;}" + 
        "table.titulo tr td {display: flex;padding: auto;align-items: center;justify-content: center;}" +
        ".logo {width: 100%;display: flex;padding: auto;align-items: center;justify-content: center;}" +
        ".logo img {width: 60%}" +
        ".line{height: 2.5px;width: 100%;background: #3385FF;}" +
        ".subject {font-size: 20px;font-weight: 600;text-align: center;padding: auto;}" +
        "div.clear {clear: both;}" +
        "table.ov {margin: auto;}" +
        "table.ov th,table.ov td {border: 1px solid #999;padding: 3px 7px;text-align: center;}" +
        "table.ov tr th {background: #3385FF;color: #FFF;}" +
        "table.ov tr:nth-child(2n+1) td {background: #CFE7F3;}" +
        "table.footer {border-top: solid 1px #CCCCCC;color: #999999;}" +
        "</style></head><body>" +
        "<div class='logo'><img src='https://lh3.googleusercontent.com/L2FstSDkeuVLSILRimwaYJJ38tGxgNwn_BInOB7eDzNXPRmaBjNgFylTzlL5-JRpE3vmPEp9YT5VbxSE4FCPOblUW0burjoJ9VPHWGJNFaraHQDDIlxV1imrKGbV3Cju-4mJq-4xn-JGX4xFGRAFnWs8x3c4vw?authuser=3'></div>" +
        "<div class='line'></div><br>" +
        "<table class='texto'><tbody>" +
        "<tr><td>Olá, " + usuario.nome + ", tudo bem?<br><br>Segue abaixo o código de verificação para concluir sua solicitação para redefinir senha: <br><br> </td></tr>" +
        "</tbody></table>" + 
        "<div class='ov'><h3>" + usuario.codigoVerificacao + "</h3></div><br>" +        
        "<p>Por favor, insira o código acima no aplicativo para finalizar o procedimento.</p>" +
        "<table class='footer'><tbody><tr>" +
        "<td><small>Mensagem enviada automaticamente. Por favor, não responder.</small><br><small>LabTrip - " +
        "labtrip.ifsp@gmail.com</small><br><br><small>Esta mensagem, incluindo seus anexos, tem caráter " +
        "confidencial e seu conteúdo é restrito ao destinatário da mensagem. Caso você tenha recebido " +
        "esta mensagem por engano, queira por favor retorná-la ao remetente e apagá-la de seus arquivos. " +
        "Qualquer uso não autorizado, replicação ou disseminação desta mensagem ou parte dela é " +
        "expressamente proibido. O LabTrip não é responsável pelo conteúdo ou a veracidade desta " +
        "informação. <br><br>Confidentiality Notice: The information contained in this email message, " +
        "including any attachment, is confidential and is intended only for the person or entity to which " +
        "it is addressed. If you are neither the intended recipient nor the employee or agent responsible " +
        "for delivering this message to the intended recipient, you are hereby notified that you may not " +
        "review, retransmit, convert to hard copy, copy, use or distribute this email message or any " +
        "attachments to it. If you have received this email in error, please contact the sender " +
        "immediately and delete this message from any computer or other data bank. Thank you.</td> " +
        "</tr></tbody></table></body></html>";


    return corpo.toString();
  }

}