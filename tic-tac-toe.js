let playerSymbol = '';
let computerSymbol = '';
let computerTurn;
let squareValues = ["","","","","","","","",""];
let winner = '';
let playerScore = 0;
let drawCount = 0;
let computerScore = 0;
const scoreCountEl = document.getElementById("score-count")
const winnerEl = document.getElementById("game-status");
const newGameButton = document.getElementById("new-game");
const giveUpButton = document.getElementById("give-up");
const resetButton = document.getElementById("score-count-button")
const turnEl = document.getElementById("turn");

function updateScoreCount() {
    let scoreCount = `The computer has won ${computerScore} ${(computerScore === 1) ? "game" : "games"} and the player has won ${playerScore} ${(playerScore === 1) ? "game" : "games"} There ${(drawCount === 1 ? "has" : "have")} been ${drawCount} ${(drawCount === 1 ? "draw" : "draws")}`
    scoreCountEl.innerHTML = `${scoreCount}`
}

function whosTurn() {
    if (winner === "") {
    turnEl.innerHTML = `It is currently ${(computerTurn) ? "the Computer's" : "the Player's"} turn. ("${(computerTurn) ? computerSymbol.toUpperCase() : playerSymbol.toUpperCase()}")`
    } else if (winner !== "") {
        turnEl.innerHTML = "Hit the New Game Button to start a new round"
    }
}

// ====================================================================
// endRound function - Announces winner and enables new game button
// ====================================================================
function endRound() {
    if (winner !== "") {
        newGameButton.disabled = false;
        giveUpButton.disabled = true;
        localStorage.setItem("winner", winner);
        (winner === playerSymbol.toUpperCase()) ? playerScore++ : (winner === computerSymbol.toUpperCase()) ? computerScore++ : drawCount++
        localStorage.setItem("playerScore", playerScore);
        localStorage.setItem("computerScore",computerScore);
        localStorage.setItem("drawCount",drawCount);
        winnerEl.innerHTML = `WINNER: ${winner}`;
        updateScoreCount();
        whosTurn();
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
    
    if(((squareValues[0] === squareValues[4]) && (squareValues[0] === squareValues[8])) && squareValues[4] || 
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
    if(computerTurn === true) {
        computerMove();
    }
    
}

function assignSymbol() {
    let xOrO = Math.floor(Math.random() * 2);
    // console.log(xOrO);
    if (xOrO === 0) {
        
        // computer starts first;
        computerSymbol = "x";
        playerSymbol = "o";
        computerTurn = true;
        localStorage.setItem("isComputerTurn",computerTurn);
        localStorage.setItem("playerSymbol",playerSymbol);
        localStorage.setItem("computerSymbol",computerSymbol);
        computerMove();
    } else {
;        // player starts first
        computerSymbol = "o"
        playerSymbol = "x";
        computerTurn = false;
        localStorage.setItem("playerSymbol",playerSymbol);
        localStorage.setItem("computerSymbol",computerSymbol);
        localStorage.setItem("isComputerTurn",computerTurn)
    }
    whosTurn();
    
}

function computerMove() {
    let randomGridBlock = Math.floor(Math.random() * 9);
    
    while(squareValues[randomGridBlock] !== '') {
        randomGridBlock = Math.floor(Math.random() * 9);
    }
    if (computerTurn) {
    setTimeout(function(){
        if (squareValues[randomGridBlock] === "") {
        const selectedSquare = document.getElementById(`square-${randomGridBlock}`);
        selectedSquare.innerHTML =
        `<img src="https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-${computerSymbol}.svg">`;
        
        squareValues[randomGridBlock] = computerSymbol;
        computerTurn = false;
        localStorage.setItem("isComputerTurn",computerTurn)
        checkGameStatus();
        localStorage.setItem("savedValues", JSON.stringify(squareValues));
        whosTurn();
        }
    }, 3000 )
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
            
            if ( "playerScore" in localStorage) {
                playerScore = parseInt(localStorage.getItem( "playerScore"));
                computerScore = parseInt(localStorage.getItem("computerScore"));
                drawCount = parseInt(localStorage.getItem("drawCount"));
                updateScoreCount();
            }
            
            if("savedValues" in localStorage) {
                squareValues = JSON.parse(localStorage.getItem("savedValues"));
                console.log(squareValues);
            }
            
            if("winner" in localStorage) {
                winner = localStorage.getItem("winner");
                    if (winner !== "") {
                        newGameButton.disabled = false;
                        winnerEl.innerHTML = `WINNER: ${winner}`;
                    }
                }            
                if ("isComputerTurn" in localStorage && squareValues.includes("")) {
                    computerTurn = JSON.parse(localStorage.getItem("isComputerTurn"))
                    playerSymbol = localStorage.getItem("playerSymbol");
                    computerSymbol = localStorage.getItem("computerSymbol")
                    whosTurn();
                } 
                
            }
            
            onReload();
  
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
        function computerFirstMoveAfterReloaad() {
        if (computerTurn === true && winner === "") {
            computerMove();
        } else if (winner !== "") {
            whosTurn();
        }
    }

    computerFirstMoveAfterReloaad();
    
    gameBoard.addEventListener("click", event => {

if (winner !== '' || computerTurn) {
    return; 
} 

let id = event.target.id; // id of "square-0"
if (id.includes("square-")) {
    let gridIndex = parseInt(id[id.length -1])
    if (squareValues[gridIndex] === "") {
        let selectedSquare = document.getElementById(id);
        selectedSquare.innerHTML = 
        `<img src="https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-${playerSymbol}.svg">`
        squareValues[gridIndex] = playerSymbol;
         }
        } else return;  
        
        localStorage.setItem("savedValues", JSON.stringify(squareValues));
        
        giveUpButton.disabled = false;
        computerTurn = true;
        localStorage.setItem("isComputerTurn",computerTurn)
        whosTurn();
        checkGameStatus();

})


// ====================================================================
// New game Button
// ====================================================================
newGameButton.addEventListener("click", event => {
localStorage.removeItem("savedValues");
localStorage.removeItem("next-turn");
localStorage.removeItem("isComputerTurn")
localStorage.removeItem("winner");
squareValues = ["","","","","","","","",""];
winner = '';
winnerEl.innerHTML = "";
for (i = 0; i < 9; i++) {
    let imgEl = document.getElementById(`square-${i}`)
    imgEl.innerHTML = "";
}
updateScoreCount();
newGameButton.disabled = true;

assignSymbol();
})  

// ====================================================================
// Give up button
// ====================================================================
giveUpButton.addEventListener("click", e => {
if(playerSymbol === "x") {
    winner = "O";
    endRound();
} else {
    winner = "X";
    endRound();
}

giveUpButton.disabled = true;
newGameButton.disabled = false;
});

resetButton.addEventListener("click", event => {
localStorage.removeItem( "playerScore");
localStorage.removeItem("computerScore");
localStorage.removeItem("drawCount");
playerScore = 0;
drawCount = 0;
computerScore = 0;
updateScoreCount();
})
if (localStorage.getItem("playerSymbol") === null) {
assignSymbol(); }
})
