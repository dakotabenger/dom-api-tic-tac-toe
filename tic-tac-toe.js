let playerSymbol = '';
let computerSymbol = '';
let computerTurn;
let squareValues = ["x","","","","","","","",""];
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

function minimax(newBoard,player, depth = 0) {
    let availableSpots = emptySquares();
    console.log(availableSpots)
    console.log((checkGameStatus(newBoard) ? 'true' : 'false'))
    if (checkGameStatus(newBoard)) {
        console.log((checkGameStatus(newBoard) === false))
      return { score: (-10 + depth)}
    } else if (checkGameStatus(newBoard)) {
        console.log(checkGameStatus(newBoard))
      return { score: (10 - depth)}
    } else if (availableSpots.length === 0) {
        console.log(availableSpots);
      return { score: 0 }
    }
  
    let moves = [];
  
    for (let i=0; i<availableSpots.length; i++) {
      let move = {};
      move.index = newBoard[availableSpots[i]];
      newBoard[availableSpots[i]] = player;
        console.log(availableSpots[i])
      console.log(newBoard);
      console.log(player,"outside");
      if (player === computerSymbol) {
        console.log(player,depth)
        depth++
        let result = minimax(newBoard, playerSymbol,depth + 1);
        move.score = result.score;
    } else {
        console.log(player,depth,"else")
        depth++
        let result = minimax(newBoard, computerSymbol,depth + 1);
        move.score = result.score;
        
      }
  
      newBoard[availableSpots[i]] = move.index;
      moves.push(move);
      console.log(moves,move)
    } // end of for look
  
    let bestMove;
  
    
        if (player === "x") {
            let bestScore = -10000;
            for (let i=0; i<moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                    // console.log(bestMove)
            }
            // end of for loop
        }
        if (player === "o") {
            let bestScore = 10000;
            for (let i=0; i<moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                    // console.log(bestMove)
                }
                
            }
              }
        } 
  
    return moves[bestMove];
  }

  function botPicksSpot() {
    return minimax(squareValues,computerSymbol).index;
  }
  
  function emptySquares() {
      return squareValues.filter(el => el === '').map( (el,index) => index)
    }

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
const checkGameStatus = (arr) => {
    for(let i = 0; i < arr.length; i += 3) {
        if((arr[i] === arr[i+1]) && (arr[i] === arr[i+2]) && arr[i]) {
            winner = arr[i].toUpperCase();
            endRound()
            return true;
        }
    }
    
    for (let i = 0; i < (arr.length-6); i++) {
        if((arr[i] === arr[i+3]) && (arr[i] === arr[i+6]) && arr[i]) {
            winner = arr[i].toUpperCase();
            endRound()
            return true;
        }
    }
    
    if(((arr[0] === arr[4]) && (arr[0] === arr[8])) && arr[4] || 
    ((arr[2] === arr[4]) && (arr[2] === arr[6]) && arr[4])) {
        winner = arr[4].toUpperCase();
        endRound()
        return true;
    }
    
    if(winner === '' && !arr.includes('')) {
        winner = 'None';
        endRound();
    }

    if (winner === "" && arr.includes('')) {
        return false;
    }
    
}
function runBotAfterUser() {
    if (computerTurn === true) {
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
        // console.log(computerSymbol,playerSymbol)
        computerTurn = true;
        localStorage.setItem("isComputerTurn",computerTurn);
        localStorage.setItem("playerSymbol",playerSymbol);
        localStorage.setItem("computerSymbol",computerSymbol);
        computerMove();
    } else {
;        // player starts first
        computerSymbol = "o"
        playerSymbol = "x";
        // console.log(computerSymbol,playerSymbol)
        computerTurn = false;
        localStorage.setItem("playerSymbol",playerSymbol);
        localStorage.setItem("computerSymbol",computerSymbol);
        localStorage.setItem("isComputerTurn",computerTurn)
    }
}


assignSymbol();

function computerMove() {
       let botIndexPick = botPicksSpot();
    //    console.log(botPicksSpot());
       console.log(squareValues);
        computerTurn = !computerTurn
    }


    
    // ====================================================================
    // addEventListener - DOMContentLoader
    // ====================================================================
    window.addEventListener("DOMContentLoaded", event => {
        const gameBoard = document.getElementById("tic-tac-toe-board");
        
        // ====================================================================
        // onReload function
        // ====================================================================
        
        // function onReload () {
            
        //     if ( "playerScore" in localStorage) {
        //         playerScore = parseInt(localStorage.getItem( "playerScore"));
        //         computerScore = parseInt(localStorage.getItem("computerScore"));
        //         drawCount = parseInt(localStorage.getItem("drawCount"));
        //         updateScoreCount();
        //     }
            
        //     if("savedValues" in localStorage) {
        //         squareValues = JSON.parse(localStorage.getItem("savedValues"));
        //         console.log(squareValues);
        //     }
            
        //     if("winner" in localStorage) {
        //         winner = localStorage.getItem("winner");
        //             if (winner !== "") {
        //                 newGameButton.disabled = false;
        //                 winnerEl.innerHTML = `WINNER: ${winner}`;
        //             }
        //         }            
        //         if ("isComputerTurn" in localStorage && squareValues.includes("")) {
        //             computerTurn = JSON.parse(localStorage.getItem("isComputerTurn"))
        //             playerSymbol = localStorage.getItem("playerSymbol");
        //             computerSymbol = localStorage.getItem("computerSymbol")
        //             whosTurn();
        //         } 
                
        //     }
            
        //     onReload();
  
        //     for(let i = 0; i < squareValues.length; i++) {
        //         if(squareValues[i] === "x") {
        //             let selectedSquare = document.getElementById(`square-${i}`);
        //         selectedSquare.innerHTML = 
        //         `<img src="https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg">`
        //     } else if (squareValues[i] === "o") {
        //         let selectedSquare = document.getElementById(`square-${i}`);
        //         selectedSquare.innerHTML =
        //         `<img src="https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg">`
        //     }
        // }
        
    //     function computerFirstMoveAfterReloaad() {
    //     if (computerTurn === true && winner === "") {
    //         computerMove();
    //     } else if (winner !== "") {
    //         whosTurn();
    //     }
    // }

    // computerFirstMoveAfterReloaad();
    
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
        // localStorage.setItem("isComputerTurn",computerTurn)
        whosTurn();
        checkGameStatus(squareValues);
        computerTurn = !computerTurn
        runBotAfterUser();

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
})
