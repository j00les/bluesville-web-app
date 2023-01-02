const req = require('supertest');
const app = require('../app');

const favorite = require('../test-data/favorite-t.json');
const prodData = require('../test-data/products-t.json');
const userData = require('../test-data/users-t.json');
const catData = require('../test-data/category-t.json');

const { User, Category, Product, Favorite } = require('../models');
const { tokenSign } = require('../helpers/helpers');

let validToken, validTokenAdmin;

const cust = {
  username: 'cust',
  email: 'cust12@mail.com',
  password: 'cust123',
  role: 'Customer',
  phoneNumber: '089076',
  address: 'jalan mangga',
};

const admin = {
  username: 'admin',
  email: 'admin9090@mail.com',
  password: 'admin123',
  role: 'Admin',
  phoneNumber: '089076',
  address: 'jalan mangga',
};

beforeAll(async () => {
  const custCreate = await User.create(cust);
  validToken = tokenSign({
    id: custCreate.id,
    email: custCreate.email,
  });

  const adminCreate = await User.create(admin);
  validTokenAdmin = tokenSign({
    id: adminCreate.id,
    email: adminCreate.email,
  });

  await User.bulkCreate(userData);
  await Category.bulkCreate(catData);
  await Product.bulkCreate(prodData);
  await Favorite.bulkCreate(favorite);
});

afterAll(async () => {
  await User.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  }).then(() => {});

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

describe('PUB FAVORITE TEST', () => {
  describe('GET /pub/favorites', () => {
    //   [ ] Berhasil mendapatkan list bookmark / favorite sesuai dengan user yang login
    it('Should be success - 200 OK', async () => {
      const res = await req(app)
        .get('/pub/favorites')
        .set('access_token', validToken);
      const { body, status } = res;
      expect(body.length).toEqual(2);
      expect(status).toBe(200);
      body.forEach(el => {
        expect(el).toHaveProperty('UserId', 1);
      });
    });

    //   [x] Gagal mendapatkan list bookmark / favorite karena token yang diberikan bukan role “customer” melainkan staff / admin
    it('Should return an error - 403 Forbidden', async () => {
      const res = await req(app)
        .get('/pub/favorites')
        .set('access_token', validTokenAdmin);
      const { body, status } = res;

      expect(status).toBe(403);
      expect(body).toHaveProperty('message', 'You are not authorized');
    });

    //   [x] Gagal mendapatkan list bookmark / favorite karena belum login
    it('Should return an error - 401 Unauthorized', async () => {
      const res = await req(app).get('/pub/favorites');
      const { body, status } = res;

      expect(status).toBe(401);
      expect(body).toHaveProperty('message', 'Invalid token');
    });
  });

  describe('POST /pub/favorites', () => {
    //   [ ] Berhasil menambahkan bookmark dengan id yang sesuai
    it('Should be success - 201 bookmark created', async () => {
      const res = await req(app)
        .post('/pub/favorites/6')
        .set('access_token', validToken);
      const { body, status } = res;

      expect(status).toBe(201);
      expect(body).toHaveProperty('message', 'Favorite created!');
    });

    //   [ ] Gagal menambahkan bookmark karena id entity yang dikirim tidak terdapat di database
    it('Should be success - 404 product not found', async () => {
      const res = await req(app)
        .post('/pub/favorites/200')
        .set('access_token', validToken);
      const { body, status } = res;

      expect(status).toBe(404);
      expect(body).toHaveProperty('message', 'Product not found');
    });
  });
});
