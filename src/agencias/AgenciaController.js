import Agencia from './Agencia'
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
import EmailConviteTemplate from '../template/EmailConviteTemplate'
require('dotenv/config');
import {mailer} from '../smtpConfig'
const logger = require('../logger');

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
    try{
      let agencias = []
      switch(req.acesso.tipoAcesso){
        case 'Total':
          agencias = await this.agenciaRepository.buscaTodos();
          break;
        case 'Gerencial':
          agencias.push(await this.agenciaRepository.buscaPorId_AcessoParcial(req.token.id, req.token.agenciaId));
          break;
        case 'Parcial':
          agencias.push(await this.agenciaRepository.buscaPorId_AcessoParcial(req.token.id, req.token.agenciaId));
          break;
        default:
          return res.status(403).json({status: '403', mensagem: 'Sem permissão de acesso.'});
      }
      
      res.status(200).json(agencias.map(u => agenciaViewModel(u)));  
    }
    catch(e){
      logger.error(e)
      logger.info(e.toString(), req.token)
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }
    
  }

  async salva(req, res){
    try{
      const {nome} = req.body;

      const agencia = new Agencia(nome);
      
      await this.agenciaRepository.salva(agencia);
  
      res.status(201).json(agenciaViewModel(agencia));  
    }
    catch(e){
      logger.error(e)
      logger.info(e.toString(), req.token)
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }
    
  }

  async buscaFuncionarios(req, res){
    try{
      const agenciaId = req.params.id;

      const funcionarios = await this.agenciaRepository.buscaFuncionariosAgencia(agenciaId);
  
      return res.status(200).json({funcionarios: funcionarios})  
    }
    catch(e){
      logger.error(e)
      logger.info(e.toString(), req.token)
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }
    
  }

  async enviaConviteFuncionario(req, res){
    try{
      const funcionarios = req.body;
      const agencia = req.agencia

      for(let funcionario of funcionarios){
        let usuario = funcionario;

        let token = jwt.sign(
          {
            usuarioId: usuario.id, 
            agenciaId: agencia.id
          }, 
            process.env.SECRET,
          {
            expiresIn: 600000
          }
        );
    
        let convite = {
          email: usuario.email,
          destinatario: usuario.nome,
          agencia: agencia.nome,
          link:  process.env.BASE_URL + 'agencias/convida-funcionarios/aceitar/' + token
        }
        
        await this.enviaConvite(convite);
      }
      
      res.status(200).json({status: '200', mensagem: 'Convite enviado com sucesso'});  
    }
    catch(e){
      logger.error(e)
      logger.info(e.toString(), req.token)
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }
    
  }

  async deletaFuncionariosAgencia(req, res){
    try{
      const funcionarios = req.body;

      for(let funcionario of funcionarios){
        const {id} = funcionario;

        await this.agenciaRepository.deletaFuncionariosAgencia(id, req.params.id);
      }
  
      return res.status(201).json({status: '201', mensagem: 'Funcionário deletado com sucesso.'});  
    }
    catch(e){
      logger.error(e)
      logger.info(e.toString(), req.token)
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }
    
  }

  async aceitaConviteFuncionario(req, res){
    try{
      const convite = req.params.convite;

      let usuarioId;
      let agenciaId;
      let resposta;
  
      jwt.verify(convite, process.env.SECRET, (err, decoded) => {
        if(err){
          resposta = this.retornoConvite("Convite expirado.")
          return res.status(403).send(resposta);
        }
  
        usuarioId = decoded.usuarioId;
        agenciaId = decoded.agenciaId;
      });
  
      await this.agenciaRepository.salvaFuncionario(usuarioId,agenciaId);

      resposta = this.retornoConvite("O seu convite foi aceito com sucesso!");
      res.status(200).send(await new EmailConviteTemplate(convite).retornoConvite());  
    }
    catch(e){
      logger.error(e)
      logger.info(e.toString(), req.token)
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }
    
  }

  mostra(req, res){
    try{
      return res.status(200).json(agenciaViewModel(req.agencia));   
    }
    catch(e){
      logger.error(e)
      logger.info(e.toString(), req.token)
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }
    
  }

  async atualiza(req,res){   
    try{
      const{nome} = req.body;

      const agencia = new Agencia(nome, req.agencia.id);
  
      const agenciaAtualizada = await this.agenciaRepository.atualiza(agencia);
  
      return res.status(200).json(agenciaViewModel(agenciaAtualizada));        
    }
    catch(e){
      logger.error(e)
      logger.info(e.toString(), req.token)
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }  
    
  }


  async deleta(req, res){
    try{
      await this.agenciaRepository.deleta(req.agencia);
      return res.status(204).end();  
    }
    catch(e){
      logger.error(e)
      logger.info(e.toString(), req.token)
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }
    
  }

  async enviaConvite(convite){
    try{
      await mailer.sendMail({
        from: 'LabTrip <labtrip.ifsp@gmail.com>', // sender address
        to: convite.email, // list of receivers
        subject: "Convite para participar de agencia - LabTrip", // Subject line
        html: this.montaCorpoEmailConvite(convite), // html body
      });  
    }
    catch(e){
      logger.error(e)
      logger.info(e.toString(), req.token)
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }

  }

  montaCorpoEmailConvite(convite){

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
        "<tr><td>Olá, " + convite.destinatario + ", tudo bem?<br><br>Segue abaixo o link para aceitar o convite de participação da agência " + convite.agencia + ": <br><br> </td></tr>" +
        "</tbody></table>" + 
        "<div class='ov'><a href='"+ convite.link + "' target='_blank'>Aceitar convite.</a></div><br>" +        
        "<p>Acesse o link acima caso deseje aceitar o convite. Caso contrário, desconsidere este email.</p>" +
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

  retornoConvite(message){

    const corpo = "<!DOCTYPE html><html><head>" +
        "<meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>" +
        "<style type='text/css'>html,body{margin: 0;padding: 1%;background: white;}" +
        "body {background: #FFFFFF;font-family: Arial, Verdana, sans-serif;font-size: 14px;color: #333333;}" +
        "table {width: 100%;border-collapse: collapse;}" +
        "table.titulo {background: #FFFFFF;padding-bottom: 7px;border-bottom: solid 2px #3385FF;}" +
        "table.titulo tr {background: #FFFFFF;color: #3385FF;}" + 
        "table.titulo tr td {display: flex;padding: auto;align-items: center;justify-content: center;}" +
        ".logo {width: 100%; height: 15%; display: flex;padding: auto;align-items: center;justify-content: center;text-align: center;}" +
        ".logo img {width: 40rem}" +
        ".mensagem {width: 100%; display: flex; text-align: center; align-items: center;justify-content: center;}" +
        ".line{height: 2.5px;width: 100%;background: #3385FF;}" +
        ".subject {font-size: 20px;font-weight: 600;text-align: center;padding: auto;}" +
        "div.clear {clear: both;}" +
        "table.ov {margin: auto;}" +
        "table.ov th,table.ov td {border: 1px solid #999;padding: 3px 7px;text-align: center;}" +
        "table.ov tr th {background: #3385FF;color: #FFF;}" +
        "table.ov tr:nth-child(2n+1) td {background: #CFE7F3;}" +
        "table.footer {border-top: solid 1px #CCCCCC;color: #999999;}" +
        "</style></head><body>" +
        "<div class='logo'><img src='" + process.env.BASE_URL + "public/logo-banner'></div>" +
        "<div class='line'></div><br>" +
        "<div class='mensagem'><h2>" + message +"</h2></div>" +
        "</body></html>";


    return corpo.toString();
  }

}