const auth = require('../middleware/auth')
const bcrypt = require('bcrypt')
const express = require('express')
const query = require('../utils/queries')
const token = require('../utils/jwt')
const router = express.Router()

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body
  if (!username || !email || !password) {
    res.sendStatus(418)
    return
  }
  // Ensure email uniqueness
  const ensureUniqueEmail = `query findEmail { users_aggregate(where: {email: {_eq: "${email}" }} ){nodes{id}}}`
  const uniqueEmail = await query(ensureUniqueEmail)
  if (!uniqueEmail.data.users_aggregate.nodes.length < 1) {
    console.log('ei ole', uniqueEmail.data.users_aggregate.nodes)
    res.status(418).send({ error: 'Email already taken' })
    return
  }

  // Ensure username uniqueness
  const ensureUniqueUsername = `query findUser { users_aggregate(where: {name: {_eq: "${username}" }} ){nodes{id}}}`
  const uniqueUsername = await query(ensureUniqueUsername)
  if (!uniqueUsername.data.users_aggregate.nodes.length < 1) {
    console.log('ei ole', uniqueEmail.data.users_aggregate.nodes)
    res.status(418).send({ error: 'Username already taken' })
    return
  }

  // Create user
  const hashedPassword = await bcrypt.hash(password, 10)
  const createUserMutation = `mutation createUser { insert_users(objects: {name: "${username}", password: "${hashedPassword}", email: "${email}"}) {
        returning {
          id
        }
      }}`
  const created = await query(createUserMutation)
  res.send(created)
})

router.post('/login', async (req, res) => {
  if (!req.body.user) {
    res.send(400)
  }
  const findUserQuery = `query findUser { users_aggregate(where: {name: {_eq: "${req.body.user}" }} ){nodes{password, id}}}`
  const queried = await query(findUserQuery)

  const found = queried.data.users_aggregate.nodes[0]
  if (!req.body.password) {
    res.send(401, 'Please give password')
  } else if (!found) {
    res.send(401, 'Username not found')
  } else {
    bcrypt.compare(req.body.password, found.password, (err, result) => {
      if (err) throw err
      if (result) {
        res.status(200).send({ token, id: found.id })
      } else {
        res.sendStatus(401)
      }
    })
  }
})

module.exports = router
