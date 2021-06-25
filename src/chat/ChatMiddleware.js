const statusAtualizarAutomaticamente = [
  'Planejado',
  'Em andamento'
];

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

export default class ViagemMiddleware{
  
    constructor(chatRepository){
      this.chatRepository = chatRepository;
    }
  
    async viagemExiste(req, res, next){
      let viagem = await this.verificaAcesso(req)

      if(!viagem){
        return res.status(403).json({status: '403', mensagem: 'Viagem não encontrada ou sem permissão de acesso.'});       
      }

      viagem = await this.atualizaStatusAutomatico(viagem);

      req.viagem = viagem;
      next(); 
    }

    async chatDisponivelParaViagem(req){

    }

    async verificaAcesso(req){
      
      switch(req.acesso.tipoAcesso){
        case 'Total':
          return await this.chatRepository.buscaPorId(req.params.id);
          break;
        case 'Gerencial':
            return await this.chatRepository.buscaPorId_AcessoGerencial(req.params.id, req.token.agenciaId);
          break;
        case 'Parcial':
          return await this.chatRepository.buscaPorId_AcessoParcial(req.params.id,req.token.id);
          break;
        default:
          return undefined;
      }
    }

  }