const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

// create the unit
const box = 32;

// load image
const ground =  new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

//create snake
let snake = [];
snake[0] = {
    x : 9 * box,
    y : 10 * box
}

let food = {
    // do {
        x : Math.floor(Math.random() * 17 + 1) * box,
        y : Math.floor(Math.random() * 15 + 3) * box
        
    // } while (!(this.x));
}

// create score
let score = 0;


// arak gerak ular
let d = "atas";
let kondisi = "aman";


function direction(event){
    if(event.keyCode == 37 && d != "kanan"){
        d = "kiri";
    }
    else if(event.keyCode == 38 && d != "bawah"){
        d = "atas";
    }
    else if(event.keyCode == 39 && d != "kiri"){
        d = "kanan";
    }
    else if(event.keyCode == 40 && d != "atas"){
        d = "bawah";
    }
}


//gambar background
let game = setInterval(draw,300);
var text = "ganti";
var tulis = document.getElementById("p");
var makan = document.getElementById("makanan");

function draw(){
    ctx.drawImage(ground, 0,0);
    document.addEventListener("keydown", direction);    
    // for(let i=0; i<19; i++){
    //     ctx.fillStyle = "black";
    //     ctx.fillRect(i*box, 0*box, box,box);
    //     ctx.fillStyle = "white";
    //     ctx.font = "30px Changa one";
    //     ctx.fillText(i,i*box, 1*box);
    // }
    // for(let i=0; i<19; i++){
    //     ctx.fillStyle = "black";
    //     ctx.fillRect(0, i*box, box,box);
    //     ctx.fillStyle = "white";
    //     ctx.font = "30px Changa one";
    //     ctx.fillText(i,0, (i+1)*box);
    // }

    


    for(let i = 0; i<snake.length; i++){
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    ctx.drawImage(foodImg, food.x, food.y);
    
    //tulis score
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2*box, 1.7*box);
    
    // text += snake.length + "<br>";
    text =  ((food.x / box) + " " + (food.y / box));
    makan.innerHTML = text;

    // ular bergerak
    newHead = {
        x : snake[0].x,
        y : snake[0].y
    }
    if(d == "atas")
        newHead.y-= box;
    else if(d == "bawah")
        newHead.y += box;
    else if(d == "kiri")
        newHead.x -= box;
    else if(d == "kanan")
        newHead.x += box;
    
    kondisi = cekKondisi();

    if(kondisi == "aman"){
        // tulis.innerHTML = "masuk";
        snake.pop();
        snake.unshift(newHead);
    }
    else if(kondisi == "makan"){
        snake.unshift(newHead);
    }
    else{
        tulis.innerHTML = kondisi;
    }
}

function cekKondisi(){
    if(snake[0].x == food.x && snake[0].y == food.y){
        return "makan";
    }
    else if(snake[0].x/box <= 0 || snake[0].x/box >=18 || snake[0].y/box<=2 || snake[0].y/box>=18){
        return "keluar";
    }
    else{
        return "aman";
    }
}
