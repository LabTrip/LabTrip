import express from 'express';
import PublicController from './PublicController'

export default function definePublicRouter(){
  const router = express.Router();

  const publicController = new PublicController();

  router.route('/logo-banner')
   .get((req, res) => publicController.mostraBanner(req, res));
    
  router.route('/termo-de-uso')
   .get((req, res) => publicController.mostraTermoDeUso(req, res));

  return router;
}