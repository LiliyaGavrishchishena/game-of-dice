/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var RESET_VALUE = 1;\nvar LIMIT = 100;\nvar activePlayer = 0;\nvar current = 0;\nvar diceElement1 = document.querySelector('#dice1');\nvar diceElement2 = document.querySelector('#dice2');\nvar limit = document.querySelector('#input');\n\nvar Gamer = function Gamer(name, number) {\n  this.name = name;\n  this.number = number;\n  this.score = 0;\n};\n\nGamer.prototype.setScore = function (score) {\n  this.score = score;\n};\n\nGamer.prototype.getScore = function () {\n  return this.score;\n};\n\nGamer.prototype.resetScore = function (score) {\n  this.score = score;\n};\n\nGamer.prototype.getRating = function () {\n  return localStorage.getItem(this.number);\n};\n\nGamer.prototype.setRating = function (value) {\n  localStorage.setItem(this.number, value);\n};\n\nGamer.prototype.increaseRating = function () {\n  this.setRating(this.number, +this.getRating(this.number) + 1);\n};\n\nvar players = [];\n\nvar initGame = function initGame() {\n  document.querySelector('#current-0').textContent = 0;\n  document.querySelector('#current-1').textContent = 0;\n  document.querySelector('#score-0').textContent = 0;\n  document.querySelector('#score-1').textContent = 0;\n  diceElement1.style.display = 'none';\n  diceElement2.style.display = 'none';\n  players[0] = new Gamer(prompt('First gamer, enter your name, please!'), '');\n  players[1] = new Gamer(prompt('Second gamer, enter your name, please!'), '');\n  document.querySelector('#name-0').textContent = players[0].name;\n  document.querySelector('#name-1').textContent = players[1].name;\n};\n\ninitGame(); //getDice \n\nvar getDice = function getDice() {\n  return Math.floor(Math.random() * 6) + 1;\n}; //changeDice\n\n\nvar changeDice = function changeDice(element, dice) {\n  element.src = \"dice-\".concat(dice, \".png\");\n  element.style.display = 'block';\n}; //hideDice\n\n\nvar hideDice = function hideDice() {\n  diceElement1.style.display = 'none';\n  diceElement2.style.display = 'none';\n};\n\ndocument.querySelector('.btn-roll').addEventListener('click', function () {\n  var dice1 = getDice();\n  var dice2 = getDice();\n  changeDice(diceElement1, dice1);\n  changeDice(diceElement2, dice2);\n  var limitValue = parseInt(limit.value) || LIMIT;\n\n  if ([dice1, dice2].includes(RESET_VALUE) || dice1 === dice2) {\n    changePlayer();\n    players[activePlayer].resetScore();\n  } else {\n    current += dice1 + dice2;\n    document.getElementById('current-' + activePlayer).textContent = current;\n    players[activePlayer].setScore(current);\n\n    if (players[activePlayer].getScore() >= limitValue) {\n      alert(\"Player \".concat(players[activePlayer].name, \" won!!!\"));\n      players[activePlayer].increaseRating();\n    }\n  }\n});\n\nvar changePlayer = function changePlayer() {\n  current = 0;\n  document.getElementById('current-' + activePlayer).textContent = 0;\n  document.querySelector(\".player-\".concat(activePlayer, \"-panel\")).classList.toggle('active');\n  activePlayer = +!activePlayer;\n  hideDice();\n  document.querySelector(\".player-\".concat(activePlayer, \"-panel\")).classList.toggle('active');\n};\n\ndocument.querySelector('.btn-hold').addEventListener('click', function () {\n  players[activePlayer].resetScore(+players[activePlayer].getScore() + current);\n  document.querySelector(\"#score-\".concat(activePlayer)).textContent = players[activePlayer].getScore();\n  changePlayer();\n});\ndocument.querySelector('.btn-new').addEventListener('click', function () {\n  initGame();\n});\ndocument.querySelector('.btn-rating').addEventListener('click', function () {\n  showRating();\n});\n\nfunction showRating() {\n  var rating = '';\n  players.forEach(function (player) {\n    rating += \"\".concat(player.name, \": \").concat(player.getRating());\n  });\n  alert(rating);\n}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });