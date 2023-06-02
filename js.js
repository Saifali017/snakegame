let direction={x:0,y:0};
let speed=2;
let lasttime=0;
let isGameRunning = false;

let saudio=new Audio('.vscode/snake-hissing-6092.mp3');
let snakearr=[
    {x:13,y:15}
]
let startButton = document.getElementById('start-btn');
let resetButton = document.getElementById('reset-btn');
let gameInterval = null;
let highscr=0;
let food = {x: 6, y: 7};

let inputdir={x:0,y:1};
let score=0;
food={x:6,y:7}
let highscrbox=document.getElementsByClassName('.highscrbox');
function main(ctime){
    window.requestAnimationFrame(main);
    
   // console.log(ctime);
    if((ctime - lasttime)/1000 < 1/speed){
        return;
    }
    lasttime=ctime;
    gameengine(); 
}
function iscollide(srr){
    for(let i=1;i<snakearr.length;i++){
    if(srr[i].x === srr[0].x && srr[i].y === srr[0].y ){
        return true;
    }
}
    if(srr[0].x>=18 ||srr[0].x<=0 ||srr[0].y>=18 ||srr[0].y<=0 ){
        return true;
    }

    
}
function gameengine(){
    if(iscollide(snakearr)){
        inputdir={x:0,y:0};
        alert("game over . Press any key to play again");
        snakearr=[{x:13,y:15}];
        score=0;
    }
    if(snakearr[0].y === food.y && snakearr[0].x===food.x){
        saudio.play()
        score+=1;
        if(score> highscr){
            highscr=score;
            localStorage.setItem("highscore",JSON.stringify(highscr))
            highscrbox.innerHTML="High score : 0"+highscr;
        }
        scorebox.innerHTML="score "+score;
        snakearr.unshift({x:snakearr[0].x +inputdir.x ,y:snakearr[0].y +inputdir.y})
        let a=2;
        let b=16;
        food={x:2+Math.round(a+(b-a)* Math.random()),y:2+Math.round(a+(b-a)* Math.random())}
    }
    for(let i=snakearr.length-2;i>=0;i--){
        const element=snakearr[i];
        snakearr[i+1]={...snakearr[i]}
    }
    snakearr[0].x +=inputdir.x;
    snakearr[0].y +=inputdir.y;

  let board=document.getElementById('board');
    board.innerHTML="";
    snakearr.forEach((e,index)=>{
      let snakele=document.createElement('div');
        snakele.style.gridRowStart=e.y;
        
snakele.style.gridColumnStart = e.x;
        
        if(index===0){
          snakele.classList.add('head');  
        }
        else{
        snakele.classList.add('snake');
        }
        board.appendChild(snakele);

    });
    
    
    
   let foodele=document.createElement('div');
        foodele.style.gridRowStart=food.y;
        foodele.style.gridColumnStart = food.x;
        foodele.classList.add('food');
        board.appendChild(foodele);
}
let high=localStorage.getItem("highscore");
if(high===null){
    highscr=0;
    localStorage.setItem("highscore",JSON.stringify(highscr))
}
else{
    highscr=JSON.parse(high);
    highscrbox.innerHTML="high : 0"+high;
}
window.requestAnimationFrame(main);
function startGame() {
    if (gameInterval !== null) return;
    gameInterval = setInterval(() => {
      window.requestAnimationFrame(main);
    }, 1000 / speed);
  }
  
  function resetGame() {
    clearInterval(gameInterval);
    gameInterval = null;
    snakeArr = [{ x: 13, y: 15 }];
    inputDir = { x: 0, y: 1 };
    score = 0;
    board.innerHTML = "";
    startButton.disabled = false;
  }
  
  startButton.addEventListener('click', () => {
    startButton.disabled = true;
    resetGame();
    startGame();
  });
  
  resetButton.addEventListener('click', resetGame);
window.addEventListener('keydown',e=>{
  
    switch(e.key){
        case "ArrowUp":
            console.log("arrow up")
            inputdir.x=0 ;
            inputdir.y= -1;
            break;
        case "ArrowDown":
            console.log("arrow down")
            inputdir.x= 0;
            inputdir.y= 1;
            break;
        case "ArrowLeft":
            console.log("arrow left")
            inputdir.x= -1;
            inputdir.y= 0;
            break;
        case "ArrowRight":
            console.log("arrow right")
            inputdir.x= 1;
            inputdir.y=0 ;
            break;
    }
    
})