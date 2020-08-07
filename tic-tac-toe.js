let currentPlayerSymbol = "x";
let squareValues = ["","","","","","","","",""];
let winner = '';
let xScore = 0;
let drawCount = 0;
let oScore = 0;
const scoreCountEl = document.getElementById("score-count")
const winnerEl = document.getElementById("game-status");
const newGameButton = document.getElementById("new-game");
const giveUpButton = document.getElementById("give-up");
const resetButton = document.getElementById("score-count-button")
const turnEl = document.getElementById("turn");

function updateScoreCount() {
    let scoreCount = `"X" has won ${xScore} games and "O" has won ${oScore} games with ${drawCount} draws`
    scoreCountEl.innerHTML = `${scoreCount}`
}

function whosTurn() {
    turnEl.innerHTML = `It is currently "${currentPlayerSymbol.toUpperCase()}"'s turn.`
}

// ====================================================================
// endRound function - Announces winner and enables new game button
// ====================================================================
function endRound() {
    if (winner !== "") {
        newGameButton.disabled = false;
        localStorage.setItem("winner", winner);
        (winner === "X") ? xScore++ : (winner === "O") ? oScore++ : drawCount++
        console.log(xScore,oScore,drawCount);
        localStorage.setItem("xScore",xScore);
        localStorage.setItem("oScore",oScore);
        localStorage.setItem("drawCount",drawCount);
        winnerEl.innerHTML = `WINNER: ${winner}`;
        updateScoreCount();
    }
    if (winner === "None") {
        giveUpButton.disabled = true;
    }
    
}


// ====================================================================
// checkGameStatus
// ====================================================================
const checkGameStatus = () => {
    for(let i = 0; i < squareValues.length; i += 3) {
        if((squareValues[i] === squareValues[i+1]) && (squareValues[i] === squareValues[i+2]) && squareValues[i]) {
            winner = squareValues[i].toUpperCase();
            endRound()
            return;
        }
    }
    
    for (let i = 0; i < (squareValues.length-6); i++) {
        if((squareValues[i] === squareValues[i+3]) && (squareValues[i] === squareValues[i+6]) && squareValues[i]) {
            winner = squareValues[i].toUpperCase();
            endRound()
            return;
        }
    }
    
    if(((squareValues[0] === squareValues[4]) && (squareValues[0] === squareValues[8])) || 
    ((squareValues[2] === squareValues[4]) && (squareValues[2] === squareValues[6]) && squareValues[4])) {
        winner = squareValues[4].toUpperCase();
        endRound()
        return;
    }
    
    if(winner === '' && !squareValues.includes('')) {
        winner = 'None';
        endRound();
        return;
    }
    
    
}


// ====================================================================
// addEventListener - DOMContentLoader
// ====================================================================
window.addEventListener("DOMContentLoaded", event => {
    const gameBoard = document.getElementById("tic-tac-toe-board");
    
    
    // ====================================================================
    // onReload function
    // ====================================================================
    
    function onReload () {
        
        whosTurn();
        if("savedValues" in localStorage) {
            squareValues = JSON.parse(localStorage.getItem("savedValues"));
            currentPlayerSymbol = localStorage.getItem("next-turn");
            
            if("winner" in localStorage) {
                winner = localStorage.getItem("winner");
                if (winner !== "") {
                    newGameButton.disabled = false;
                    winnerEl.innerHTML = `WINNER: ${winner}`;
                }
                
            } 
            
            // console.log(typeof squareValues);
            
            for(let i = 0; i < squareValues.length; i++) {
                if(squareValues[i] === "x") {
                    let selectedSquare = document.getElementById(`square-${i}`);
                    selectedSquare.innerHTML = 
                    `<img src="https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg">`
                } else if (squareValues[i] === "o") {
                    let selectedSquare = document.getElementById(`square-${i}`);
                    selectedSquare.innerHTML =
                    `<img src="https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg">`
                }
            }
        }
        if ("xScore" in localStorage) {
            xScore = parseInt(localStorage.getItem("xScore"));
            oScore = parseInt(localStorage.getItem("oScore"));
            drawCount = parseInt(localStorage.getItem("drawCount"));
            console.log(xScore,oScore,drawCount);
        }
        updateScoreCount();
        }
        
        onReload();
        
        
        gameBoard.addEventListener("click", event => {
            
            if (winner !== '') {
                return; 
            } 
            
            let id = event.target.id;
            console.log(id);
        if (id.includes("square-")) {
            let gridIndex = parseInt(id[id.length -1])
            if (squareValues[gridIndex] === "") {
                    let selectedSquare = document.getElementById(id);
                    selectedSquare.innerHTML = 
                    `<img src="https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-${currentPlayerSymbol}.svg">`
                    squareValues[gridIndex] = currentPlayerSymbol;
                if (currentPlayerSymbol === "o") {    
                    currentPlayerSymbol = "x";
                    whosTurn();
                } else {
                    currentPlayerSymbol = "o"
                    whosTurn();    
                }
            }
        }   


        localStorage.setItem("savedValues", JSON.stringify(squareValues));
        localStorage.setItem("next-turn", currentPlayerSymbol);
        // console.log('local storage ', localStorage);
        // console.log(JSON.parse(localStorage.getItem("savedValues")));

        giveUpButton.disabled = false;
        checkGameStatus();
    
    })


// ====================================================================
// New game Button
// ====================================================================
  newGameButton.addEventListener("click", event => {
        currentPlayerSymbol = "x";
        squareValues = ["","","","","","","","",""];
        winner = '';
        winnerEl.innerHTML = "";
        for (i = 0; i < 9; i++) {
            let imgEl = document.getElementById(`square-${i}`)
            imgEl.innerHTML = "";
        }
        newGameButton.disabled = true;

        localStorage.removeItem("savedValues");
        localStorage.removeItem("next-turn");
        localStorage.removeItem("winner");
    })  

// ====================================================================
// Give up button
// ====================================================================
  giveUpButton.addEventListener("click", e => {
    if(currentPlayerSymbol === "x") {
        winner = "O";
        endRound();
    } else {
        winner = "X";
        endRound();
    }

    giveUpButton.disabled = true;
    newGameButton.disabled = false;
  });
})