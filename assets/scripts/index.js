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



//create function to input "X" and "O" values for game
// define variable to keep track of turn
let turnNum = 0

$((ticTacToe) => {
  $('#board').on('click', function(event) {
    event.preventDefault()
    const textValue = $(event.target).text()
    // prevent inputing a value on a square the has been used already
      if (textValue === 'X' || textValue === 'O') {
      console.log('pick a valid square')
    } else if (turnNum % 2 !== 0) {
        turnNum++
        $(event.target).text('O')
    } else {
        turnNum++
        $(event.target).text('X')

      }
  })
})
