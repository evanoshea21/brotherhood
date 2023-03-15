import axios from 'axios';
export default async function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// return;
  const response = await fetch('http://localhost:4001/users', {method: 'GET'});
  res.status(200).json({hello: 'yup3'});
  // const resp = await axios({method: 'get', url: 'http://localhost:4001/users'})
  console.log('res', response);
  // res.status(200).send(resp);
  // .catch()
}
