const request = require('supertest')
const app = require('../index')

describe('Users endpoint', () => {
  it('should not allow registration without email', async () => {
    request(app)
      .post('/api/users/register')
      .send({ username: 'Testuser', password: 'Testpassword' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(418)
  })
  it('should not allow registration without password', async () => {
    request(app)
      .post('/api/users/register')
      .send({ username: 'Testuser', email: 'Testpassword' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(418)
  })
  it('should not allow registration without username', async () => {
    request(app)
      .post('/api/users/register')
      .send({ email: 'Testuser', password: 'Testpassword' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(418)
  })
  it('should register ok', async () => {
    request(app)
      .post('/api/users/register')
      .send({
        email: 'Testuser',
        password: 'Testpassword',
        email: 'test@email.com',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
  })
})

describe('Login route', () => {
  it('should return JWT', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({ username: 'Testuser', password: 'Testpassword' })
      .expect(200)
      .end(err => {
        if (err) return done(err)
        done()
      })
  })
})
