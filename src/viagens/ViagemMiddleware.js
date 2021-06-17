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
  
    constructor(viagemRepository){
      this.viagemRepository = viagemRepository;
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

    async verificaAcesso(req){
      
      switch(req.acesso.tipoAcesso){
        case 'Total':
          return await this.viagemRepository.buscaPorId(req.params.id);
          break;
        case 'Gerencial':
            return await this.viagemRepository.buscaPorId_AcessoGerencial(req.params.id, req.token.agenciaId);
          break;
        case 'Parcial':
          return await this.viagemRepository.buscaPorId_AcessoParcial(req.params.id,req.token.id);
          break;
        default:
          return undefined;
      }
    }

    async atualizaStatusAutomatico(viagem){
      let novoStatus;
      let viagemAtualizada = viagem;

      if(statusAtualizarAutomaticamente.indexOf(viagem.status) >= 0){
        if(viagem.dataIncio <= new Date() && viagem.dataFim >= new Date()){
          novoStatus = "Em andamento";
        }
        else if(viagem.dataFim <= new Date()){
          novoStatus = "Concluído";
        }
        else{
          novoStatus = viagemAtualizada.status;
        }
        
        const status = await this.viagemRepository.buscaStatusComFiltro({descricao: novoStatus});
        console.log(status)
        viagemAtualizada.statusId = status.id
        await this.viagemRepository.atualiza(updateViagemViewModel(viagemAtualizada));
        viagemAtualizada = await this.viagemRepository.buscaPorId(viagemAtualizada.id)
      }

      return viagemAtualizada;
    }

  }