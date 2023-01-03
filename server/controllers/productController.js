const { History, Product, Category, User } = require("../models/");

class ProductController {
  static async createProduct(req, res, next) {
    try {
      const { id: authorId, username } = req.user;
      const { name, description, price, stock, imgUrl, categoryId } = req.body;

      const response = await Product.create({
        name,
        description,
        price,
        stock,
        imgUrl,
        categoryId,
        authorId,
      });

      await History.create({
        name: response.name,
        description: `Product with Id ${response.id} has been created`,
        updatedBy: username,
      });

      res.status(201).json({
        product: response,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getProduct(req, res, next) {
    try {
      const response = await Product.findAll({
        include: {
          model: User,
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, price, stock, imgUrl, categoryId, authorId } =
        req.body;
      const { username } = req.user;
      const findProd = await Product.findByPk(id);

      if (!findProd) throw { name: "Not Found" };

      const [...response] = await Product.update(
        {
          name,
          description,
          price,
          stock,
          imgUrl,
          categoryId,
          authorId,
        },

        {
          returning: true,
          where: { id },
        }
      );

      const prod = response[1][0];

      await History.create({
        name: prod.name,
        description: `Product with Id ${prod.id} has been updated`,
        updatedBy: username,
      });

      res.status(200).json({
        message: "Product updated successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  static async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      console.log(id, "yok mari");
      const response = await Product.findOne({
        where: { id },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      if (!response) throw { name: "Not Found" };

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async getCategory(req, res, next) {
    try {
      const response = await Category.findAll();

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async getCategoryById(req, res, next) {
    try {
      const { id } = req.params;

      const response = await Category.findByPk(id);
      if (!response) throw { name: "Category Not Found" };

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async createCategory(req, res, next) {
    try {
      const { name } = req.body;
      await Category.create({
        name,
      });

      res.status(201).json({ message: "Category created successfully" });
    } catch (err) {
      next(err);
    }
  }

  static async updateCategory(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const findCat = await Category.findByPk(id);
      if (!findCat) throw { name: "Category Not Found" };

      await Category.update(
        {
          name,
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(201).json({ message: "Category updated successfully" });
    } catch (err) {
      next(err);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      const response = await Product.destroy({
        where: { id },
      });

      if (!response) throw { name: "Not Found" };

      res.status(200).json({
        message: `Product with ID ${id} deleted successfully`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;
      const response = await Category.destroy({
        where: { id },
      });

      if (!response) throw { name: "Category Not Found" };

      res.status(200).json({
        message: "Category deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const { username: updatedBy } = req.user;

      const findProd = await Product.findByPk(id);

      await Product.update(
        { status },
        {
          where: { id },
        }
      );

      await History.create({
        name: findProd.name,
        description: `Product with Id ${id} status has been updated from ${findProd.status} to ${status}`,
        updatedBy,
      });

      res.status(200).json({
        message: `Status updated successfully`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getHistory(req, res, next) {
    try {
      const response = await History.findAll({
        attributes: { exclude: ["updatedAt"] },
        order: [["id", "DESC"]],
      });

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProductController;
