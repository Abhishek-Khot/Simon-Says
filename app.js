let gameSeq =[];
let userSeq = [];

let highestScore = 0;
let btns =["yellow","green","red","purple"];

let start =false;//track that the game start only once
let level =0;
// we can add the event listener on the document 
document.addEventListener("keypress",function(){
    if(start == false){
        // console.log("The game is started");
        start = true;//the start become the true so only once the condition is true;

        levelUp();

    }
});
function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}
function gameflash(btn){
    btn.classList.add("gameflash");
    setTimeout(function(){
        btn.classList.remove("gameflash");
    },250);
}
// access the h2 to change the level
let h2 = document.querySelector("h2");
function levelUp(){
    userSeq = [];//to set the sequcence to empty so that user can enter from start (after levelup)
    level++;
    h2.innerText =`Level ${level}`;


    // choose the random button(from 0 to 3)(so four numbers are generated 0 1 2 3)
    let randomIdx = Math.floor(Math.random()*4);
    let randomColor = btns[randomIdx];
    gameSeq.push(randomColor);
    let randomBtn = document.querySelector(`.${randomColor}`);///this class refer that button⁡​
    // then button is flashed
    gameflash(randomBtn);
}
function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }
    else{
        highestScore = Math.max(highestScore,level);
        h2.innerHTML =`Game Over! Your score was <b>${level}</b><br>Press any key to start <br> All time highest is ${highestScore}`;
        //after the wrong seq screen will get red
        let body = document.querySelector("body");
        body.style.backgroundColor = "red";
        setTimeout(function(){
            body.style.backgroundColor = "white";
        },150);
        reset();
    }
}
function btnPressed(){
    let btn = this;
    userflash(btn);
    let usercolor = btn.getAttribute("id");
    userSeq.push(usercolor);

    checkAns(userSeq.length -1);//pass last index to match
}
let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPressed);
}


// reset function if the sequence is wrong
function reset(){
    start = false;
    gameSeq =[];
    userSeq =[];
    level =0;
}

