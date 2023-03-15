// import axios from 'axios';
const axios = require('axios');
console.log('env in API (server, port): \n', process.env.SERVER_IP, process.env.PORT);

function axiosCall(method, endpoint, data) {

  const url = `http://localhost:3000/${endpoint}`;


  return new Promise((resolve, reject) => {
    resolve('return getusers...')
    return;
    axios({method, url, data })
    .then(res => {
      resolve(res);
    })
    .catch(err => {
      reject(err);
    })
  })
}
//////////////////////////////////////////////////

export function getUsers() {
  return new Promise((resolve,reject) => {
    axiosCall('get', '/users')
    .then(res => {
      resolve(res);
    })
    .catch(err => {
      reject(err);
    })
  })//end Promise
}

export function createUser(userObj) {
  return new Promise((resolve,reject) => {
    axiosCall('post', '/users', userObj)
    .then(res => {
      resolve(res);
    })
    .catch(err => {
      reject(err);
    })
  })//end Promise
}