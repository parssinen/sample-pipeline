const request = require('supertest')
const app = require('../index')

const testuserName = 'Testuser'

describe('Users endpoint', () => {
  it('should not allow registration without email', async done => {
    request(app)
      .post('/api/users/register')
      .send({
        username: testuserName,
        password: 'Testpassword',
      })
      .expect(418)
      .end(err => {
        if (err) return done(err)
        done()
      })
  })
  it('should not allow registration without password', async done => {
    request(app)
      .post('/api/users/register')
      .send({
        username: testuserName,
        email: 'Testpassword',
      })
      .expect(418)
      .end(err => {
        if (err) return done(err)
        done()
      })
  })
  it('should not allow registration without username', async done => {
    request(app)
      .post('/api/users/register')
      .send({
        email: testuserName,
        password: 'Testpassword',
      })
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
        username: testuserName,
        password: 'Testpassword',
        email: 'test@email.com',
      })
      .expect(200)
      .end(err => {
        if (err) return done(err)
        done()
      })
  })
  it('Log testuser in', async () => {
    const login = {
      user: testuserName,
      password: 'Testpassword',
    }
    try {
      await request(app)
        .post('/api/users/login')
        .send(login)
        .expect(200)
    } catch (err) {
      console.log(`Error ${err}`)
    }
  })
})

describe('Cleanup ', () => {
  it('Delete testusers', async done => {
    const deleteTestuserMutation = `mutation deleteTest {
            delete_users(where: {name: {_eq: ${testuserName}}}) {
              affected_rows
            }
          }`
    const deleted = await query(deleteTestuserMutation)
    console.log('Deleted rows count: ', deleted.data.delete_users.affected_rows)
    done()
  })
})