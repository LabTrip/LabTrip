var path = require("path");
const logger = require('../logger'); 

  export default class PublicController {
  
    constructor() {
      
    }

    mostraBanner(req, res){
      try{
          const pathFile = path.resolve("./src/images/labtrip_banner.jpg");
        return res.status(200).sendFile(pathFile);
      }
      catch(e){
        logger.error(e)
        logger.info(e.toString(), req.token)
        return res.status(400).json({status: '400', mensagem: 'Bad request.'});
      }
       
    }
  
  }