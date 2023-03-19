const router = require('express').Router();
const Users = require('./controllers/Users.js');

router.get('/users', Users.getAllUsers);
router.get('/user/:email', Users.getUser);
router.post('/user', Users.createUser);


module.exports = router;
