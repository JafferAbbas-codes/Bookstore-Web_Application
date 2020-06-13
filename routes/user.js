const express = require('express');
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');

const { userById, allUsers, read, update, purchaseHistory, deleteUser} = require('../controllers/user');

router.get('/secret', requireSignin, (req, res) => {
    res.json({
        user: 'got here yay'
    });
});

router.get('/users/:userId', requireSignin, isAdmin, allUsers)
router.get('/user/:userId', requireSignin, isAuth, read);
router.put('/user/:userId', requireSignin, isAuth, update);
router.get('/orders/by/user/:userId', requireSignin, isAuth, purchaseHistory);
router.delete('/user/:userId', requireSignin, isAuth, deleteUser);


router.param('userId', userById);

module.exports = router;
