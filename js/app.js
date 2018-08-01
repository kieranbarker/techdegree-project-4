/*!
 * Immediately Invoked Function Expression Boilerplate
 * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
 */
;(function (window, document, undefined) {

  'use strict';

  // Set the active player (true when X, false when O)
  var activePlayer = false;

  // Select the boxes
  var boxes = document.querySelectorAll('.boxes > .box')

  // Get an element (or return a dummy element if it doesn't exist)
  var getElem = function (selector) {
    return document.querySelector(selector) || document.createElement('_');
  };

  // Reset the board back to its original state
  var resetGame = function () {

    // Set the boxes back to normal
    boxes.forEach(function (box) {
      box.className = 'box';
    });

    // Set the active player back to O
    activePlayer = false;
    getElem('#player1').classList.add('active')
    getElem('#player2').classList.remove('active')

    // Set the end screen back to normal
    getElem('#finish').className = 'screen screen-win is-hidden';

  };

  // Show the game board and hide the other screens
  var startGame = function (event) {

   if (event.target.matches('[data-new-game]')) {

     // Prevent default link behavior
     event.preventDefault();

     // Reset the board if the game has finished
     if (event.target.matches('#finish .button')) {
       resetGame();
     }

     // Hide the other screens
     getElem('.screen-start').classList.add('is-hidden');
     getElem('#finish').classList.add('is-hidden');

     // Show the board
     getElem('.board').classList.remove('is-hidden');

   }

  };

  document.addEventListener('click', function (event) {
    startGame(event);
  }, false);

})(window, document);
