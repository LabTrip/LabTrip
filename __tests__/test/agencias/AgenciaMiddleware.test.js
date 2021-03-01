import 'regenerator-runtime/runtime';
const request = require('supertest')
import {v4 as uuidv4} from 'uuid';

import AgenciaMiddleware from '../../../src/agencias/AgenciaMiddleware';
import Agencia from '../../../src/agencias/Agencia';

const idAgencia = uuidv4();
const agencia = new Agencia('LabTrip', idAgencia);
const agenciaMiddleware = new AgenciaMiddleware(agencia.nome, agencia.id);

describe('Testando classe agenciaMiddleware', () => {
    it('Deve retornar objeto do tipo agenciaMiddleware', async () => {
        try {
            expect(agenciaMiddleware.agenciaRepository).toBe("LabTrip");

        } catch (error) {
            
        }
    });

    it('Deve testar condicoes do metodo agenciaExiste', async () => {
        try {
            await request(agenciaMiddleware.agenciaExiste({
                acesso: {
                    tipoAcesso: 'Gerencial'
                }
            }));    
        } catch (error) {
            
        }

        await request(agenciaMiddleware.agenciaExiste(undefined));
    });

    it('Deve testar condicoes do metodo verificaAcesso', async () => {
        await request(agenciaMiddleware.verificaAcesso({
            acesso: {
                tipoAcesso: 'Total'
            }
        }));

        await request(agenciaMiddleware.verificaAcesso({
            acesso: {
                tipoAcesso: 'Outro'
            }
        }));
    });

    it('Deve testar condicoes do metodo verificaAcessoAAgencia', async () => {
        await request(agenciaMiddleware.verificaAcessoAAgencia({
            acesso: {
                tipoAcesso: 'Total'
            },
            params: {
                id: 1
            }
        }));

        await request(agenciaMiddleware.verificaAcessoAAgencia({
            acesso: {
                tipoAcesso: 'Gerencial'
            },
            params: {
                id: 1
            },
            token: {
                agenciaId: agencia.id
            }
        }));


        await request(agenciaMiddleware.verificaAcessoAAgencia({
            acesso: {
                tipoAcesso: 'Parcial'
            },
            params: {
                id: 1
            },
            token: {
                agenciaId: agencia.id
            }
        }));

        await request(agenciaMiddleware.verificaAcessoAAgencia({
            acesso: {
                tipoAcesso: 'Outro'
            }
        }));
    });

});
