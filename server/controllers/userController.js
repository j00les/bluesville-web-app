const { passCompare, tokenSign, tokenVerify } = require('../helpers/helpers');
const { User } = require('../models/');
const { OAuth2Client } = require('google-auth-library');

class UserController {
  static async adminRegister(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const response = await User.create({
        username,
        email,
        password,
        role: 'Admin',
        phoneNumber,
        address,
      });

      res.status(201).json({
        id: response.id,
        email: response.email,
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email && !password) {
        throw {
          name: 'Empty Fields',
          message: ['Email is required', 'Password is required'],
        };
      }

      if (!email) throw { name: 'Empty Email' };
      if (!password) throw { name: 'Empty Password' };

      const findUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!findUser) throw { name: 'Unauthorized' };

      const isValid = passCompare(password, findUser.password);
      if (!isValid) throw { name: 'Unauthorized' };

      const payload = {
        id: findUser.id,
        name: findUser.username,
        email: findUser.email,
      };

      const access_token = tokenSign(payload);

      res.status(200).json({
        access_token,
        userId: findUser.id,
        role: findUser.role,
        name: findUser.username,
      });
    } catch (err) {
      next(err);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      //Token from client
      const { credential } = req.body;

      //Get google-user payload
      const client = new OAuth2Client(process.env.CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.CLIENT_ID,
      });
      //this is the  google-user payload---------
      const { name, email } = ticket.getPayload();

      // if there's no user, create one
      const [findUser] = await User.findOrCreate({
        where: { email },
        hooks: false,

        defaults: {
          username: name,
          email,
          password: 'apanya?',
          role: 'Staff',
          phoneNumber: 7813218,
          address: 'Jalan Terong Belanda',
        },
      });

      const payload = {
        id: findUser.id,
        name: findUser.username,
        email: findUser.email,
      };

      const access_token = tokenSign(payload);
      res.status(200).json({
        access_token,
        userId: findUser.id,
        role: findUser.role,
        name: findUser.username,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
