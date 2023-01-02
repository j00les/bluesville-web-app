const { Product } = require('../models');

const authorization = async (req, res, next) => {
  try {
    const { role, id: authorId } = req.user;
    const { id } = req.params;

    const findProduct = await Product.findByPk(id);
    if (!findProduct) throw { name: 'Not Found' };

    if (role === 'Staff' && findProduct.authorId === authorId) {
      next();
    } else if (role === 'Admin') {
      next();
    } else {
      throw { name: 'Forbidden' };
    }
  } catch (err) {
    next(err);
  }
};

const editAuthorization = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role !== 'Admin') {
      throw { name: 'Forbidden' };
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const getFavoritesAuthz = async (req, res, next) => {
  try {
    const { role } = req.user;

    if (role !== 'Customer') throw { name: 'Forbidden' };
    else next();
  } catch (err) {
    next(err);
  }
};

module.exports = { authorization, editAuthorization, getFavoritesAuthz };
