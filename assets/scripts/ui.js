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

const newGameSuccess = (data) => {
  console.log('new game success')
  console.log(data.game)
  store.game = data.game
}

const newGameFail = (data) => {
  console.log('new game fail')
}

const gameIndexSuccess = (data) => {
  console.log('game index success')
  console.log(data.games)
}

// const findGameSuccess = (data) => {
//   console.log(data.game)
//   console.log('success')
//   store.game = data.game
// }

const updateGameSuccess = (data) => {
  console.log(data.game)
  console.log('success')
}
module.exports = {
  signUpSuccess,
  failure,
  signInSuccess,
  changePasswordFailure,
  changePasswordSuccess,
  newGameSuccess,
  newGameFail,
  gameIndexSuccess,
  // findGameSuccess,
  updateGameSuccess
}
