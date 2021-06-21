import Notificacao from './Notificacao'
const {Expo} = require('expo-server-sdk');
let expo = new Expo();


export default class NotificacaoController {

  constructor(notificacaoRepository) {
    this.notificacaoRepository = notificacaoRepository;
  }

  async notifica(req, res) {
    try {

      let messages = [];
      let {participantes, titulo, mensagem, dado} = req.body;

      const pushTokens = await this.notificacaoRepository.buscaTokenNotificacao(participantes);

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
                  //console.log(ticketChunk);
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
                  //console.log(receipts);

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

      res.status(200).json({"status": 200, "mensgaem": "Notificação enviada com sucesso"});
    }
    catch (e) {
        console.log(e)
      return res.status(400).json({ status: '400', mensagem: 'Entrada de informações incorretas.' });
    }

  }

}