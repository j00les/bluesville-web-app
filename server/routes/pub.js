const PubController = require('../controllers/pubController');
const authentication = require('../middlewares/auth');
const { getFavoritesAuthz } = require('../middlewares/authz');
const router = require('express').Router();

router.post('/register', PubController.register);
router.post('/login', PubController.login);
router.post('/google-login', PubController.googleLogin);

router.get('/products', PubController.getProduct);
router.get('/products/:id', PubController.getProductById);

router.use(authentication);

router.get('/favorites', getFavoritesAuthz, PubController.getFavorites);
router.post('/favorites/:id', PubController.createFavorites);

module.exports = router;
