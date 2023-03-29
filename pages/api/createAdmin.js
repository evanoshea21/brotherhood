import axios from 'axios';

export default async function handler(req, res) {

  const HOST = process.env.SERVER_HOST || 'localhost';
  const PORT = process.env.SERVER_PORT || '5003';
  const base_url = `http://${HOST}:${PORT}`;

  const { body } = req;
  let response;

  if(body.password === process.env.ADMIN_PASSWORD) {
    //send request to database to create superadmin
    response = await axios({url: `${base_url}/user/type`, method: 'PUT', data: {id: body.id, newType: 'superadmin'}});
      res.status(200).send('success');

  } else {
    res.status(200).send('failure');
  }

}