let boxs = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let newGame = document.querySelector("#new-game");
let drawGame = document.querySelector(".draw-game");
let draw = document.querySelector("#draw");


let turnO = true; // true = O, false = X

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Reset the game
const resetGame = () => {
    turnO = true;
    enableBoxs();
    msgContainer.classList.add("hide");
    drawGame.classList.add("hd");
}

boxs.forEach((box) => {
    box.addEventListener("click", () => {
       if (turnO) {  // true = O
            box.innerText = "O";
            turnO = false;
       }else { // false = X
            box.innerText = "X";
            turnO = true;
       }
       box.disabled = true; // Disable the box after clicking
       checkWin();
    });
});

const disableBoxs = () => {
    for(let box of boxs) {
        box.disabled = true;
    }
}
const enableBoxs = () => {
    for(let box of boxs) {
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {

    msg.innerText = `Congratulations ${winner} you win!`;
    msgContainer.classList.remove("hide");
    disableBoxs(); 
}

  
const checkWin = () => {
    for (pattern of winPatterns) {
        let pos1 = boxs[pattern[0]].innerText;
        let pos2 = boxs[pattern[1]].innerText;  
        let pos3 = boxs[pattern[2]].innerText;
        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
            
            }else {
                checkDraw();
            }
        }
    }
};

newGame.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

// Let's add win and draw condition in a single function
const checkDraw = () => {  // Check for draw 
    let draw = true;
    for (let box of boxs) {
        if (box.innerText === "") {
            draw = false;
            break;
        }
    }
    if (draw) {
        
        draw.innerText = `It's a draw! ${draw}`;
        drawGame.classList.remove("hd");
    }
};
boxs.forEach((box) => {
    box.addEventListener("click", checkDraw); // Check for draw after each click
    box.addEventListener("click", checkWin); // Check for win after each click
});






