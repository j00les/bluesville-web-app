const req = require('supertest');
const app = require('../app');
const { User, Product, Category } = require('../models/');

const prodData = require('../test-data/products-t.json');
const userData = require('../test-data/users-t.json');
const catData = require('../test-data/category-t.json');

beforeAll(async () => {
  await User.bulkCreate(userData);
  await Category.bulkCreate(catData);
  await Product.bulkCreate(prodData);
});

afterAll(async () => {
  await User.destroy({ truncate: true, cascade: true, restartIdentity: true });
  await Product.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  await Category.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe('PUB PRODUCT TEST', () => {
  describe('GET /pub/products', () => {
    //   [ ] Berhasil mendapatkan Entitas Utama (tanpa access_token) tanpa menggunakan query filter parameter
    it('Should be success - 200 OK', async () => {
      const res = await req(app).get('/pub/products');
      const { status, body } = res;

      expect(body.products.length).toEqual(9);
      expect(body.totalItems).toEqual(20);
      expect(status).toBe(200);
    });

    //   [ ] Berhasil mendapatkan Entitas Utama (tanpa access_token) dengan 1 query filter parameter
    it('Should be success - 200 OK', async () => {
      const res = await req(app).get('/pub/products?filter[category]=3');

      const { status, body } = res;

      body.products.forEach(prod => {
        expect(prod).toHaveProperty('categoryId', 3);
      });
      expect(body.products.length).toEqual(8);
      expect(status).toBe(200);
    });

    //   [ ] Berhasil mendapatkan  Entitas Utama serta panjang yang sesuai (tanpa access_token) ketika memberikan page tertentu (cek paginationnya)
    it('Should be success - 200 OK', async () => {
      const res = await req(app).get(
        '/pub/products?page[size]=9&page[number]=2'
      );
      const { status, body } = res;

      expect(body.products[0]).toHaveProperty('id', 10);
      expect(body.products.length).toEqual(9);
      expect(status).toBe(200);
    });

    //   [ ] Berhasil mendapatkan 1  Entitas Utama sesuai dengan params id yang diberikan
    it('Should be success - 200 OK', async () => {
      const res = await req(app).get('/pub/products/2');
      const { status, body } = res;

      expect(body).toHaveProperty('id', 2);
      expect(status).toBe(200);
    });

    //   [ ] Gagal mendapatkan Entitas Utama karena params id yang diberikan tidak ada di database / invalid
    it('Should return an error - 404 Product not found', async () => {
      const res = await req(app).get('/pub/products/200');
      const { status, body } = res;

      expect(body).toHaveProperty('message', 'Product not found');
      expect(status).toBe(404);
    });
  });
});
