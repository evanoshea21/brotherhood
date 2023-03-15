const router = require('express').Router();
const Users = require('./controllers/Users.js');
const Trades = require('./controllers/Trades.js');

router.get('/users', Users.getAllUsers);
router.post('/trades', Trades.getTrades);

module.exports = router;
