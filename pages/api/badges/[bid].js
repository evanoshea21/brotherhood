import axios from 'axios';

// GET USER [id]
// DELETE USER [id]

export default async function handler(req, res) {

  const HOST = process.env.SERVER_HOST || 'localhost';
  const PORT = process.env.SERVER_PORT || '5003';
  const base_url = `http://${HOST}:${PORT}`;

  const { method, query, body } = req;
  let response;

  switch(method) {
    //GET Badge Info (name, png_file, etc)
    case 'GET':
      response = await axios({url: `${base_url}/badges/${query.bid}`, method: 'GET'});
      res.status(200).send(response.data);
      break;



    // case 'DELETE':
    //   response = await axios({url: `${base_url}/user/${query.id}`, method: 'DELETE'});
    //   res.status(200).send(response.data);
    //   break;
  }

}