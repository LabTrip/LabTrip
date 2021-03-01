import 'regenerator-runtime/runtime';

const request = require('supertest')
import LabTrip from '../../src/app';

const app = LabTrip();

describe('Testando servidor', () => {
    it('Deve buscar a rota principal', async () => {
        await request(app).get('/')
    });
});