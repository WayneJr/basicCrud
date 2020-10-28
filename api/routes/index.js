const express    = require('express'),
    router       = express.Router(),
    {check}      = require('express-validator'),
    indexControl = require('../controllers/indexController');

router.get('/', indexControl.root);
router.get('/register', indexControl.showUserRegister);
router.post('/register', [
    check("username", "Please enter a valid username")
    .not()
    .isEmpty(),
    check("password", "Please enter a valid password").isLength({min: 5})],
    indexControl.userRegister);
router.get('/login', indexControl.showUserLogin);
router.post('/login', indexControl.userLogin);
router.get('/admin', indexControl.showAdmin);
router.post('/admin/register', indexControl.adminRegister);
router.post('/admin/login', indexControl.adminLogin);

module.exports = router;
