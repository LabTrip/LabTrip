import Login from '../../../src/login/Login';

const login = new Login(1, 'waldizney@gmail.com', 2, 'token');

describe('Testando classe Login', () => {
    it('Deve retornar objeto do tipo Login', () => {
        expect(login.id).toBe(1);
        expect(login.email).toBe('waldizney@gmail.com')
        expect(login.perfilId).toBe(2);
        expect(login.token).toBe('token');
    });
});