import Notificacao from './Notificacao'
const {Expo} = require('expo-server-sdk');
let expo = new Expo();
const logger = require('../logger');


export default class NotificacaoController {

  constructor(notificacaoRepository) {
    this.notificacaoRepository = notificacaoRepository;
  }

  async notifica(req, res) {
    try {

      let messages = [];
      let {participantes, titulo, mensagem, dado, icone} = req.body;

      const notificacao = await this.notificacaoRepository.salva({iconeLabel: icone, descricao: mensagem})
      //console.log(notificacao)
      const usuario_notificacao = await this.notificacaoRepository.salvaUsuarioNotificacao(participantes.map((p) => {
          return {
              notificacaoId: notificacao.id,
              usuarioId: p.usuarioId,
              dataNotificacao: new Date().toUTCString(),
              visualizado: false
          }
      }));
      //console.log(usuario_notificacao)
      console.log(participantes)
      const pushTokens = await this.notificacaoRepository.buscaTokenNotificacao(participantes.map(p => p.usuarioId));
      console.log(pushTokens)

      for (let pushToken of pushTokens) {
        pushToken = pushToken.tokenNotificacao;
        
          if (!Expo.isExpoPushToken(pushToken)) {
              console.error(`Push token ${pushToken} is not a valid Expo push token`);
              console.log(pushToken)
              continue;
          }

          messages.push({
              to: pushToken,
              sound: 'default',
              title: titulo || 'Labtrip',
              body: mensagem || 'Bem vindo ao nosso app!',
              data: dado || { withSome: 'data' },
          })
      }
      let chunks = expo.chunkPushNotifications(messages);
      let tickets = [];
      (async () => {
          for (let chunk of chunks) {
              try {
                  let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                  console.log(ticketChunk);
                  tickets.push(...ticketChunk);
              } catch (error) {
                  console.error(error);
              }
          }
      })();
      let receiptIds = [];
      for (let ticket of tickets) {
          if (ticket.id) {
              receiptIds.push(ticket.id);
          }
      }

      let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
      (async () => {
          for (let chunk of receiptIdChunks) {
              try {
                  let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
                  console.log(receipts);

                  for (let receiptId in receipts) {
                      let { status, message, details } = receipts[receiptId];
                      if (status === 'ok') {
                          continue;
                      } else if (status === 'error') {
                          console.error(
                              `There was an error sending a notification: ${message}`
                          );
                          if (details && details.error) {
                              console.error(`The error code is ${details.error}`);
                          }
                      }
                  }
              } catch (error) {
                  console.error(error);
              }
          }
      })();

      res.status(200).json({"status": 200, "mensagem": "Notificação enviada com sucesso"});
    }
    catch (e) {
      logger.error(e)
      logger.info(e.toString(), req.token)
      return res.status(400).json({ status: '400', mensagem: 'Entrada de informações incorretas.' });
    }

  }

  async mostraNotificacoes(req, res){
      try{
        const notificacoes = await this.notificacaoRepository.buscaNotificacoesPorUsuarioId(req.token.id);

        return res.status(200).json(notificacoes);
      }
      catch(e){
        logger.error(e)
        logger.info(e.toString(), req.token)
        return res.status(400).json({ status: '400', mensagem: 'Entrada de informações incorretas.' });
      }
  }

}