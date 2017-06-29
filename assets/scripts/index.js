'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')

$(() => {
  setAPIOrigin(location, config)
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
const events = require('./events.js')

$(() => {
  events.addHandlers()
})


//create function to input "X" and "O" values for game
// define variable to keep track of turn
let turnNum = 0
let gameOver = false
//created empty arrays to hold the game-squares selected
const xValues = []
const oValues = []
$(() => {
  $('#board').on('click', function(event) {
    event.preventDefault()
    const idOfPick = event.target.id
    const textValue = $(event.target).text()
    //create function to check if winning combo is in the array

    const checkForMatch = function (valuesArray, tic, tac, toe) {
      // make an array of arrays with winning combination of squares
      const winningNumbers = [[1, 2, 3], [1, 5, 9], [1, 4, 7], [4, 5, 6],
                              [7, 8, 9], [2, 5, 8], [3, 6, 9], [7, 5, 3]]
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
      if (valuesArray.indexOf(tic) !== -1
          && valuesArray.indexOf(tac) !== -1
          && valuesArray.indexOf(toe) !== -1) {
        console.log('you win')
        gameOver = true
      }
    }


    // prevent inputing values if game has ended
      if (gameOver === true) {
        console.log('gameover')
        return
    // prevent inputing a value on a square the has been used already
    }  else if (textValue === 'X' || textValue === 'O') {
        console.log('pick a valid square')
    // determine turn by checking if turn Number is even or odd
    } else if (turnNum % 2 !== 0) {
    // add to turnNum after execution
        turnNum++
        $(event.target).text('O')
    // push the id of the targeted event to respective arrays
        oValues.push(event.target.id)
        console.log('this is oValues', oValues)
    } else {
        turnNum++
        $(event.target).text('X')
        xValues.push(idOfPick)
        console.log('this is xValues', xValues)
        console.log('this is event.target', event.target)
      }
    
      //invoke the function to check of a winner
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

  })
})
