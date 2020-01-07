const config = require('config')
const usersRoute = require('./routes/users')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

//use config module to get the privatekey, if no private key set, end the application
if (!config.get('myprivatekey')) {
  console.error('FATAL ERROR: myprivatekey is not defined.')
  process.exit(1)
}

app.use(express.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use(cors())
//use users route for api/users
app.use('/api/users', usersRoute)

const port = process.env.PORT || 3000
if (process.env.NODE_ENV !== "test") app.listen(port, () => console.log(`Listening on port ${port}...`))

module.exports = app