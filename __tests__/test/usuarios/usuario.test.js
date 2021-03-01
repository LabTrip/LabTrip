import Usuario from '../../../src/usuarios/Usuario';
import { v4 as uuidv4 } from 'uuid';

const dataNascimento = new Date('01 March 1999 00:00 UTC');
const id = uuidv4();
const usuario = new Usuario('Jefferson', 'jefferson@gmail.com', '+55 (11) 12345-6789', null, 1, dataNascimento, null, null, id);


describe('Testando classe Usuario', () => {
    it('Deve retornar objeto do tipo Usuario', () => {
        expect(usuario.id).toBe(id);
        expect(usuario.nome).toBe('Jefferson');
        expect(usuario.email).toBe('jefferson@gmail.com');
        expect(usuario.telefone).toBe('+55 (11) 12345-6789');
        expect(usuario.foto).toBe(null);
        expect(usuario.perfilId).toBe(1);
        expect(usuario.dataNascimento).toBe(dataNascimento.toISOString());
        expect(usuario.codigoVerificacao).toBe(null);

        expect(usuario.deletadoEm).toBe(null);

    });
});