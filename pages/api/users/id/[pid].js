import axios from 'axios';

export default async function handler(req, res) {

  const HOST = process.env.SERVER_HOST || 'localhost';
  const PORT = process.env.SERVER_PORT || '5003';
  const base_url = `http://${HOST}:${PORT}`;

  const { method, query, body } = req;
  let response;
  switch(method) {

    case 'GET':
      response = await axios({url: `${base_url}/user/id/${query.pid}`, method: 'GET'});
      res.status(200).send(response.data);
      break;

    case 'PUT':
      if(body?.field === 'xp') {
        console.log('updating XP....');
        response = await axios({url: `${base_url}/user/xp`, method: 'PUT', data: body});
        res.status(200).send(response.data);
      } else {
        console.log('updating member TYPE....');
        response = await axios({url: `${base_url}/user/type`, method: 'PUT', data: body});
        res.status(200).send(response.data);
      }
      break;

    case 'DELETE':
      response = await axios({url: `${base_url}/user/${query.id}`, method: 'DELETE'});
      res.status(200).send(response.data);
      break;
  }

}