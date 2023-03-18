import axios from 'axios';
export default async function handler(req, res) {
  const HOST = process.env.SERVER_HOST || 'localhost';
  const PORT = process.env.SERVER_PORT || '5003';
  const base_url = `http://${HOST}:${PORT}`;
  const { method, params, queries } = req;
  console.log('PARAMS/QUERY: ', params, queries);
  let response;

  switch(method) {

    case 'GET':
      response = await axios({url: `${base_url}/users`, method: 'GET'});
      res.status(200).send(response.data);
      break;

    case 'POST':
      console.log('req body1------> ', req.body);
      response = await axios({url: `${base_url}/user`, method: 'POST', data: req.body});
      res.status(200).send(response.data);
      break;
  }



}