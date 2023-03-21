import axios from 'axios';

// GET USERS, POST User
export default async function handler(req, res) {
  const HOST = process.env.SERVER_HOST || 'localhost';
  const PORT = process.env.SERVER_PORT || '5003';
  const base_url = `http://${HOST}:${PORT}`;
  const { method, params, queries, body } = req;
  let response;

  switch(method) {

    case 'GET':
      response = await axios({url: `${base_url}/users`, method: 'GET'});
      res.status(200).send(response.data);
      break;

      case 'POST':
        // console.log('req body PUT------> ', body);
        response = await axios({url: `${base_url}/user`, method: 'POST', data: body});
        res.status(200).send(response.data);
        break;

      case 'PUT':
        // console.log('req body PUT------> ', body);
        response = await axios({url: `${base_url}/user`, method: 'PUT', data: body});
        res.status(200).send(response.data);
        break;
  }



}