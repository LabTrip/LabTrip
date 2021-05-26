var path = require("path");

  export default class PublicController {
  
    constructor() {
      
    }

    mostraBanner(req, res){
      try{
          const pathFile = path.resolve("./src/images/labtrip_banner.jpg");
        return res.status(200).sendFile(pathFile);
      }
      catch(e){
          console.log(e)
        return res.status(400).json({status: '400', mensagem: 'Bad request.'});
      }
       
    }
  
  }