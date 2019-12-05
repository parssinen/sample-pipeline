const auth = require('../middleware/auth')
const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()

router.get('/current', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password')
  res.send(user)
})

router.post('/', async (req, res) => {
  // validate the request body first
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  user = {
    _id: '123',
    name: 'name',
    email: 'tes@ti.fi',
  }

  const token = user.generateAuthToken()
  res.header('x-auth-token', token).send({
    _id: user._id,
    name: user.name,
    email: user.email,
  })
})

module.exports = router
