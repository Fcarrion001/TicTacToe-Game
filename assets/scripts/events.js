'use strict'

const store = require('./store')
const getFormFields = require('../../lib/get-form-fields')

// const newGameTemplate =

const api = require('./api')
const ui = require('./ui')

let turnNum = 0
let gameOver = false
// created empty arrays to hold the game-squares selected
const xValues = []
const oValues = []
let playerTurn = 'X'
// made a function to be invoked when clicking submit in the sign-up section
const onSignUp = function (event) {
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
  $('#new-game').on('submit', onNewGame)
  $('#game-index').on('submit', onGameIndex)
  // $('#find-game').on('submit', onFindGame)
  $('#board').on('click', onUpdateGame)
}

const onSignIn = function (event) {
  const data = getFormFields(this)
  console.log('this is ', this)
  console.log(data)
  event.preventDefault()
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signUpFailure)
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

const onSignOut = function(event) {
  const data = getFormFields(this)
  event.preventDefault()
  console.log(data)
  console.log(this)
  api.signOut(data)
}

const onNewGame = function (event) {
  const data = getFormFields(this)
  $.each($('.box'), function (index, element) {
    $(element).text('')
  })
  turnNum = 0
  event.preventDefault()
  console.log('this is store:', store)
  console.log(event)
  console.log(this)
  api.newGame(data)
    .then(ui.newGameSuccess)
    .catch(ui.newGameFail)
}

const onGameIndex = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  console.log(data)
  console.log(this)
  api.gameIndex()
    .then(ui.gameIndexSuccess)
    .catch(ui.gamefailure)
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
  const idOfPick = event.target.id
  const textValue = $(event.target).text()
  // create function to check if winning combo is in the array

  const checkForMatch = function (valuesArray, tic, tac, toe) {
    // make an array of arrays with winning combination of squares
    const winningNumbers = [
      [1, 2, 3],
      [1, 5, 9],
      [1, 4, 7],
      [4, 5, 6],
      [7, 8, 9],
      [2, 5, 8],
      [3, 6, 9],
      [7, 5, 3]
    ]
    // loop through winningNumbers and assign the indexes of the arrays to
    // arguments
    // for (let i = 0; i < winningNumbers.length; i++) {
    //  console.log('this is tic', winningNumbers[i][0])
    //  console.log('this is tac', winningNumbers[i][1])
    //  console.log('this is toe', winningNumbers[i][2])
    //
    // let tic = winningNumbers[i][0]
    // let tac = winningNumbers[i][1]
    // let toe = winningNumbers[i][2]
    // match arguments with valuesArray to check for winner
    if (valuesArray.indexOf(tic) !== -1 &&
      valuesArray.indexOf(tac) !== -1 &&
      valuesArray.indexOf(toe) !== -1) {
      gameOver = true
    } else if (xValues.length === 5 ) {
      gameOver = true
      console.log('Its a draw')
    }
  }

  console.log('this is turnNum', turnNum)
  // prevent inputing values if game has ended
  if (gameOver === true) {
    return
    // prevent inputing a value on a square the has been used already
  } else if (textValue === 'X' || textValue === 'O') {
    console.log('pick a valid square')
    // determine turn by checking if turn Number is even or odd
  } else if (turnNum % 2 !== 0) {
    // add to turnNum after execution
    turnNum++
    playerTurn = 'O'
    $(event.target).text('O')
    // push the id of the targeted event to respective arrays
    oValues.push(event.target.id)
    console.log('this is oValues', oValues)
  } else {
    turnNum++
    playerTurn = 'X'
    $(event.target).text('X')
    xValues.push(idOfPick)
    console.log('this is xValues', xValues)
    console.log('this is event.target', event.target)
  }

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
  endGame()
  const data = {
    'game': {
      'cell': {
        'index': event.target.id - 1,
        'value': playerTurn
      },
      'over': gameOver
    }
  }
  console.log('game is ', data)
  api.updateGame(data)
    .then(ui.updateGameSuccess)
    .catch(ui.failure)
}

const endGame = function () {
  if (gameOver === true && turnNum !== 0) {
    console.log('gameover')
    console.log('player_x wins')
  } else if (gameOver === true) {
    console.log('gameover')
    console.log('player_o wins')
  }
}

module.exports = {
  addHandlers
}
