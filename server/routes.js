const router = require('express').Router();
const Users = require('./controllers/Users.js');

router.get('/users', Users.getAllUsers);
router.get('/user/:email', Users.getUser);
router.get('/user/id/:id', Users.getUser);
router.put('/user', Users.updateUserMember); //
router.put('/admin/user', Users.updateUserAdmin); //
router.post('/user', Users.createUser);


module.exports = router;
