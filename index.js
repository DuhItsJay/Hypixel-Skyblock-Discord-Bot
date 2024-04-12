'use strict'
process.title = 'The Astrals Discord Bot'

const app = require('./src/Application')

app
  .register()
  .then(() => {
    app.connect()
  })
  .catch(err => {
    console.error(err)
  })
