import express from 'express';
import PublicController from './PublicController'

export default function definePublicRouter(){
  const router = express.Router();

  const publicController = new PublicController();

  router.route('/logo-banner')
   .get((req, res) => publicController.mostraBanner(req, res));
    

  return router;
}