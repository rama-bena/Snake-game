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


// Function
function gameLoop() {

    text = ((food.x / box) + " " + (food.y / box)); // debug position food
    makan.innerHTML = text;
    document.addEventListener("keydown", direction);
    
    
    drawBackground();
    ruler(); //for debug
    drawSnake();
    spawnFood();
    drawScore();
    move();
}

function move() {
    newHead =  findNextMove();
    posisiKepala = cekPosisiKepala();
    
    if (posisiKepala == "aman") {
        // tulis.innerHTML = "masuk";
        snake.pop();
        snake.unshift(newHead);
    }
    else if (posisiKepala == "makan") {
        newFood();
        snake.unshift(newHead);
    }
    else {
        tulis.innerHTML = posisiKepala;
    }
}

function findNextMove() {
    tmpHead = {
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

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    score = snake.length - 1;
    ctx.fillText(score, 2 * box, 1.7 * box);
}

function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "green";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
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

function direction(event) {
    // tulis.innerHTML = "bisa";
    if (event.keyCode == 37 && arahGerak != "kanan") {
        arahGerak = "kiri";
    }
    else if (event.keyCode == 38 && arahGerak != "bawah") {
        arahGerak = "atas";
    }
    else if (event.keyCode == 39 && arahGerak != "kiri") {
        arahGerak = "kanan";
    }
    else if (event.keyCode == 40 && arahGerak != "atas") {
        arahGerak = "bawah";
    }
}

function cekPosisiKepala() {
    if (snake[0].x == food.x && snake[0].y == food.y) {
        return "makan";
    }
    else if (snake[0].x / box <= 0 || snake[0].x / box >= 18 || snake[0].y / box <= 2 || snake[0].y / box >= 18) {
        return "keluar";
    }
    else {
        return "aman";
    }
}

function spawnFood() {
    ctx.drawImage(foodImg, food.x, food.y);
}

function newFood() {

    food.x = Math.floor(Math.random() * 17 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 3) * box;
}