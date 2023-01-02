const { tokenVerify } = require('../helpers/helpers');
const { User } = require('../models');

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    const payload = tokenVerify(access_token);

    const findUser = await User.findOne({ where: { email: payload.email } });
    if (!findUser) throw { name: 'Unauthorized' };

    req.user = {
      id: findUser.id,
      username: findUser.username,
      role: findUser.role,
    };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
