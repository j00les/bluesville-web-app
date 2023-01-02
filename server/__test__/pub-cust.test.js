const req = require('supertest');
const app = require('../app');
const { User } = require('../models/');

const cust = [
  {
    username: 'cust',
    email: 'cust1@mail.com',
    password: 'cust123',
    role: 'Customer',
    phoneNumber: '089076',
    address: 'jalan mangga',
  },

  {
    username: 'cust',
    email: 'cust1@mail.com',
    password: 'cust123',
    role: 'Customer',
    phoneNumber: '089076',
    address: 'jalan mangga',
  },
];

afterAll(async () => {
  await User.destroy({ truncate: true, cascade: true, restartIdentity: true });
});

describe('PUB CUSTOMER TEST', () => {
  describe('POST /pub/register', () => {
    //[ ] Berhasil register
    it(' Should be success - 201 register success', async () => {
      const res = await req(app).post('/pub/register').send(cust[0]);
      const { status, body } = res;

      expect(status).toBe(201);
      expect(body).toHaveProperty('id', expect.any(Number));
      expect(body).toHaveProperty('email', cust[0].email);
    });

    //[ ] Email tidak diberikan / tidak diinput
    it(' Should return an error - 400 email is required', async () => {
      delete cust[0].email;
      const res = await req(app).post('/pub/register').send(cust[0]);
      const { status, body } = res;

      expect(status).toBe(400);
      expect(body.message).toEqual(
        expect.arrayContaining(['Email is required'])
      );
    });

    //[ ] Password tidak diberikan / tidak diinput
    it('Should return an error - 400 password is required', async () => {
      delete cust[0].password;
      cust.email = 'cust1@mail.com';
      const res = await req(app).post('/pub/register').send(cust[0]);
      const { status, body } = res;

      expect(status).toBe(400);
      expect(body.message).toEqual(
        expect.arrayContaining(['Password is required'])
      );
    });

    //[ ] Email diberikan string kosong
    it('Should return an error - 400 email is required', async () => {
      cust[0].email = '';
      const res = await req(app).post('/pub/register').send(cust[0]);
      const { status, body } = res;

      expect(status).toBe(400);
      expect(body.message).toEqual(
        expect.arrayContaining(['Email is required'])
      );
    });

    //[ ] Password diberikan string kosong
    it('Should return an error - 400 password is required', async () => {
      cust[0].password = '';
      cust.email = 'cust1@mail.com';
      const res = await req(app).post('/pub/register').send(cust[0]);
      const { status, body } = res;

      expect(status).toBe(400);
      expect(body.message).toEqual(
        expect.arrayContaining(['Password is required'])
      );
    });

    //[ ] Email sudah terdaftar
    it(' Should return an error - 400 email must be unique', async () => {
      const res = await req(app).post('/pub/register').send(cust[1]);
      const { status, body } = res;

      expect(status).toBe(400);
      expect(body.message).toEqual(
        expect.arrayContaining(['Email must be unique'])
      );
    });

    //[ ] Format Email salah / invalid
    it(' Should return an error - 400 invalid email format', async () => {
      cust[0].email = 'salah8format';
      cust[0].password = 'cust123';

      const res = await req(app).post('/pub/register').send(cust[0]);
      const { status, body } = res;

      expect(status).toBe(400);
      expect(body.message).toEqual(
        expect.arrayContaining(['Invalid email format'])
      );
    });
  });

  describe('POST /pub/login', () => {
    //[ ] Berhasil login
    it('Should be success - 200 login success', async () => {
      cust[0].email = 'cust1@mail.com';
      const res = await req(app).post('/pub/login').send({
        email: cust[0].email,
        password: cust[0].password,
      });

      const { status, body } = res;

      expect(status).toBe(200);
      expect(body).toHaveProperty('access_token');
      expect(body).toHaveProperty('userId', expect.any(Number));
      expect(body).toHaveProperty('name', expect.any(String));
      expect(body).toHaveProperty('role', expect.any(String));
    });

    //[ ] Memberikan password yang salah
    it('Should return an error - 401 Invalid email/password', async () => {
      cust[0].email = 'cust1@mail.com';
      cust[0].password = 'salah123';

      const res = await req(app).post('/pub/login').send({
        email: cust[0].email,
        password: cust[0].password,
      });

      const { status, body } = res;

      expect(status).toBe(401);
      expect(body).toHaveProperty('message', 'Invalid email/password');
    });

    //[ ] Email yang diinput tidak terdaftar di database
    it('Should return an error - 401 Invalid email/password', async () => {
      const res = await req(app).post('/pub/login').send({
        email: 'salah@mail.com',
        password: cust[0].password,
      });

      const { status, body } = res;

      expect(status).toBe(401);
      expect(body).toHaveProperty('message', 'Invalid email/password');
    });
  });
});
