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
// food
var foodX = blockSize * 10;
var FoodY = blockSize * 10;

window.onload = function () {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d");
  placeFood();
  document.addEventListener("keyup", changeDirection);
  //   update();
  setInterval(update, 1000 / 10); //1
};
function update() {
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "red";
  context.fillRect(foodX, FoodY, blockSize, blockSize);

  context.fillStyle = "lime";
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
}

function placeFood() {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodX = Math.floor(Math.random() * rows) * blockSize;
}
function changeDirection(e) {
  if (e.code == "ArrowUp") {
    velocityX = 0;
    velocityY = -1;
  }
  if (e.code == "ArrowDown") {
    velocityX = 0;
    velocityY = 1;
  }
  if (e.code == "ArrowLeft") {
    velocityX = -1;
    velocityY = 0;
  }
  if (e.code == "ArrowRight") {
    velocityX = 1;
    velocityY = 0;
  }
}
