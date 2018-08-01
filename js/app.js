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

  // Check if a box has been claimed
  var isClaimed = function (event) {

    var isClaimed = event.target.classList.contains('box-filled-1') || event.target.classList.contains('box-filled-2');

    return isClaimed;

  };

  // Set the hover image depending on the active player
  var setHoverImg = function (event) {

    if (event.target.matches('.box') && !isClaimed(event)) {

      // Get the image to use
      var hoverImg = activePlayer ? 'img/x.svg' : 'img/o.svg';

      // Show the image when the user hovers over the box
      event.target.style.backgroundImage = 'url("' + hoverImg + '")';

    }

  };

  // Remove the hover image when the user stops hovering over a box
  var removeHoverImg = function (event) {

    if (event.target.matches('.box') && event.target.style.backgroundImage) {
      event.target.style.backgroundImage = '';
    }

  };

  // Claim a box when clicked
  var claimBox = function (event) {

    // Get the image class based on the active player
    var imgClass = activePlayer ? 'box-filled-2' : 'box-filled-1';

    // Add the image class to the box that was clicked
    event.target.classList.add(imgClass);

  };

  // Update the active player
  var updateActivePlayer = function () {

    if (activePlayer) {
      getElem('#player1').classList.add('active');
      getElem('#player2').classList.remove('active');
    } else {
      getElem('#player1').classList.remove('active');
      getElem('#player2').classList.add('active');
    }

    activePlayer = !activePlayer;

  };

  // Check if all boxes have been filled in
  var isComplete = function () {
    return document.querySelectorAll('.boxes > [class*="box-filled-"]').length === 9;
  };

  // Check for a win
  var isWinner = function (boxes) {

    // Winning combinations
    var winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    var isWinner = winningCombos.filter(function (combo) {

      // Get the boxes from the NodeList
      var firstBox = boxes[combo[0]];
      var secondBox = boxes[combo[1]];
      var thirdBox = boxes[combo[2]];

    	// Make sure the boxes exist
    	if (!firstBox || !secondBox || !thirdBox) return false;

      // Check if the boxes have been filled in and they match
      var isFirstBoxMarked = /box-filled-/.test(firstBox.className);
      var areBoxesTheSameValue = firstBox.className === secondBox.className && firstBox.className === thirdBox.className;

      // Return true or false depending on these conditions
      return isFirstBoxMarked && areBoxesTheSameValue;

    });

    // Return the winner (or false if there isn't one)
    return (isWinner.length > 0 ? boxes[isWinner[0][0]].className.replace('box box-filled-', '') : false);

  };

  // Hide the board and show the end screen
  var endGame = function (event) {

    getElem('.board').classList.add('is-hidden');
    getElem('#finish').classList.remove('is-hidden');

  };

  // Take player turn when a box is clicked
  var takeTurn = function (event) {

    if (event.target.matches('.box') && !isClaimed(event)) {

      // Claim the box and update the active player
      claimBox(event);
      updateActivePlayer();

      // Check for a win/tie
      if (isWinner(boxes)) {

        var winner = isWinner(boxes);

        if (winner === '1') {
          getElem('#finish').classList.add('screen-win-one');
        } else if (winner === '2') {
          getElem('#finish').classList.add('screen-win-two');
        }

        getElem('.message').textContent = 'Winner';

        endGame();

      } else if (isComplete() && !isWinner(boxes)) {

        getElem('#finish').classList.add('screen-win-tie');
        getElem('.message').textContent = 'It\'s a Tie!';
        endGame();

      }

    }

  };

  document.addEventListener('click', function (event) {
    startGame(event);
  }, false);

})(window, document);
