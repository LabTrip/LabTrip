import Viagem from './Viagem'
const jwt = require('jsonwebtoken');
import {mailer} from '../smtpConfig'
import EmailConviteTemplate from '../template/EmailConviteTemplate'
require('dotenv/config');

const viagemViewModel = (viagem) => ({
  id:  viagem.id,
  descricao: viagem.descricao,
  dataInicio: viagem.dataInicio,
  dataFim: viagem.dataFim,
  statusId: viagem.statusId,
  status: viagem.status,
  agenciaId: viagem.agenciaId,
  usuarioDonoId: viagem.usuarioDonoId,
  dono: viagem.dono,
  criadoPorId: viagem.criadoPorId,
  participantes: viagem.participantes,
});

const participantesViewModel = (participantes) => ({
    usuarioId:  participantes.usuarioId,
    viagemId: participantes.viagemId,
    permissaoViagemId: participantes.permissaoViagemId,
});

const permissoesViagemViewModel = (permissoes) => ({
  id:  permissoes.id,
  descricao: permissoes.descricao,
});

const verificaStatusViagem = (dataFim) => {
  const dataAtual = new Date()
  const dataFinal = new Date(dataFim)
  return (dataFinal < dataAtual)
}

export default class ViagemController {

  constructor(viagemRepository) {
    this.viagemRepository = viagemRepository;
  }

  //GET /viagens
  async buscaTodos(req, res) {
    try{
      
      let viagens;

      switch(req.acesso.tipoAcesso){
        case 'Total':
            viagens = await this.viagemRepository.buscaTodos();
          break;
        case 'Gerencial':
            viagens = await this.viagemRepository.buscaTodosDaAgencia(req.token.agenciaId);
          break;
        case 'Parcial':
            viagens = await this.viagemRepository.buscaTodosComPermissao(req.token.id);
          break;
        default:
            return res.status(403).json({status:'403', mensagem:'Acesso restrito.'})
      }
      
      res.status(200).json(viagens.map(u => viagemViewModel(u)));
    }
    catch(e){
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }
  }


  async salva(req, res){
    try{
      const {descricao, agenciaId, statusId, dataInicio, dataFim, usuarioDonoId, criadoPorId, participantes} = req.body;
      if(req.token.agenciaId == agenciaId || req.acesso.tipoAcesso == "Total"){
        const viagem = new Viagem(descricao, agenciaId, statusId, dataInicio, dataFim, usuarioDonoId, criadoPorId);
    
        await this.viagemRepository.salva(viagem);

        if(!participantes){
          const participantesAtualizados = [];

          for(let participante of participantes){
            participantesAtualizados.push({
              usuarioId: participante.usuarioId,
              permissaoViagemId: participante.permissaoViagemId,
              viagemId: viagem.id
            });
          }

          await this.viagemRepository.salvaParticipantes(participantesAtualizados);
        }

        return res.status(201).json(viagemViewModel(viagem));
      }
      else{
        return res.status(403).json({status: '403', mensagem: 'Você não tem permissão para criar viagens na agencia informada.'}); 
      }

    }
    catch(e){
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }
    
  }

  async mostra(req, res){
    try{
      const participantes =  await this.viagemRepository.buscaParticipantes(req.viagem);
      req.viagem.participantes = participantes;
      return res.status(200).json(viagemViewModel(req.viagem)); 
    }
    catch(e){
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }
  }

  async atualiza(req,res){    
    try{
      const{descricao, agenciaId, statusId, dataInicio, dataFim, usuarioDonoId, criadoPorId, participantes, deletarParticipantes} = req.body;

      const viagem = new Viagem(descricao, agenciaId, statusId, dataInicio, dataFim, usuarioDonoId, criadoPorId, req.viagem.id);
      
      await this.viagemRepository.atualiza(viagem);

      if(deletarParticipantes){

        const participantesDeletados = [];

        for(let participante of deletarParticipantes){
          participantesDeletados.push({
            usuarioId: participante.usuarioId,
            viagemId: req.viagem.id
          });
        }

        await this.viagemRepository.deletaParticipantes(participantesDeletados);
      }

      if(participantes){
        const participantesAtualizados = [];

        for(let participante of participantes){
          participantesAtualizados.push({
            usuarioId: participante.usuarioId,
            permissaoViagemId: participante.permissaoViagemId,
            viagemId: req.viagem.id
          });
        }

        await this.viagemRepository.salvaParticipantes(participantesAtualizados);
      }

      const viagemAtualizada = await this.viagemRepository.buscaPorId(req.viagem.id) 
      const novosParticipantes =  await this.viagemRepository.buscaParticipantes(req.viagem);
      viagemAtualizada.participantes = novosParticipantes;
      return res.status(200).json(viagemViewModel(viagemAtualizada));
      
    }
    catch(e){
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    } 
    
  }

  async buscaParticipantes(req, res){
    try{
      const participantes = await this.viagemRepository.buscaParticipantes(req.viagem);

      return res.status(200).json({participantes: participantes.map(p => participantesViewModel(p))});
    }
    catch(e){
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }
  }

  async deleta(req, res){
    try{
      await this.viagemRepository.deleta(req.viagem);
      return res.status(204).end();
    }
    catch(e){
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }
  }

  async deletaParticipantes(req, res){
    try{
      const participantes = req.body.participantes;
    
      if(participantes){
        
        const participantesDeletados = [];

        for(let participante of participantes){
          participantesDeletados.push({
            usuarioId: participante.usuarioId,
            viagemId: req.viagem.id
          });
        }
        await this.viagemRepository.deletaParticipantes(participantesDeletados);
      }

      return res.status(204).end();
    }
    catch(e){
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }
    
  }

  async convidaParticipantes(req, res){
    try{
      let participantes = req.body.participantes;

      for(let participante of participantes){
        const usuario = await this.viagemRepository.buscaUsuarioPorId(participante.usuarioId);
        
        if(!usuario){
          return res.status(400).json({status: '400', mensagem: 'Um ou mais dos usuários informado(s) não encontrado(s).'});
        }
        let convite = participante;
        convite.viagemId = req.viagem.id;
        convite.email = usuario.email;
        convite.subject = "Convite para participar de viagem";
        convite.mensagem = 
        "Olá, " + usuario.nome + 
        ". <br><br> Você recebeu um convite para participar da viagem \"" + req.viagem.descricao + "\".";
        
        let token = jwt.sign(
          convite,
          process.env.SECRET,
          {
            expiresIn: 600000
          }
        );
    
        convite.link = process.env.BASE_URL + 'viagens/aceitar-convite/' + token
        
        const envio = await new EmailConviteTemplate(convite).enviaConvite();
        if(envio != "OK"){
          return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
        }
      }      

      return res.status(200).json({status: '200', mensagem: 'Convite(s) enviado(s) com sucesso.'});

    }
    catch(e){
      console.log(e)
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }
    
  }

  async salvaParticipante(req, res){
    try{
      const convite = req.params.convite;

      let participante;

      jwt.verify(convite, process.env.SECRET, (err, decoded) => {
        if(err){
          return res.status(403).json({status:"403",message:"Convite expirado."}).end();
        }
      
        participante = decoded;
      });

      await this.viagemRepository.salvaParticipantes(participante);      

      return res.status(200).send(await new EmailConviteTemplate(convite).retornoConvite());
    }
    catch(e){
      console.log(e)
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }
    
  }

  async atualizaParticipantes(req, res){
    try{
      const participantes = req.body.participantes;

      if(participantes){
        for(let participante of participantes){
          const usuario = await this.viagemRepository.buscaUsuarioPorId(participante.usuarioId);
        
          if(!usuario){
            return res.status(400).json({status: '400', mensagem: 'Um ou mais dos usuários informado(s) não encontrado(s).'});
          }
          
          participante = {
            usuarioId: participante.usuarioId,
            permissaoViagemId: participante.permissaoViagemId,
            viagemId: req.viagem.id
          };

          await this.viagemRepository.salvaParticipantes(participante);
        }
      }
      
      return res.status(202).json({status: '202', mensagem: 'Alterado com sucesso.'});    
    }
    catch(e){
      console.log(e)
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }
    
  }

  async buscaPermissoes(req, res){
    try{
      const permissoes =  await this.viagemRepository.buscaPermissoes();
      return res.status(200).json({permissoes: permissoes.map(u => permissoesViagemViewModel(u))}); 
    }
    catch(e){
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }
  
  }

}