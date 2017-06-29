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

    const addHandlers = () => {
      $('#sign-up').on('submit', onSignUp)
      $('#sign-in').on('submit', onSignIn)
      $('#change-password').on('submit', onChangePassword)
      $('#sign-out').on('submit', onSignOut)
      $('#newGame').on('submit', onNewGame)

    }

    const onSignIn = function (event) {
      const data = getFormFields(this)
      console.log('this is ', this)
      console.log(data)
      event.preventDefault()
      api.signIn(data)
        .then(ui.signInSuccess)
        .catch(ui.signUpFailur)
    }

    const onChangePassword = function (event) {
      const data = getFormFields(this)
      event.preventDefault()
      console.log('this is store:', store)
      console.log(this)
      api.changePassword(data)
        .then(ui.changePasswordSuccess)
        .catch(ui.changePasswordFailure)
    }

    const onSignOut = function (event) {
      const data = getFormFields(this)
      event.preventDefault()
      console.log(data)
      console.log(this)
      api.signOut(data)
    }

    const onNewGame = function (event) {
      const data = getFormFields(this)
      event.preventDefault()
        console.log('this is store:', store)
        console.log(this)
        api.newGame(data)

    }

    module.exports = {
      addHandlers,

    }
