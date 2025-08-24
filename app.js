let gameSeq = [];
let userSeq = [];
let clrs = ["green", "red", "yellow", "blue"];
let started = false;
let level = 0, highestScore = 0;
let h2 = document.querySelector("h2");
let body = document.querySelector("body");

document.addEventListener("keypress", function() {
    if (!started) {
        console.log("Game Started");
        started = true;
        setTimeout(levelUp, 250);
    }
});

function levelUp() {
    userSeq = [];
    level++;
    if (level > highestScore) {
        highestScore = level;
    }
    h2.innerHTML = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randCol = clrs[randIdx];
    let btn = document.getElementById(randCol);
    gameSeq.push(randCol);
    console.log("Game Sequence:", gameSeq);
    btnFlash(btn);
}

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function btnPress() {
    let userCol = this.getAttribute("id");
    userSeq.push(userCol);
    btnFlash(this);
    getAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".clr");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function getAns(idx) {
    if (gameSeq[idx] === userSeq[idx]) {
        if (gameSeq.length === userSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your Score: <b>${level}</b> <br> Highest Score: <b>${highestScore}</b><br>Press Any Key to Start.`;
        body.classList.add("wrong");
        setTimeout(() => {
            body.classList.remove("wrong");
        }, 300);
        reset();
    }
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}