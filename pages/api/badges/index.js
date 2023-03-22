import axios from 'axios';

// GET USER [id]
// DELETE USER [id]

export default async function handler(req, res) {

  const HOST = process.env.SERVER_HOST || 'localhost';
  const PORT = process.env.SERVER_PORT || '5003';
  const base_url = `http://${HOST}:${PORT}`;

  const { method, query, body } = req;
  let response, postEndPoint;

  if(body.type === 'earned') {
    postEndPoint = 'badges/earned'
  } else {
    postEndPoint = 'badges'
  }

  switch(method) {
    //GET ALL BADGES
    case 'GET':
      response = await axios({url: `${base_url}/badges`, method: 'GET'});
      res.status(200).send(response.data);
      break;

    case 'POST':
      response = await axios({url: `${base_url}/${postEndPoint}`, method: 'POST', data: body});
      res.status(200).send(response.data);
      break;



    // case 'DELETE':
    //   response = await axios({url: `${base_url}/user/${query.id}`, method: 'DELETE'});
    //   res.status(200).send(response.data);
    //   break;
  }

}