'use strict'

const store = require('./store')

const signUpSuccess = (data) => {
  $('.message-box').text('Congrats You Signed Up')
}

const failure = (error) => {
  console.error(error)
}

const signInSuccess = (data) => {
  $('.message-box').text('You are signed in')
  store.user = data.user
}

const changePasswordSuccess = (data) => {
  $('.message-box').text('Password changed')
}

const changePasswordFailure = (data) => {
  $('.message-box').text('That didnt work')
}

const newGameSuccess = (data) => {
  $('.message-box').text('New Game')
  store.game = data.game
}

const newGameFail = (data) => {
  console.log('new game fail')
}

const gameIndexSuccess = (data) => {
  $('.message-box').text('You have played ' + data.games.length + ' games')
}

// const findGameSuccess = (data) => {
//   console.log(data.game)
//   console.log('success')
//   store.game = data.game
// }

// const updateGameSuccess = (data) => {
//   console.log(data.game)
//   console.log('success')
// }

module.exports = {
  signUpSuccess,
  failure,
  signInSuccess,
  changePasswordFailure,
  changePasswordSuccess,
  newGameSuccess,
  newGameFail,
  gameIndexSuccess
  // findGameSuccess,
  // updateGameSuccess
}
