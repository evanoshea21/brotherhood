const router = require('express').Router();
const Users = require('./controllers/Users.js');

router.get('/users', Users.getAllUsers);
router.get('/user/:id', Users.getUser);
router.post('/user', Users.createUser);


module.exports = router;
