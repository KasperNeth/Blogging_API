const request = require('supertest');
const app = require('../app');
const { setupDB, teardownDB } = require("./database");

// Increase Jest timeout
jest.setTimeout(30000);

beforeAll(async () => {
  await setupDB();
});

afterAll(async () => {
  await teardownDB();
});

describe('Auth Endpoints', () => {
  it('should sign up a new user', async () => {
    const response = await request(app).post('/v1/auth/signup').send({
      first_name: 'Okeowo',
      last_name: 'Miracle',
      username: 'kasper',
      email: 'kasper@gmail.com',
      password: 'securePassword123$',
    });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('token');
    expect(response.body.data.email).toBe("kasper@gmail.com")
  });

  it('should log in an existing user', async () => {
    const response = await request(app).post('/v1/auth/login').send({
      email: 'kasper@gmail.com',
      password: 'securePassword123$',
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('token');
  });

  it('should fail to log in with incorrect credentials', async () => {
    const response = await request(app).post('/v1/auth/login').send({
      email: 'kasper@gmail.com',
      password: 'wrongPassword',
    });

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });
});
