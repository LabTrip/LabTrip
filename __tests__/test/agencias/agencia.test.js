import Agencia from '../../../src/agencias/Agencia';
import {v4 as uuidv4} from 'uuid';

const idAgencia = uuidv4();
const agencia = new Agencia('LabTrip', idAgencia);

describe('Testando classe Agencia', () => {
    it('Deve retornar objeto do tipo Agencia', () => {

        expect(agencia.id).toBe(idAgencia);
        expect(agencia.nome).toBe('LabTrip');
        expect(agencia.deletadoEm).toBe(null);
    });
});