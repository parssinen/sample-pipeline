const auth = require('../middleware/auth')
const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
const config = require('config')
const jwt = require('jsonwebtoken')

router.get('/current', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password')
  res.send(user)
})

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body
})

router.post('/', async (req, res) => {
  // validate the request body first

  user = {
    _id: '123',
    name: 'name',
    email: 'tes@ti.fi',
  }

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
    config.get('myprivatekey')
  )

  res.header('Authorization', 'Bearer ' + token).send({
    _id: user._id,
    name: user.name,
    email: user.email,
  })
})

module.exports = router
