const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

//bcrypt
const passHash = pass => bcrypt.hashSync(pass, 10);
const passCompare = (pass, hash) => bcrypt.compareSync(pass, hash);

//jwt
const tokenSign = payload => jwt.sign(payload, secretKey);
const tokenVerify = token => jwt.verify(token, secretKey);

const pagingData = (products, limit, page) => {
  return {
    totalPages: Math.ceil(products.count / limit),
    totalItems: products.count,
    currentPage: page ? +page : 1,
    products: products.rows,
  };
};
module.exports = { passHash, passCompare, tokenSign, tokenVerify, pagingData };
