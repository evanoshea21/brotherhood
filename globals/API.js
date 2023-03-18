import axios from 'axios';
// const axios = require('axios');
// require('dotenv').config();

function axiosCall(method, endpoint, data) {
  const url = `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_PORT}/${endpoint}`;

  return new Promise((resolve, reject) => {
    // resolve(`return getusers... from url: ${url}`);
    // return;
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
  console.log('getting users');
  return new Promise((resolve,reject) => {
    axiosCall('get', 'users')
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
    axiosCall('post', 'user', userObj)
    .then(res => {
      resolve(res);
    })
    .catch(err => {
      reject(err);
    })
  })//end Promise
}