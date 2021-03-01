import Local from '../../../src/locais/Local';

const local = new Local('São Paulo', 'Rua Jupiter', 'São Paulo', 'Brasil', '23548', '466388', null);

describe('Testando classe Local', () => {
    it('Deve retornar objeto do tipo Local', () => {
        expect(local.id).toBe(null);
        expect(local.local).toBe('São Paulo');
        expect(local.endereco).toBe('Rua Jupiter');
        expect(local.cidade).toBe('São Paulo');
        expect(local.pais).toBe('Brasil');
        expect(local.latitude).toBe('23548');
        expect(local.longitude).toBe('466388');
    });
});