// board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

// snke head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

// food
var foodX = blockSize * 10;
var FoodY = blockSize * 10;

window.onload = function () {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d");
  placeFood()
  update();
};
function update() {
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "lime";
  context.fillRect(snakeX, snakeY, blockSize, blockSize);

  context.fillStyle = "red";
  context.fillRect(foodX, FoodY, blockSize, blockSize);
}

function placeFood(){
     foodX = Math.floor(Math.random() * cols)* blockSize
     foodX = Math.floor(Math.random() * rows)* blockSize
}