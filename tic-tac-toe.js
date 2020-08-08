let playerSymbol = '';
let computerSymbol = '';
let computerTurn;
let squareValues = ["","","","","","","","",""];
let currentPlayerSymbol = ''
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
    turnEl.innerHTML = `It is currently "${currentPlayerSymbol.toUpperCase()}" 's turn.`
}

// ====================================================================
// endRound function - Announces winner and enables new game button
// ====================================================================
function endRound() {
    if (winner !== "") {
        newGameButton.disabled = false;
        // localStorage.setItem("winner", winner);
        (winner === "X") ? xScore++ : (winner === "O") ? oScore++ : drawCount++
        // localStorage.setItem("xScore",xScore);
        // localStorage.setItem("oScore",oScore);
        // localStorage.setItem("drawCount",drawCount);
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
    if(computerTurn === true) {
        computerMove();
        // setTimeout(computerMove, 1000);
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
        // localStorage.setItem("isComputerTurn",computerTurn)
        computerMove();
    } else {
;        // player starts first
        computerSymbol = "o"
        playerSymbol = "x";
        computerTurn = false;
        // localStorage.setItem("isComputerTurn",computerTurn)
    }
    
}

function computerMove() {
    let randomGridBlock = Math.floor(Math.random() * 9);

    while(squareValues[randomGridBlock] !== '') {
        randomGridBlock = Math.floor(Math.random() * 9);
    }

        const selectedSquare = document.getElementById(`square-${randomGridBlock}`);
        selectedSquare.innerHTML =
            `<img src="https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-${computerSymbol}.svg">`;
        
        squareValues[randomGridBlock] = computerSymbol;

        console.log(squareValues);
        computerTurn = false;
        // localStorage.setItem("isComputerTurn",computerTurn)
        checkGameStatus();
        currentPlayerSymbol =  (computerTurn) ? computerSymbol : playerSymbol
        // localStorage.setItem("next-turn", currentPlayerSymbol);
    }

    
    // ====================================================================
    // addEventListener - DOMContentLoader
    // ====================================================================
    window.addEventListener("DOMContentLoaded", event => {
        const gameBoard = document.getElementById("tic-tac-toe-board");
        
        
        // ====================================================================
        // onReload function
        // ====================================================================
        
    //     function onReload () {
            
    //         whosTurn();
    //         if("savedValues" in localStorage) {
    //             squareValues = JSON.parse(localStorage.getItem("savedValues"));
    //             currentPlayerSymbol = localStorage.getItem("next-turn");
                
    //             if("winner" in localStorage) {
    //                 winner = localStorage.getItem("winner");
    //                 if (winner !== "") {
    //                     newGameButton.disabled = false;
    //                     winnerEl.innerHTML = `WINNER: ${winner}`;
    //                 }
    //             if ("isComputerTurn" in localStorage) {
    //                 computerTurn = JSON.parse(localStorage.getItem("isComputerTurN"))
    //             }            
    //             } 
                
    //             // console.log(typeof squareValues);
            
    //         for(let i = 0; i < squareValues.length; i++) {
    //             if(squareValues[i] === "x") {
    //                 let selectedSquare = document.getElementById(`square-${i}`);
    //                 selectedSquare.innerHTML = 
    //                 `<img src="https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg">`
    //             } else if (squareValues[i] === "o") {
    //                 let selectedSquare = document.getElementById(`square-${i}`);
    //                 selectedSquare.innerHTML =
    //                 `<img src="https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg">`
    //             }
    //         }
    //     }
    //     if ("xScore" in localStorage) {
    //         xScore = parseInt(localStorage.getItem("xScore"));
    //         oScore = parseInt(localStorage.getItem("oScore"));
    //         drawCount = parseInt(localStorage.getItem("drawCount"));
    //     }
    //     updateScoreCount();
    // }
    
    // onReload();
    
    
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
                }   
                
                // localStorage.setItem("savedValues", JSON.stringify(squareValues));
                // localStorage.setItem("next-turn", currentPlayerSymbol);
                // // console.log('local storage ', localStorage);
                // console.log(JSON.parse(localStorage.getItem("savedValues")));
                
                giveUpButton.disabled = false;
                computerTurn = true;
                // localStorage.setItem("isComputerTurn",computerTurn)
                currentPlayerSymbol =  (computerTurn) ? computerSymbol : playerSymbol
                checkGameStatus();
                whosTurn();
        
    })
    
    
    // ====================================================================
    // New game Button
    // ====================================================================
    newGameButton.addEventListener("click", event => {
        currentPlayerSymbol = "";
        squareValues = ["","","","","","","","",""];
        winner = '';
        winnerEl.innerHTML = "";
        for (i = 0; i < 9; i++) {
            let imgEl = document.getElementById(`square-${i}`)
            imgEl.innerHTML = "";
        }
        newGameButton.disabled = true;
        
        // localStorage.removeItem("savedValues");
        // localStorage.removeItem("next-turn");
        // localStorage.removeItem("isComputerTurn")
        // localStorage.removeItem("winner");
        assignSymbol();
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
    
    // resetButton.addEventListener("click", event => {
    //     localStorage.removeItem("xScore");
    //     localStorage.removeItem("oScore");
    //     localStorage.removeItem("drawCount");
    //     xScore = 0;
    //     drawCount = 0;
    //     oScore = 0;
    //     updateScoreCount();
    // })
    assignSymbol();
})