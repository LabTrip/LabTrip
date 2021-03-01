import 'regenerator-runtime/runtime';
const request = require('supertest');
const jwt = require('jsonwebtoken');

import AgenciaController from '../../../src/agencias/AgenciaController';
import Agencia from '../../../src/agencias/Agencia';

const agencia = new Agencia('LabTrip', '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000');
const agenciaController = new AgenciaController(agencia.nome, agencia.id);

const token = jwt.sign(
    {
        usuarioId: 'cdb63720-9628-5ef6-bbca-2e5ce6094f3c',
        agenciaId: agencia.id
    },
    'secret',
    {
        expiresIn: 600000
    }
);

const convite = {
    email: 'jeffeson@gmail.com',
    destinatario: 'Jefferson Souza',
    agencia: agencia.nome,
    link: process.env.BASE_URL + 'agencias/convida-funcionarios/' + token
};

const corpo = "<!DOCTYPE html><html><head>" +
"<meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>" +
"<style type='text/css'>html,body{margin: 0;padding: 1%;background: white;}" +
"body {background: #FFFFFF;font-family: Arial, Verdana, sans-serif;font-size: 14px;color: #333333;}" +
"table {width: 100%;border-collapse: collapse;}" +
"table.titulo {background: #FFFFFF;padding-bottom: 7px;border-bottom: solid 2px #3385FF;}" +
"table.titulo tr {background: #FFFFFF;color: #3385FF;}" + 
"table.titulo tr td {display: flex;padding: auto;align-items: center;justify-content: center;}" +
".logo {width: 100%; height: 15%; display: flex;padding: auto;align-items: center;justify-content: center;text-align: center;}" +
".logo img {width: 40rem}" +
".mensagem {width: 100%; display: flex; text-align: center; align-items: center;justify-content: center;}" +
".line{height: 2.5px;width: 100%;background: #3385FF;}" +
".subject {font-size: 20px;font-weight: 600;text-align: center;padding: auto;}" +
"div.clear {clear: both;}" +
"table.ov {margin: auto;}" +
"table.ov th,table.ov td {border: 1px solid #999;padding: 3px 7px;text-align: center;}" +
"table.ov tr th {background: #3385FF;color: #FFF;}" +
"table.ov tr:nth-child(2n+1) td {background: #CFE7F3;}" +
"table.footer {border-top: solid 1px #CCCCCC;color: #999999;}" +
"</style></head><body>" +
"<div class='logo'><img src='https://yt3.ggpht.com/h7v4PLxOl-4v3GFwdraTCW7D2ZJwIQbbP380kwT0ssrDh1UTlZeXo9oSkTrj5n1BBSEv_Uk4YQ=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj'></div>" +
"<div class='line'></div><br>" +
"<div class='mensagem'><h2>O seu convite foi aceito com sucesso!</h2></div>" +
"</body></html>";

describe('Testando classe AgenciaController', () => {
    it('Deve retornar objeto do tipo AgenciaController', async () => {
        expect(agenciaController.agenciaRepository).toBe(agencia.nome);
    });

    it('Deve retornar status 200 para o metodo buscaTodos', async () => {
        await request(agenciaController.buscaTodos());
    });

    it('Deve retornar status 201 para o metodo salva', async () => {
        await request(agenciaController.salva({
            body: agencia.nome
        }));
    });

    it('Deve retornar status 200 para o metodo buscaFuncionarios', async () => {
        await request(agenciaController.buscaFuncionarios({
            params: {
                id: agencia.id
            }
        }));
    });

    it('Deve retornar status 200 para o metodo enviaConviteFuncionario', async () => {
        await request(agenciaController.enviaConviteFuncionario({
            body: {
                usuario: {
                    id: 'cdb63720-9628-5ef6-bbca-2e5ce6094f3c',
                    nome: 'Jefferson Souza',
                    email: 'jeffeson@gmail.com'
                },
                agencia: {
                    id: agencia.id,
                    nome: agencia.nome
                }
            }
        }));
    });

    it('Deve retornar status 201 para o metodo deletaFuncionariosAgencia', async () => {
        await request(agenciaController.deletaFuncionariosAgencia({
            body: {
                id: 'cdb63720-9628-5ef6-bbca-2e5ce6094f3c',
            }
        }));
    });

    it('Deve retornar status 200 para o metodo aceitaConviteFuncionario', async () => {
        await request(agenciaController.aceitaConviteFuncionario({
            params: {
                email: 'jeffeson@gmail.com',
                destinatario: 'Jefferson Souza',
                agencia: agencia.nome,
                link: process.env.BASE_URL + 'agencias/convida-funcionarios/' + token
            }
        }));
    });

    /* it('Deve retornar status 200 para o metodo mostra', () => {
        const mostra = request(agenciaController.mostra({
            agencia: agencia
        }));
        //expect(mostra.status).toBe(200);
    }); */

    it('Deve retornar status 200 para o metodo atualiza', async () => {
        await request(agenciaController.atualiza({
            body: {
                nome: agencia.nome,
            },
            agencia : {
                id: agencia.id
            }
        }));
    });

    it('Deve retornar status 204 para o metodo deleta', async () => {
        await request(agenciaController.deleta({
            agencia: agencia
        }));
    });

    it('Deve retornar status 204 para o metodo enviaConvite', async () => {
        await request(agenciaController.enviaConvite(convite));
    });

    it('Deve retornar status 204 para o metodo retornoConvite', async () => {
        const retornoConvite = await agenciaController.retornoConvite();
        expect(retornoConvite).toBe(corpo);
    });
});
