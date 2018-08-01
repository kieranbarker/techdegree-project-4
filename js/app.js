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

})(window, document);
