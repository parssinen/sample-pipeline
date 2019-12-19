const request = require('supertest')
const assert = require('assert')
const app = require('../index')

describe('Users endpoint', () => {
  it('should not allow registration without email', async done => {
    request(app)
      .post('/api/users/register')
      .send({ username: 'Testuser', password: 'Testpassword' })
      .expect(418)
      .end(err => {
        if (err) return done(err)
        done()
      })
  })
  it('should not allow registration without password', async done => {
    request(app)
      .post('/api/users/register')
      .send({ username: 'Testuser', email: 'Testpassword' })
      .expect(418)
      .end(err => {
        if (err) return done(err)
        done()
      })
  })
  it('should not allow registration without username', async done => {
    request(app)
      .post('/api/users/register')
      .send({ email: 'Testuser', password: 'Testpassword' })
      .expect(418)
      .end(err => {
        if (err) return done(err)
        done()
      })
  })
  it('should register ok', async done => {
    request(app)
      .post('/api/users/register')
      .send({
        username: 'Testuser',
        password: 'Testpassword',
        email: 'test@email.com',
      })
      .expect(200)
      .end(err => {
        if (err) return done(err)
        done()
      })
  })
})

describe('Login route', () => {
  it('should return JWT', async done => {
    const res = await request(app)
      .post('/api/users/login')
      .send({ user: 'Testuser', password: 'Testpassword' })
      .expect(200)
      .end(err => {
        if (err) return done(err)
        done()
      })
  })
})
