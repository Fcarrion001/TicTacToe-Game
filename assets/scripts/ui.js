'use strict'

const store = require('./store')

const signUpSuccess = (data) => {
   console.log(data)
}

const failure = (error) => {
 console.error(error)
}

const signInSuccess = (data) => {
  console.log('signed in')
  console.log('this is data', data)
  store.user = data.user
}

const changePasswordSuccess = (data) => {
  console.log('change pw success')
  console.log(store.user)
}

const changePasswordFailure = (data) => {
  console.log('you failed to change')
}
module.exports = {
  signUpSuccess,
  failure,
  signInSuccess,
  changePasswordFailure,
  changePasswordSuccess
}
