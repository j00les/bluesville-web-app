// const { default: axios } = require('axios');
const { default: axios } = require("axios");
const { OAuth2Client } = require("google-auth-library");
const { Op } = require("sequelize");
const { passCompare, tokenSign, pagingData } = require("../helpers/helpers");
const { User, Product, Favorite } = require("../models");

class PubController {
  static async getProduct(req, res, next) {
    try {
      const { filter, sort, page, search } = req.query;
      const option = {};

      if (filter || search || sort) {
        //---------FILTER
        if (filter) {
          const query = filter.category
            .split(",")
            .map((el) => ({ [Op.eq]: el }));
          option.where = {
            categoryId: { [Op.or]: query },
          };
        }

        //------------SORT
        if (sort) {
          let query;
          sort.charAt(0) !== "-"
            ? (query = [[sort, "ASC"]])
            : (query = [[sort.replace("-", ""), "DESC"]]);

          option.order = query;
        }

        //---------SEARCH BY NAME
        if (search) {
          option.where = {
            ...option.where,
            name: {
              [Op.iLike]: `%${search}%`,
            },
          };
        }

        const findProd = await Product.findAndCountAll(option);
        const response = {
          totalPages: Math.ceil(findProd.count / 9),
          totalItems: findProd.count,
          products: findProd.rows,
        };

        res.status(200).json(response);
      } else {
        //----------PAGINATION
        let limit, offset;
        if (page) {
          if (page.size !== "" && typeof page !== undefined) {
            limit = page.size;
            option.limit = limit;
          }
          if (page.number !== "" && typeof page !== undefined) {
            offset = page.number * limit - limit;
            option.offset = offset;
          }

          const findProd = await Product.findAndCountAll(option);
          const response = pagingData(findProd, limit, page.number);

          res.status(200).json(response);
        } else {
          limit = 9;
          offset = 0;

          option.limit = limit;
          option.offset = offset;

          const findProd = await Product.findAndCountAll(option);
          const response = pagingData(findProd, limit, page);

          res.status(200).json(response);
        }
        //----------PAGINATION
      }
    } catch (err) {
      next(err);
    }
  }

  static async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const findProd = await Product.findByPk(id);
      // console.log(findProd, "hit");
      if (!findProd) throw { name: "Not Found" };

      const { data } = await axios({
        method: "get",
        url: `https://api.happi.dev/v1/qrcode?data=https://bluesville-customer-app.web.app/details/${id}`,
        headers: {
          "x-happi-key": process.env.HAPPI_DEV,
        },
      });

      //console.log(data, "cek data");

      findProd.dataValues.qrcode = data.qrcode;
      res.status(200).json(findProd);
    } catch (err) {
      next(err);
    }
  }

  static async register(req, res, next) {
    try {
      const { username, email, password, role, phoneNumber, address } =
        req.body;

      const response = await User.create({
        username,
        email,
        password,
        role: "Customer",
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
      const findUser = await User.findOne({ where: { email } });

      if (!findUser) throw { name: "Unauthorized" };

      const isValid = passCompare(password, findUser.password);
      if (!isValid) throw { name: "Unauthorized" };

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

  static async getFavorites(req, res, next) {
    try {
      const { id: UserId } = req.user;

      const response = await Favorite.findAll({
        include: ["Product"],
        where: { UserId },
      });

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async createFavorites(req, res, next) {
    try {
      const { id: UserId } = req.user;
      const { id: ProductId } = req.params;

      const findProduct = await Product.findByPk(ProductId);
      if (!findProduct) throw { name: "Not Found" };

      const findFav = await Favorite.findOne({
        where: { ProductId, UserId },
      });

      if (findFav) throw { name: "Not Modified" };

      await Favorite.create({
        UserId,
        ProductId,
      });

      res.status(201).json({
        message: "Favorite created!",
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
          password: "apanya?",
          role: "Customer",
          phoneNumber: 7813218,
          address: "Jalan Terong Belanda",
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

module.exports = PubController;
