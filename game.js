// board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

// snke head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
var velocityX = 0;
var velocityY = 0;

var snakeBody = [];
// food
var foodX = blockSize * 10;
var FoodY = blockSize * 10;

var gameOver = false;
var score = 0;
var highScore = parseInt(localStorage.getItem("snakeHighScore")) || 0;
var restartButton;

function initGame() {
  snakeX = blockSize * 5;
  snakeY = blockSize * 5;
  velocityX = 0;
  velocityY = 0;
  snakeBody = [];
  gameOver = false;
  score = 0;
  if (document.getElementById("score")) {
    document.getElementById("score").innerText = score;
  }
  if (document.getElementById("highScore")) {
    document.getElementById("highScore").innerText = highScore;
  }
  placeFood();
  if (restartButton) {
    restartButton.style.display = 'none';
  }
}

window.onload = function () {
  board = document.getElementById("board");
  restartButton = document.getElementById("restartButton");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d");

  restartButton.addEventListener('click', function () {
    initGame();
  });

  initGame();
  document.addEventListener("keyup", changeDirection);
  setInterval(update, 1000 / 10);
};
function update() {
  if (gameOver) {
    if (restartButton) {
      restartButton.style.display = 'block';
    }
    return;
  }
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "red";
  context.fillRect(foodX, FoodY, blockSize, blockSize);
  if (snakeX == foodX && snakeY == FoodY) {
    snakeBody.push([foodX, FoodY]);
    score += 10;
    document.getElementById("score").innerText = score;
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("snakeHighScore", highScore);
      document.getElementById("highScore").innerText = highScore;
    }
    placeFood();
  }
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }
  context.fillStyle = "lime";
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }
  // conditions for game ending
  if (
    snakeX < 0 ||
    snakeX >= cols * blockSize ||
    snakeY < 0 ||
    snakeY >= rows * blockSize
  ) {
    gameOver = true;
  }
  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
    }
  }
}

function placeFood() {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  FoodY = Math.floor(Math.random() * rows) * blockSize;
}
function changeDirection(e) {
  if (e.code == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  }
  if (e.code == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  }
  if (e.code == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  }
  if (e.code == "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
}
