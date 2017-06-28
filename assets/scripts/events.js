'use strict'

const store = require('./store')
const getFormFields = require('../../lib/get-form-fields')

const api = require('./api')
const ui = require('./ui')
//made a function to be invoked when clicking submit in the sign-up section
const onSignUp = function(event) {
  event.preventDefault()
  const data = getFormFields(this)
  console.log('this is this', this)
  console.log('this is data', data)
    api.signUp(data)
    .then(ui.signInSuccess)
    .catch(ui.signInSuccess)

}

module.exports = {
  onSignUp
}
