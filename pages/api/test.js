import axios from 'axios';

export default async function handler(req, res) {

  const HOST = process.env.SERVER_HOST || 'localhost';
  const PORT = process.env.SERVER_PORT || '5003';
  const base_url = `http://${HOST}:${PORT}`;

  console.log('base url test', base_url);

  try {
    const response = await axios({url: `${base_url}/test`, method: 'GET'});

    console.log('res.data', response.data);
    res.status(200).send(response.data);
  } catch(e) {
    res.status(500).send('not running baby..');
  }

}