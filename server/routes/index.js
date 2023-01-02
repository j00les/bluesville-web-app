const express = require('express');
const router = express.Router();
const product = require('./product');
const user = require('./user');
const pub = require('./pub');

router.use('/', user);
router.use('/products', product);
router.use('/pub', pub);

module.exports = router;
