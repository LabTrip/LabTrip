import Login from './Login'
const jwt = require('jsonwebtoken');
import sha256 from 'crypto-js/sha256';
const cryptoRandomString = require('crypto-random-string');
const nodemailer = require("nodemailer");
require('dotenv/config');

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_SENDINBLUE,
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // generated ethereal user
    pass: process.env.SENDINBLUE_PASSWORD, // generated ethereal password
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
    try{
      const{email, senha} = req.body;

      const usuario = await this.loginRepository.buscaPorEmail(email);
      

      if(usuario.verificado == false){
        return res.status(403).json({status: "403", mensagem:"A conta do usuário ainda não foi verificada. Por favor, redefina sua senha antes de tentar autenticar"});
      }
      else if(usuario.senha == sha256(senha).toString()){
        let tokenContent = {
          email: usuario.email,
          id: usuario.id, 
          perfilId: usuario.perfilId, 
          geradoEm: new Date().toISOString()
        };

        if(usuario && (usuario.perfilId == 2 || usuario.perfilId == 3)){
          const funcionario = await this.loginRepository.buscaAgenciaId(usuario.id);
          tokenContent.agenciaId = funcionario.agenciaId;
        }
        
        const token = jwt.sign(tokenContent, process.env.SECRET, {expiresIn: 2592000});
        const usuarioAuth = new Login(usuario.id, usuario.email, usuario.perfilId, token)
        return res.status(200).json(loginViewModel(usuarioAuth)); 
      }
      else{
        return res.status(403).json({status: "403", mensagem:"E-mail e/ou senha inválidos.",codigo:"401"});
      }
    }
    catch(e){
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }
    
    
  }

  async validaToken(req, res, next){
    try{
      const token = req.headers['x-access-token'];
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
          if(err){
            return res.status(401).json({status:"401", mensagem:"Token inválido ou faltando."});
          }

          req.email = decoded.email;
          req.id = decoded.id;
          req.perfilId = decoded.perfilId;
          req.geradoEm = decoded.geradoEm;
          next();
      });
    }
    catch(e){
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }

  }

  async geraCodigo(req, res){
    try{
      const {email} = req.body;
      const codigoVerificacao = cryptoRandomString({length: 6, type: 'distinguishable'});
      const usuario = await this.loginRepository.geraCodigo(email, codigoVerificacao);
      await this.enviaCodigoVerificacao(usuario);
      return res.status(200).json({codigo:"200", mensagem: "Código gerado com sucesso"});
    }
    catch(e){
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }
    
  }

  async validaCodigo(req, res){
    try{
      const {email, codigoVerificacao} = req.body;
      const dados = await this.loginRepository.buscaPorEmail(email);

      if(codigoVerificacao == dados.codigoVerificacao.toString()){
        return res.status(200).json({codigo:"200", mensagem: "Código verificado com sucesso."});
      }
      else{
        return res.status(403).json({codigo:"403", mensagem: "Código incorreto."});
      }
    }
    catch(e){
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }
    
  }

  async redefine(req, res){
    try{
      const {email, senha, codigoVerificacao} = req.body;
      const dados = await this.loginRepository.buscaPorEmail(email);
      if(codigoVerificacao == dados.codigoVerificacao.toString()){
        await this.loginRepository.redefineSenha(email, sha256(senha).toString(),cryptoRandomString({length: 6, type: 'distinguishable'}));
        return res.status(200).json({codigo:"200", mensagem: "Senha redefinida com sucesso."});
      }
      else{
        return res.status(403).json({codigo:"403", mensagem: "Código incorreto."});
      }
    }
    catch(e){
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }
        
  }

  async enviaCodigoVerificacao(usuario){
    try{
      await transporter.sendMail({
        from: 'LabTrip <labtrip.ifsp@gmail.com>', // sender address
        to: usuario.email, // list of receivers
        subject: "Código de verificação - LabTrip", // Subject line
        html: this.montaCorpoEmailVerificacao(usuario), // html body
      });
    }
    catch(e){
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }

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
        ".logo {width: 100%;display: flex;padding: auto;align-items: center;justify-content: center;text-align: center;}" +
        ".logo img {width: 100%}" +
        ".line{height: 2.5px;width: 100%;background: #3385FF;}" +
        ".subject {font-size: 20px;font-weight: 600;text-align: center;padding: auto;}" +
        "div.clear {clear: both;}" +
        "table.ov {margin: auto;}" +
        "table.ov th,table.ov td {border: 1px solid #999;padding: 3px 7px;text-align: center;}" +
        "table.ov tr th {background: #3385FF;color: #FFF;}" +
        "table.ov tr:nth-child(2n+1) td {background: #CFE7F3;}" +
        "table.footer {border-top: solid 1px #CCCCCC;color: #999999;}" +
        "</style></head><body>" +
        "<div class='logo'><img src='https://yt3.ggpht.com/h7v4PLxOl-4v3GFwdraTCW7D2ZJwIQbbP380kwT0ssrDh1UTlZeXo9oSkTrj5n1BBSEv_Uk4YQ=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj'></div>" +
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