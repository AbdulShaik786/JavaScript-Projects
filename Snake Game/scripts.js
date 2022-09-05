
//board variables
let blockSize = 20;
let rows = 25;
let cols = 25;
let board;
let context;

//snake food
let foodX;
let foodY;

//snake head
let snakeX = blockSize* 5;
let snakeY = blockSize* 5;
let snakeBody = []

//snake speed
let velocityX = 0;
let velocityY = 0;

let gameOver = false;


window.onload = ()=>{
    board = document.getElementById("snake-board");
    board.height = rows*blockSize;
    board.width = cols*blockSize;
    context = board.getContext("2d");    //used for drawing on board

    foodPlacing();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000/10);}

function update(){
    if(gameOver){
        return;
    }

    //board
    context.fillStyle='black';
    context.fillRect(0,0,board.width,board.height);

    //food
    context.fillStyle='red';
    context.fillRect(foodX,foodY,blockSize,blockSize);


    if(snakeX==foodX && snakeY==foodY){
        snakeBody.push([foodX,foodY]);
        foodPlacing();
    }

    for(let i=snakeBody.length-1;i>0;i--){
        snakeBody[i] = snakeBody[i-1];
    }

    if(snakeBody.length){
        snakeBody[0] = [snakeX,snakeY];
    }

    //snake
    context.fillStyle="lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX,snakeY,blockSize,blockSize);

    for(let i=0;i<snakeBody.length;i++){
        context.fillRect(snakeBody[i][0],snakeBody[i][1],blockSize,blockSize);
    }

    //game-over conditions
    if(snakeX < 0 || snakeX>(cols*blockSize) || snakeY < 0 || snakeY>(rows*blockSize)){
        gameOver = true;
        alert("game over!");
    }
}

function changeDirection(e){
    if(e.code=="ArrowUp"){
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.code=="ArrowDown"){
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.code=="ArrowLeft"){
        velocityX = -1;
        velocityY = 0;
    }
    else if(e.code=="ArrowRight"){
        velocityX = 1;
        velocityY = 0;
    }
}

function foodPlacing(){
    foodX = Math.floor(Math.random()*rows) * blockSize;
    foodY = Math.floor(Math.random()*cols) * blockSize;
}