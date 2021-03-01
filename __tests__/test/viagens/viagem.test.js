import Viagem from '../../../src/viagens/Viagem';
import {v4 as uuidv4} from 'uuid';

const dataInicio = new Date('01 March 2021 00:00 UTC');
const dataFim = new Date('31 March 2021 00:00 UTC');
const id = uuidv4();
const viagem = new Viagem('Ferias em São Paulo', 1, 1, dataInicio, dataFim, 1, 1, id);

describe('Testando classe Viagem', () => {
    it('Deve retornar objeto do tipo Viagem', () => {
        expect(viagem.id).toBe(id);
        expect(viagem.descricao).toBe('Ferias em São Paulo');
        expect(viagem.statusId).toBe(1);
        expect(viagem.dataInicio).toBe(dataInicio.toISOString());
        expect(viagem.dataFim).toBe(dataFim.toISOString());
        expect(viagem.usuarioDonoId).toBe(1);
        expect(viagem.criadoPorId).toBe(1);
        expect(viagem.deletadoEm).toBe(null);
    });
});