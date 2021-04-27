const aws = require("aws-sdk");
const S3 = require("aws-sdk/clients/s3");
const region = process.env.AWS_DEFAULT_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

export const s3Teste = new S3({
  region: region,
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey
})