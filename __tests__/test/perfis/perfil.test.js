import Perfil from '../../../src/perfis/Perfil';

const perfil = new Perfil('Gerente de agencia', 1);

describe('Testando classe Perfil', () => {
    it('Deve retornar objeto do tipo Perfil', () => {
        expect(perfil.id).toBe(1);
        expect(perfil.descricao).toBe('Gerente de agencia');
    });
});