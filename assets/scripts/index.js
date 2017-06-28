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
  
})


//create function to input "X" and "O" values for game
// define variable to keep track of turn
let turnNum = 0
//created empty arrays to hold the game-squares selected
const xValues = []
const oValues = []
$((ticTacToe) => {
  $('#board').on('click', function(event) {
    event.preventDefault()
    const idOfPick = event.target.id
    const textValue = $(event.target).text()
    //create function to check if winning combo is in the array

    // const checkForMatch = function (valuesArray, box1, box2, box3) {
    //   console.log(valuesArray.indexOf(box1))
    //   if (valuesArray.indexOf(box1) !== -1
    //   && valuesArray.indexOf(box2) !== -1
    //   && valuesArray.indexOf(box3) !== -1) {
    //     console.log('you win')
    //   }
    // }
    const checkForMatch = function (valuesArray) {
      if (valuesArray === ['1', '2', '3']) {
        console.log('you win')
      }
    }
    // prevent inputing a value on a square the has been used already
      if (textValue === 'X' || textValue === 'O') {
        console.log('pick a valid square')
    // determine turn by checking if turn Number is even or odd
    } else if (turnNum % 2 !== 0) {
    // add to turnNum after execution
        turnNum++
        $(event.target).text('O')
    // push the id of the targeted event to respective arrays
        oValues.push(event.target.id)
        console.log(oValues)
    } else {
        turnNum++
        $(event.target).text('X')
        xValues.push(idOfPick)
        console.log(xValues)
        console.log(event.target)
      }
      //invoke the function to check of a winner
      checkForMatch(xValues)
      checkForMatch(oValues)

  })
})

//make a variable for an array of an array winning combination of id numbers
const winningNumbers = [[1,2,3], [1,5,9], [1,4,7]]
