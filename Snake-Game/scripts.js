
//board variables
let blockSize = 15;
let rows = 25;
let cols = 25;
let board;
let context;

//score
let scoreDisplay = document.getElementById("score");
let score = 0;

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
    setInterval(update, 1000/10);
}

function update(){
    if(gameOver){
        return;
    }
    scoreDisplay = document.getElementById("score");
    scoreDisplay.textContent = score;
        //board
    context.fillStyle='black';
    context.fillRect(0,0,board.width,board.height);

    //food
    context.fillStyle='cyan';
    context.fillRect(foodX,foodY,blockSize,blockSize);


    if(snakeX==foodX && snakeY==foodY){
        score++;
        snakeBody.push([foodX,foodY]);
        foodPlacing();
    }

    for(let i=snakeBody.length-1;i>0;i--){
        snakeBody[i] = snakeBody[i-1];
    }

    // appending the body of snake
    if(snakeBody.length){
        snakeBody[0] = [snakeX,snakeY];
    }

    //snake
    context.fillStyle="red";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX,snakeY,blockSize,blockSize);

    for(let i=0;i<snakeBody.length;i++){
        context.fillRect(snakeBody[i][0],snakeBody[i][1],blockSize,blockSize);
    }
    gameOverCheck();
}

function gameOverCheck(){
        //game-over conditions // if touches borders of board
        if(snakeX < 0 || snakeX>(cols*blockSize) || snakeY < 0 || snakeY>(rows*blockSize)){
            gameOver = true;
            score = 0;
            alert("game over!");
        }
        
        //if touches its own body
        for(let i=0;i<snakeBody.length;i++){
            if(snakeX==snakeBody[i][0] && snakeY==snakeBody[i][1]){
                gameOver = true;
                score=0;
                alert("game over!");
            }
        }
}
function changeDirection(e){
    if(e.code=="ArrowUp"|| e.code=='KeyW'){
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.code=="ArrowDown" || e.code=='KeyS'){
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.code=="ArrowLeft" || e.code=='KeyA'){
        velocityX = -1;
        velocityY = 0;
    }
    else if(e.code=="ArrowRight" || e.code=='KeyD'){
        velocityX = 1;
        velocityY = 0;
    }
}

function foodPlacing(){
    foodX = Math.floor(Math.random()*rows) * blockSize;
    foodY = Math.floor(Math.random()*cols) * blockSize;
}