let inputDir = {x: 0, y: 0};
const foodSound = new Audio('./music/food.mp3');
const gameOverSound = new Audio('./music/gameover.mp3');
const moveSound = new Audio('./music/move.mp3');
const musicSound = new Audio('./music/music.mp3'); 
let speed =9;
let score =0;
let lastPaintTime = 0;
let snakeArr = [
    {x : 13, y: 15} 
];//head of the snake
food = {x : 6, y: 7};

// game functions
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);

    // so this if condition is true render will be stopped . so basically will be able to slowed down the render
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();

}
function isCollide(snake ){
    // if snake hit its own body
    for (let i= 1; i < snakeArr.length; i++)
        {
            if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
                return true;
            }
        }

    // snake hit the wall
    if(snake[0].x >=18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
    return false;
}



function gameEngine(){
    // part1: updating the snake array and food.
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x: 0, y: 0};
        alert("Game Over. press any key to restart");
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0;
    }

    // if the snake had the food increment the score and regenerate the food
        
    // the below if condition says that if the sake head and the food get in contact
if(snakeArr[0].y === food.y && 
    snakeArr[0].x === food.x){

    foodSound.play();
    score += 1;
    if (score>hiscoreval){
        hiscoreval = score;
        localStorage.setItem("highscore", JSON.stringify(hiscoreval));
        hiscoreBox.innerHTML = "Hiscore:" + hiscoreval;
    }
    scoreBox.innerHTML ="score" + score;

    // if the  snake had eaten the food increment the snake body 
    snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y
    });

    // randomly generate food between grid 2 and grid 16 ( a and b)
    let a = 2;
    let b = 16;
    food ={x: Math.round(a + (b -a)* Math.random()),y: Math.round(a+ (b-a)* Math.random())}
}


    // moving the snake
    for(let i = snakeArr.length - 2; i>=0; i--){
        snakeArr[i+1] = {...snakeArr[i]}; 
        //{...snakeArr[i]} creates a new object or array with the same properties or elements as snakeArr[i]. The new object or array is assigned to snakeArr[i+1].
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //part2: displaying the snake and food

    //display  thee snake
    board.innerHTML = ""; // snake head
    // code for displaying the head part when page load;
    snakeArr.forEach((e , index) =>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head')
        }
        else{
            snakeElement.classList.add('snake') 
            // we are creating a class to add css 
        }
        board.appendChild(snakeElement);
    });

    //display the food

        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food') 
        // we are creating a class to add css 
        board.appendChild(foodElement);

}


// game main logic

musicSound.play();
        // for high score
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "hiscore:" + hiscore;
}


window.requestAnimationFrame(main);
//when keyboard button is pressed
window.addEventListener('keydown', e =>{
    inputDir ={x: 0, y: 1} // when keyboard button is pressed the snake will start moving down.
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;  
            
        default:
            break;
    }
});