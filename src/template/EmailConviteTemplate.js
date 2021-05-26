import {mailer} from '../smtpConfig'
require('dotenv/config');

export default class EmailConviteTemplate {

  constructor(convite){
    this.convite = convite;
  }

    async enviaConvite(){
        try{
          await mailer.sendMail({
            from: 'LabTrip <labtrip.ifsp@gmail.com>', // sender address
            to: this.convite.email, // list of receivers
            subject: this.convite.subject, // Subject line
            html: this.montaCorpoEmailConvite(), // html body
          });  

          return "OK"
        }
        catch(e){
          const error = await e.toString();
          console.log(error)
          return "";
        }
    
      }

    montaCorpoEmailConvite(convite){
      try{
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
            "<tr><td>" + this.convite.mensagem + "<br><br> </td></tr>" +
            "</tbody></table>" + 
            "<div class='ov'><a href='"+ this.convite.link + "' target='_blank'>Aceitar convite.</a></div><br>" +        
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
        catch(e){
          console.log(e)
          return e;
        }
      }
    
      retornoConvite(){
        try{
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
            "<div class='mensagem'><h2>O seu convite foi aceito com sucesso!</h2></div>" +
            "</body></html>";
    
    
          return corpo.toString();
        }
        catch(e){
          console.log(e)
          return e;
        }
      }
}