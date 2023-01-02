const ProductController = require('../controllers/productController');
const authentication = require('../middlewares/auth');
const { authorization, editAuthorization } = require('../middlewares/authz');
const router = require('express').Router();

router.use(authentication);

router.get('/categories', ProductController.getCategory);
router.post('/categories', ProductController.createCategory);
router.delete('/categories/:id', ProductController.deleteCategory);

router.patch('/categories/:id', ProductController.updateCategory);
router.get('/categories/:id', ProductController.getCategoryById);

router.get('/histories', ProductController.getHistory);
router.patch('/:id', editAuthorization, ProductController.updateStatus);
router.put('/:id', ProductController.updateProduct);

router.get('/', ProductController.getProduct);
router.get('/:id', ProductController.getProductById);

router.post('/', ProductController.createProduct);
router.delete('/:id', authorization, ProductController.deleteProduct);

module.exports = router;
