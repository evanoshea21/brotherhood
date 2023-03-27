import axios from 'axios';
import AWS from 'aws-sdk';

export default async function handler(req, res) {

  const HOST = process.env.SERVER_HOST || 'localhost';
  const PORT = process.env.SERVER_PORT || '5003';
  const base_url = `http://${HOST}:${PORT}`;

  const { body } = req;
  let response;

  //the delete code....
    try {
      let s3bucket = await new AWS.S3({
          accessKeyId: process.env.IAM_USER_KEY,
          secretAccessKey: process.env.IAM_USER_SECRET,
          Bucket: process.env.BUCKET_NAME,
      });
      var params = { Bucket: process.env.BUCKET_NAME, Key: body.key };
      s3bucket.deleteObject(params, function(err, data) {
          if (err) res.status(500).send('err deleting s3', err);
          // an error occurred
          else res.status(200).send(`Success deletion: ${data}`);// successful response
      });
  } catch (e) {
    res.status(500).send('err connecting to s3 to delete', err);
  }



}