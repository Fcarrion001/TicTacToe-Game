'use strict'

const store = require('./store')
const getFormFields = require('../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
// made a function to be invoked when clicking submit in the sign-up section
const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(this)

  api.signUp(data)
    .then(ui.signInSuccess)
    .catch(ui.signInSuccess)
}

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-out').on('submit', onSignOut)
  $('#new-game').on('submit', onNewGame)
  $('#game-index').on('submit', onGameIndex)
  // $('#find-game').on('submit', onFindGame)
  $('.col-xs-4').on('click', onUpdateGame)
}
// function for signing in
const onSignIn = function (event) {
  const data = getFormFields(this)

  event.preventDefault()
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signUpFailure)
}

const onChangePassword = function (event) {
  const data = getFormFields(this)
  event.preventDefault()

  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const onSignOut = function (event) {
  const data = getFormFields(this)
  event.preventDefault()

  api.signOut(data)
}

let turnNum = 0
let gameOver = false
// created empty arrays to hold the game-squares selected
let xValues = []
let oValues = []
// declare player X as first player
let playerTurn = 'X'
// created a function that determines winner when the game ends
const winCheck = function () {
  if (xValues.length === 5 && gameOver === false) {
    $('.message-box').text("It's a Draw")
  } else if (gameOver === true && turnNum % 2 !== 0) {
    $('.message-box').text('Player_X wins')
  } else if (gameOver === true) {
    $('.message-box').text('Player_O wins')
  }
}
const onNewGame = function (event) {
  const data = getFormFields(this)
  // reset all values to what it should be in a new game.
  $.each($('.box'), function (index, element) {
    $(element).text('')
  })
  turnNum = 0
  gameOver = false
  xValues = []
  oValues = []
  event.preventDefault()

  api.newGame(data)
    .then(ui.newGameSuccess)
    .catch(ui.newGameFail)
}

// create function to check if winning combo is in the array
const checkForMatch = function (valuesArray, tic, tac, toe) {
  // match arguments with valuesArray to check for winner
  if (valuesArray.indexOf(tic) !== -1 &&
    valuesArray.indexOf(tac) !== -1 &&
    valuesArray.indexOf(toe) !== -1) {
    gameOver = true
  }
}
// created funtion that controls turn taking
const turnSwitch = () => {
  const idOfPick = event.target.id
  const textValue = $(event.target).text()
  // prevent playing if game is over
  if (gameOver === true) {
    return
    // prevent inputing a value on a square the has been used already
  } else if (textValue === 'X' || textValue === 'O') {
    // determine turn by checking if turn Number is even or odd
  } else if (turnNum % 2 !== 0) {
    // add to turnNum after execution
    turnNum++
    playerTurn = 'O'
    $(event.target).text('O')
    // push the id of the targeted event to respective arrays
    oValues.push(idOfPick)
  } else {
    turnNum++
    playerTurn = 'X'
    $(event.target).text('X')
    xValues.push(idOfPick)
  }
}
// const onFindGame = function (event) {
//   const data = getFormFields(event.target).game
//   event.preventDefault()
//   console.log('this is', this)
//   api.findGame(data)
//     .then(ui.findGameSuccess)
//     .catch(ui.failure)
// }

const onUpdateGame = function (event) {
  event.preventDefault()
  // switch turns and turn off when there is a winner
  turnSwitch()
  // invoke the function to check of a winner
  checkForMatch(xValues, '1', '2', '3')
  checkForMatch(oValues, '1', '2', '3')
  checkForMatch(xValues, '1', '5', '9')
  checkForMatch(oValues, '1', '5', '9')
  checkForMatch(xValues, '1', '4', '7')
  checkForMatch(oValues, '1', '4', '7')
  checkForMatch(xValues, '4', '5', '6')
  checkForMatch(oValues, '4', '5', '6')
  checkForMatch(xValues, '7', '8', '9')
  checkForMatch(oValues, '7', '8', '9')
  checkForMatch(xValues, '2', '5', '8')
  checkForMatch(oValues, '2', '5', '8')
  checkForMatch(xValues, '3', '6', '9')
  checkForMatch(oValues, '3', '6', '9')
  checkForMatch(xValues, '7', '5', '3')
  checkForMatch(oValues, '7', '5', '3')
  // if winner is found the game is ended and a draw or winner is declared
  winCheck()
  // update api as the game is played
  const data = {
    'game': {
      'cell': {
        // api expects inputs ranging 0-8
        // my id values are ranged 1-9
        // added a - 1 to account for this
        'index': event.target.id - 1,
        'value': playerTurn
      },
      'over': gameOver
    }
  }

  api.updateGame(data)
    .then(ui.updateGameSuccess)
    .catch(ui.failure)
}

const onGameIndex = function (event) {
  event.preventDefault()
  api.gameIndex()
    .then(ui.gameIndexSuccess)
    .catch(ui.gamefailure)
}

module.exports = {
  addHandlers
}
