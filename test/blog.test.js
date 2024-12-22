const request = require('supertest');
const app = require('../app');
const { setupDB, teardownDB } = require('./database');

beforeAll(async () => {
  await setupDB();
});

afterAll(async () => {
  await teardownDB();
});

let token;
let blogId;

describe('Blog Endpoints', () => {
  beforeAll(async () => {
    const response = await request(app).post('/v1/auth/signup').send({
      first_name: 'Okeowo',
      last_name: 'Miracle',
      username: 'kasper',
      email: 'kasper@gmail.com',
      password: 'securePassword123$',
    });

    token = response.body.data.token;
  });

  it('should create a blog post', async () => {
    const response = await request(app)
      .post('/api/v1/users/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Blog Tech',
        description: 'A test blog ',
        body: 'This is content of the blog about tech.',
        tags: ['test', 'blog', 'tech'],
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    blogId = response.body.data._id;
  });

  it('should retrieve a blog post by ID', async () => {
    const response = await request(app)
      .get(`/api/v1/users/posts/${blogId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.title).toBe('Test Blog Tech');
    expect(response.body.data.tags).toContain('test');
    expect(response.body.data.tags).toContain('tech');
    expect(response.body.data.tags).toContain('blog');
    expect(response.body.data.read_time).toBe('less than a minute');
    expect(response.body.data.author.username).toBe('kasper');
  });

  it('should update a blog post', async () => {
    const response = await request(app)
      .put(`/api/v1/users/posts/${blogId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Blog Title',
        state: 'published',
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.title).toBe('Updated Blog Title');
    expect(response.body.data.state).toBe("published");
  });

  it('should delete a blog post', async () => {
    const response = await request(app)
      .delete(`/api/v1/users/posts/${blogId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it('should paginate and filter blogs', async () => {
    await request(app)
      .post('/api/v1/users/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: ' Tech world Blog',
        description: 'Another blog',
        body: 'Tech world love it.',
        tags: ['Tech', 'test'],
      });

    const response = await request(app)
      .get('/api/v1/users/posts')
      .set('Authorization', `Bearer ${token}`)
      .query({
        page: 1,
        limit: 1,
        title: 'Tech world Blog',
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.docs.length).toBe(1);
  });
});
