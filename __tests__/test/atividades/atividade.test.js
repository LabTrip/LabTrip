import Atividade from '../../../src/atividades/Atividade';
import Agencia from '../../../src/agencias/Agencia';
import {v4 as uuidv4} from 'uuid';

const idAgencia = uuidv4();
const agencia = new Agencia('LabTrip', idAgencia);
const idAtividade = uuidv4();
const atividade = new Atividade('Cinema', agencia.id, null, idAtividade);

describe('Testando classe Atividade', () => {
    it('Deve retornar objeto do tipo Atividade', () => {
        expect(atividade.id).toBe(idAtividade);
        expect(atividade.descricao).toBe("Cinema");
        expect(atividade.localId).toBe(null);
        expect(atividade.agenciaId).toBe(idAgencia);
        expect(atividade.deletadoEm).toBe(null);
    });
});