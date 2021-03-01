import Roteiro from '../../../src/roteiro/Roteiro';

const roteiro = new Roteiro(1, 2, 3);

describe('Testando classe Roteiro', () => {
    it('Deve retornar objeto do tipo Roteiro', () => {
        expect(roteiro.viagemId).toBe(1);
        expect(roteiro.statusId).toBe(2);
        expect(roteiro.versao).toBe(3);
    });
});