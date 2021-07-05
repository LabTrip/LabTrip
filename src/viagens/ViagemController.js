import Viagem from './Viagem'
const jwt = require('jsonwebtoken');
import {mailer} from '../smtpConfig'
import EmailConviteTemplate from '../template/EmailConviteTemplate'
require('dotenv/config');
import api from '../requesterConfig'
const logger = require('../logger'); 

const statusAtualizarAutomaticamente = [
  'Planejado',
  'Em andamento'
]

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
  alterar: viagem.alterar
});

const updateViagemViewModel = (viagem) => ({
  id:  viagem.id,
  descricao: viagem.descricao,
  dataInicio: viagem.dataInicio,
  dataFim: viagem.dataFim,
  statusId: viagem.statusId,
  agenciaId: viagem.agenciaId,
  usuarioDonoId: viagem.usuarioDonoId,
  criadoPorId: viagem.criadoPorId
});

const participantesViewModel = (participantes) => ({
    usuarioId:  participantes.usuarioId,
    nome: participantes.nome,
    viagemId: participantes.viagemId,
    permissaoViagemId: participantes.permissaoViagemId,
    descricao: participantes.descricao
});

const permissoesViagemViewModel = (permissoes) => ({
  id:  permissoes.id,
  descricao: permissoes.descricao
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
      
      viagens = await this.atualizaStatusAutomatico(viagens);

      res.status(200).json(viagens.map(u => viagemViewModel(u)));
    }
    catch(e){
      logger.error(e)
      logger.info(e.toString(), req.token)
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }
  }

  async atualizaStatusAutomatico(viagens){
    let novoStatus, statusObject;
    let viagensAtualizadas = viagens;
    const status = await this.viagemRepository.buscaStatus();

    viagensAtualizadas.map(async (viagem, index) => {
      if(statusAtualizarAutomaticamente.indexOf(viagem.status) >= 0){
        if(viagem.dataIncio <= new Date() && viagem.dataFim >= new Date()){
          novoStatus = "Em andamento";
        }
        else if(viagem.dataFim <= new Date()){
          novoStatus = "Concluído";
        }
        else{
          novoStatus = viagem.status;
        }
        
        status.map((s) => {
          if(s.descricao === novoStatus){
            statusObject = s;
          }
        });

        viagem.statusId = statusObject.id;
        viagem.status = statusObject.descricao;
        this.viagemRepository.atualiza(updateViagemViewModel(viagem));
        viagensAtualizadas[index] = viagem;
      }
    });

    return viagensAtualizadas;
  }

  async salva(req, res){
    try{
      let {descricao, agenciaId, statusId, dataInicio, dataFim, usuarioDonoId, criadoPorId, participantes} = req.body;

      if(!agenciaId){
        agenciaId = req.token.agenciaId;
      }
      
      if(req.token.agenciaId == agenciaId || req.acesso.tipoAcesso == "Total"){

        if(req.token.agenciaId == agenciaId || !criadoPorId){
          criadoPorId = req.token.id;
        }

        const viagem = new Viagem(descricao, agenciaId, statusId, dataInicio, dataFim, usuarioDonoId, criadoPorId);
    
        await this.viagemRepository.salva(viagem);

        if(participantes){
          const participantesAtualizados = [];

          for(let participante of participantes){
            participantesAtualizados.push({
              usuarioId: participante.usuarioId,
              permissaoViagemId: participante.permissaoViagemId,
              viagemId: viagem.id
            });
          }

          participantesAtualizados.push({
            usuarioId: criadoPorId,
            permissaoViagemId: 3,
            viagemId: viagem.id
          });
          
          participantesAtualizados.map(async (p) => {
            await this.viagemRepository.salvaParticipantes(p);
          })
        }
        else{
          return res.status(400).json({status: '400', mensagem: 'É necessário incluir ao menos um participante na viagem.'});
        }

        await this.notificaViagem(req, viagem, req.method)

        return res.status(201).json(viagemViewModel(viagem));
      }
      else{
        return res.status(403).json({status: '403', mensagem: 'Você não tem permissão para criar viagens na agencia informada.'}); 
      }

    }
    catch(e){
      logger.error(e)
      logger.info(e.toString(), req.token)
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }
    
  }

  async mostra(req, res){
    try{
      const participantes =  await this.viagemRepository.buscaParticipantes(req.viagem);
      const permissaoViagem = await this.viagemRepository.buscaPermissaoDoUsuario(req.token.id, req.viagem.id);
      if(permissaoViagem && permissaoViagem.permissaoViagemId == 2){
        req.viagem.alterar = false;
      }
      else{
        req.viagem.alterar = true;
      }
      req.viagem.participantes = participantes;
      return res.status(200).json(viagemViewModel(req.viagem)); 
    }
    catch(e){
      logger.error(e)
      logger.info(e.toString(), req.token)
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }
  }


  async atualiza(req,res){    
    try{
      const{descricao, agenciaId, statusId, dataInicio, dataFim, usuarioDonoId, criadoPorId, participantes, deletarParticipantes} = req.body;

      const viagem = new Viagem(descricao, agenciaId, statusId, dataInicio, dataFim, usuarioDonoId, req.viagem.criadoPorId, req.viagem.id);
      
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

      await this.notificaViagem(req, viagemAtualizada, req.method)

      return res.status(200).json(viagemViewModel(viagemAtualizada));
    }
    catch(e){
      logger.error(e)
      logger.info(e.toString(), req.token)
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    } 
    
  }

  async buscaParticipantes(req, res){
    try{
      const participantes = await this.viagemRepository.buscaParticipantes(req.viagem);

      return res.status(200).json({participantes: participantes.map(p => participantesViewModel(p))});
    }
    catch(e){
      logger.error(e)
      logger.info(e.toString(), req.token)
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }
  }

  async deleta(req, res){
    try{
      await this.viagemRepository.deleta(req.viagem);
      return res.status(204).end();
    }
    catch(e){
      logger.error(e)
      logger.info(e.toString(), req.token)
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
      logger.error(e)
      logger.info(e.toString(), req.token)
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
      logger.error(e)
      logger.info(e.toString(), req.token)
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
      logger.error(e)
      logger.info(e.toString(), req.token)
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
      logger.error(e)
      logger.info(e.toString(), req.token)
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }
    
  }

  async buscaPermissoes(req, res){
    try{
      let permissoes
      const viagem = req.viagem;
      if(req.token.perfilId == 4){
        const permissaoViagem = await this.viagemRepository.buscaPermissaoDoUsuario(req.token.id, viagem.id);
        console.log(permissaoViagem)
        if(permissaoViagem.permissaoViagemId == 1){
          permissoes =  await this.viagemRepository.buscaPermissoesProprietario();
        }
        else{
          permissoes =  await this.viagemRepository.buscaPermissoesMembro();
        }
      }
      else{
        permissoes =  await this.viagemRepository.buscaPermissoes();
      }

      return res.status(200).json({permissoes: permissoes.map(u => permissoesViagemViewModel(u))}); 
    }
    catch(e){
      logger.error(e)
      logger.info(e.toString(), req.token)
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }
  
  }

  async buscaPermissoesGerais(req, res){
    try{
      let permissoes
      
        permissoes =  await this.viagemRepository.buscaPermissoes();

      return res.status(200).json({permissoes: permissoes.map(u => permissoesViagemViewModel(u))}); 
    }
    catch(e){
      logger.error(e)
      logger.info(e.toString(), req.token)
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }
  
  }

  async notificaViagem(req, viagem, operacao){
    try{
      let titulo, mensagem, dado;
      const participantes = await this.viagemRepository.buscaParticipantes(viagem);

      switch(operacao){
        case 'POST':
          titulo = 'Nova viagem criada'
          mensagem = 'A viagem ' + viagem.descricao + ' foi criada e você foi adicionado à ela.'
          break;
        case 'PUT':
          titulo = 'Viagem atualizada'
          mensagem = 'A viagem ' + viagem.descricao + ' que você participa foi atualizada.'
          break;
      }

      const body = {
        icone: 'airplanemode-active',
        participantes: participantes,
        titulo: titulo,
        mensagem: mensagem,
        dado: viagem
      }

      this.notifica(req, body);
    }
    catch(e){
      logger.error(e)
      logger.info(e.toString(), req.token)
    }
    
  }


  async notifica(req, body) {
    await api.post("notificacoes/", body,
      {
        headers: {
          'x-access-token': req.headers['x-access-token']
      }
    }).then((response) => {
        //console.log('Response ' + response.data.perfis)
    }).catch((err) => {
        console.error("ops! ocorreu um erro" + err);
        logger.error(err)
	      logger.info(err.toString(), req.token)
        return undefined;
    });
  }

}