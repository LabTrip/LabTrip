//logger.js
const winston = require('winston');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;
const S3StreamLogger = require('s3-streamlogger').S3StreamLogger;
const os = require("os");
const moment = require('moment');
const dia = moment().format("yyyy-MM-DD");

 
const s3streamHttp = new S3StreamLogger({
  bucket: process.env.BUCKET_NAME,
  access_key_id: process.env.AWS_ACCESS_KEY_ID,
  secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
  folder: `http-logs/${dia}/${os.hostname()}`,
  name_format:`%Y-%m-%d-%H-%M-http-${os.hostname()}.log`,
  max_file_size: 1* 1024 * 1024, //1MB
  tags: {type: 'httpslogs', project: 'Labtrip'}
});

const s3streamErrors = new S3StreamLogger({
  bucket: process.env.BUCKET_NAME,
  access_key_id: process.env.AWS_ACCESS_KEY_ID,
  secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
  folder: `error-logs/${dia}/${os.hostname()}`,
  name_format:`%Y-%m-%d-%H-%M-error-${os.hostname()}.log`,
  max_file_size: 1* 1024 * 1024, //1MB
  tags: {type: 'errorlogs', project: 'Labtrip'}
});

s3streamHttp.on('error', function(err){
  Console.log('error', 'logging transport error', err)
});

s3streamErrors.on('error', function(err){
  Console.log('error', 'logging transport error', err)
});

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  }

 
const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        winston.format.errors({ stack: true }),
        winston.format.json()               
     ),
    transports: [
      new (winston.transports.Stream)({stream: s3streamHttp, level: 'http'}),
      new (winston.transports.Stream)({stream: s3streamErrors, level: 'info'}),
      //new winston.transports.File({ filename: 'error.log', level: 'error',level: 'info'}),
      //new winston.transports.File({ filename: 'http.log', level: 'http'})
    ],
});

// stream usado para passar log do morgan para o winston
logger.stream = {
    write: function(message, encoding) {
    logger.http(message);
  }
};

 
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}
 
module.exports = logger;