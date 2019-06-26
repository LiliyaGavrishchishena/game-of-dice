const RESET_VALUE = 1;
const LIMIT = 100;

let activePlayer = 0;
let current = 0;

const diceElement1 = document.querySelector('#dice1');
const diceElement2 = document.querySelector('#dice2');
const limit = document.querySelector('#input');

let Gamer = function(name, number) {
  this.name = name;
  this.number = number;
  this.score = 0;
};

Gamer.prototype.setScore = function(score) {
    this.score = score;
};

Gamer.prototype.getScore = function() {
  return this.score;
};

Gamer.prototype.resetScore = function(score) {
  this.score = score;
};

Gamer.prototype.getRating = function() {
  return localStorage.getItem(this.number);
};

Gamer.prototype.setRating = function(value) {
  localStorage.setItem(this.number, value);
};

Gamer.prototype.increaseRating = function() {
  this.setRating(this.number, +this.getRating(this.number) + 1);
};

let players = [];

const initGame = () => {
  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;
  document.querySelector('#score-0').textContent = 0;
  document.querySelector('#score-1').textContent = 0;
  diceElement1.style.display = 'none';
  diceElement2.style.display = 'none';
  players[0] = new Gamer(prompt('First gamer, enter your name, please!'), '');
  players[1] = new Gamer(prompt('Second gamer, enter your name, please!'), '');
  document.querySelector('#name-0').textContent = players[0].name;
  document.querySelector('#name-1').textContent = players[1].name;
};

initGame();

//getDice 
const getDice = () => {
  return Math.floor(Math.random() * 6) + 1;
};

//changeDice
const changeDice = (element, dice) => {
  element.src = `dice-${dice}.png`;
  element.style.display = 'block';
};

//hideDice
const hideDice = () => {
  diceElement1.style.display = 'none';
  diceElement2.style.display = 'none';
};

document.querySelector('.btn-roll').addEventListener('click', function() {

  let dice1 = getDice();
  let dice2 = getDice();
  
  changeDice(diceElement1, dice1);
  changeDice(diceElement2, dice2);

  let limitValue = parseInt(limit.value) || LIMIT;

  if ([dice1, dice2].includes(RESET_VALUE) || dice1 === dice2) {
    changePlayer();
    players[activePlayer].resetScore();
  } else {
    current += dice1 + dice2;
    document.getElementById('current-'+activePlayer).textContent = current;
    players[activePlayer].setScore(current);

    if (players[activePlayer].getScore() >= limitValue) {
      alert(`Player ${players[activePlayer].name} won!!!`);

      players[activePlayer].increaseRating();
    }
  }
});

const changePlayer = () => {
  current = 0;
  document.getElementById('current-' + activePlayer).textContent = 0;
  document
    .querySelector(`.player-${activePlayer}-panel`)
    .classList.toggle('active');
  activePlayer = +!activePlayer;
  hideDice();

  document
    .querySelector(`.player-${activePlayer}-panel`)
    .classList.toggle('active');
};

document.querySelector('.btn-hold').addEventListener('click', function() {
  players[activePlayer].resetScore(+players[activePlayer].getScore() + current);
  document.querySelector(`#score-${activePlayer}`).textContent = players[activePlayer].getScore();
  changePlayer();
});

document.querySelector('.btn-new').addEventListener('click', function() {
  initGame();
});

document.querySelector('.btn-rating').addEventListener('click', function() {
  showRating();
});

function showRating() {
  let rating = '';

  players.forEach(function (player) {
    rating += `${player.name}: ${player.getRating()}`;
  });

  alert(rating);
}