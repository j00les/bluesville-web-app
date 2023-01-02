const UserController = require('../controllers/userController');
const router = require('express').Router();

router.post('/register', UserController.adminRegister);
router.post('/login', UserController.login);
router.post('/google-login', UserController.googleLogin);

module.exports = router;
