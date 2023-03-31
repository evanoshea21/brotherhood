const router = require('express').Router();
const Users = require('./controllers/Users.js');
const Badges = require('./controllers/Badges.js');

//User routes
router.get('/users', Users.getAllUsers);
router.get('/users/orderBy/:order', Users.getUsersOrdered);
router.get('/user/:email', Users.getUser);
router.get('/user/id/:id', Users.getUser);
router.put('/user', Users.updateUserMember); //
router.put('/admin/user', Users.updateUserAdmin); //
router.post('/user', Users.createUser);
router.put('/user/type', Users.updateUserType);
router.put('/user/xp', Users.changeXP);

//Badges routes
router.get('/badges', Badges.getAll);
router.get('/badges/earned', Badges.getAllEarned);
router.get('/badges/fromuser/:pid', Badges.getBadgesForUser);
router.get('/badges/:id', Badges.getBadgeFromId);

router.post('/badges', Badges.addBadge);
router.post('/badges/earned', Badges.addBadgeEarned);




module.exports = router;
