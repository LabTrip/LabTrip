const request = require('supertest') 
import LabTrip from './app';

const app = LabTrip();

describe('Testando servidor', () => {
    it('Deve buscar a rota principal', async () => {
        const res = await request(app).get('/')
    });
});