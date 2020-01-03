// konstanta
const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");
const ground = new Image();
ground.src = "img/ground.png";
const foodImg = new Image();
foodImg.src = "img/food.png";
const box = 32;
const kecepatan = 200;

// variabel
let score = 0;
let snake = [];
let arahGerak = "";
let posisiKepala = "aman";
let newHead;
let deadAudio = new Audio("audio/dead.mp3");
let eatAudio = new Audio("audio/eat.mp3");
let downAudio = new Audio("audio/down.mp3");
let leftAudio = new Audio("audio/left.mp3");
let rightAudio = new Audio("audio/right.mp3");
let upAudio = new Audio("audio/up.mp3");
snake[0] = {
    x: 9 * box,
    y: 10 * box
}
let food = {
    x: 9 * box,
    y: 4 * box
}

// variabel debug
var text = "ganti";
var tulis = document.getElementById("p");
var makan = document.getElementById("makanan");

let game = setInterval(gameLoop, kecepatan);
let pencet = document.addEventListener("keydown", direction);    

// Function
function gameLoop() {

    // text += "<br>";
    // text += ((food.x / box) + " " + (food.y / box) + " -- " + 
    //         (snake[0].x/box) + " " + (snake[0].y)/box); // debug position food
    // text += (cekPosisiKepala())
    makan.innerHTML = text;
    
    drawBackground();
    // ruler(); //for debug
    drawSnake();
    spawnFood();
    drawScore();
    move();


}

function drawBackground() {
    ctx.drawImage(ground, 0, 0);
}

function ruler() {
    for (let i = 0; i < 19; i++) {
        ctx.fillStyle = "black";
        ctx.fillRect(i * box, 0 * box, box, box);
        ctx.fillStyle = "white";
        ctx.font = "30px Changa one";
        ctx.fillText(i, i * box, 1 * box);
    }
    for (let i = 0; i < 19; i++) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, i * box, box, box);
        ctx.fillStyle = "white";
        ctx.font = "30px Changa one";
        ctx.fillText(i, 0, (i + 1) * box);
    }
}

function drawSnake() {
    for (let i = snake.length - 1; i >= 0; i--) {
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "green";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
}

function spawnFood() {
    let foodX = food.x;
    let foodY = food.y;
    while(isFoodHitSnake()){
        foodX = Math.floor(Math.random() * 17 + 1) * box;
        foodY = Math.floor(Math.random() * 15 + 3) * box;
    }
    food.x = foodX;
    food.y = foodY;
    ctx.drawImage(foodImg, food.x, food.y);

    function isFoodHitSnake() {
        for (let i = 0; i < snake.length; i++)
            if(foodX == snake[i].x && foodY == snake[i].y)
                return true;
        return false;
    }
}

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    score = snake.length - 1;
    ctx.fillText(score, 2 * box, 1.7 * box);
}

function direction(event) {
    
    if (event.keyCode == 37 && arahGerak != "kanan") {
        arahGerak = "kiri";
        leftAudio.play();
    }
    else if (event.keyCode == 38 && arahGerak != "bawah") {
        arahGerak = "atas";
        upAudio.play();
    }
    else if (event.keyCode == 39 && arahGerak != "kiri") {
        arahGerak = "kanan";
        rightAudio.play();
    }
    else if (event.keyCode == 40 && arahGerak != "atas") {
        arahGerak = "bawah";
        downAudio.play();
    }
}

function move() {
    newHead =  findNextMove();
    // text += " " + newHead.x/box +" " + newHead.y / box;
    posisiKepala = cekPosisiKepala();
    // window.alert(posisiKepala);
    // text += " " + posisiKepala;
    if (posisiKepala == "aman") {
        snake.pop();
        snake.unshift(newHead);
    }
    else if (posisiKepala == "makan") {
        
        snake.unshift(newHead);
        spawnFood();
        eatAudio.play();
    }
    else {
        snake.pop();
        snake.unshift(newHead);
        drawSnake();
        deadAudio.play();
        clearInterval(game);
        // snake.unshift(newHead);
    }

    function findNextMove() {
        let tmpHead = {
            x: snake[0].x,
            y: snake[0].y
        };
        if (arahGerak == "atas")
            tmpHead.y -= box;
        else if (arahGerak == "bawah")
            tmpHead.y += box;
        else if (arahGerak == "kiri")
            tmpHead.x -= box;
        else if (arahGerak == "kanan")
            tmpHead.x += box;
        
        
        return tmpHead;
    }

}
function cekPosisiKepala() {
    if (newHead.x == food.x && newHead.y == food.y) {
        return "makan";
    }
    else if (newHead.x / box <= 0 || newHead.x / box >= 18 || newHead.y / box <= 2 || newHead.y / box >= 18) {
        return "keluar";
    }
    else if(collision()){
        return "keluar";
    }
    else {
        return "aman";
    }
}

function collision() {
    for(let i = 1; i < snake.length - 1; i++){
        if(snake[i].x == newHead.x && snake[i].y == newHead.y)
            return true;
    }
    return false;
}
