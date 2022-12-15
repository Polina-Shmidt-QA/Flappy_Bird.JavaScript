let  cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

//создание обьектов
// let ready = new Image(120,60);      //начало игры
let bird = new Image();          //птичка
let bg = new Image();            //задний фон
let fg = new Image();            //передний фон
let pipeUp = new Image();        //препятствие сверху
let pipeBottom = new Image();    //препятствие снизу
let boomI = new Image(60, 31);         // бум

//переменная пауза
let paused = false;

//подключил изображеня к обьектам
// ready.src ="img/ready.png"; //начало игры
bird.src ="img/bird.png";
bg.src ="img/bg.png";
fg.src ="img/fg.png";
pipeUp.src ="img/pipeUp.png";
pipeBottom.src ="img/pipeBottom.png";
boomI.src = "img/boomI.png";

let gap = 120;

//звуковые файлы
let fly = new Audio();
let scoreAudio = new Audio();
let boomS = new Audio();
fly.src = "audio/fly.mp3";
scoreAudio.src = "audio/score.mp3";
boomS.src = "audio/boomS.mp3";



document.addEventListener("keydown", move);

//Функция реакции на клавиши
function move(e){
    switch (e.code){
        case 'ArrowUp':      //вверх
            yPos -= 30;
            fly.play();
            break;
        case 'ArrowRight':   //вправо
            ArrowRight();
            break;
        case 'ArrowLeft':    //влево
            ArrowLeft();
            break;
        case 'ArrowDown':    //вниз
            yPos += 25;
            fly.play();
            break;
        case 'Space':       //пауза на пробел
            togglePause();
            break;
    }
}

//пауза
function togglePause(){
    paused = !paused;
    draw();
}

//движение влево
function ArrowLeft(){
    let left = 10 + bird.width;
    if (xPos >= left){
        xPos -= 25;
        fly.play();
    } else {
        xPos = 10;
    }
}

//движение вправо
 function ArrowRight(){
     let right = cvs.width - bird.width;
     if (xPos < right){
         xPos += 50;
         fly.play();
     } else {
            xPos = right;
     }
}


// создание блоков
let pipe = [];
pipe[0] = {
    x : cvs.width,
    y : 0
}


//позиция птички
let xPos = 10;
let yPos = 200;
let grav = 1.5;
let score = 0;
let life = 30;

// //Позиция начало игры
// let xPos = 144;
// let yPos = 256;



function draw () {
    // ctx.drawImage(ready, 144, 256); //картинка начала игры
    ctx.drawImage(bg, 0, 0);
    for (let i = 0; i < pipe.length; i++)
    {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
        pipe[i].x--;


        if (pipe[i].x === 90) {
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            })
        }
//отслеживание прикосновнений
        if (xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
                || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
            || yPos + bird.height >= cvs.height - fg.height)
        {

//уменьшение жизни
        life--;
        // life = 3; life < 3; life--;
        ctx.drawImage(boomI, xPos, yPos - bird.height, 120, 62);
        boomS.play();
        if (!life){
                alert("GAME OVER");
                location.reload(); //перезагрузка экрана
        }

    }

//Увеличение счетчика
        if (pipe[i].x === 5){
            score++;
            scoreAudio.play();
        }
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);
    yPos += grav;
    if (xPos > 10) {
        xPos--;
    }


//Вывод счета
    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Счет " + score, 10, cvs.height - 20);

//Вывод жизней
    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Жизни " + life, 10, cvs.height - 60);


    if (!paused) {
        requestAnimationFrame(draw);
    }
}


pipeBottom.onload = draw;