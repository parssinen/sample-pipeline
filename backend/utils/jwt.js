const env = require('dotenv').config()
const jwt = require('jsonwebtoken')

const token = jwt.sign(
  {
    sub: '1234567890',
    name: 'Node App',
    admin: true,
    iat: 1516239022,
    'https://hasura.io/jwt/claims': {
      'x-hasura-allowed-roles': ['editor', 'user', 'mod'],
      'x-hasura-default-role': 'user',
    },
  },
  process.env.PRIVATE_KEY
)

module.exports = token
