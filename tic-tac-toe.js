let playerSymbol = '';
let computerSymbol = '';
let computerTurn;
let squareValues = Array.from(Array(9).keys());
// console.log(squarevalues)
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

const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  
    [0, 4, 8],
    [2, 4, 6]
  ];



  function onCheckGameTie() {
    if (emptySquares().length === 0) {
      return true;
    } else {
      return false;
    }
  }
  





  function minimax(newBoard,player, depth = 0) {
    const availableSpots = emptySquares();
    // console.log(availableSpots)
    // console.log((checkGameStatus(newBoard,player) ? 'true' : 'false'))
    let score = {};
    
    if (checkGameStatus(newBoard, computerSymbol)) {
        // console.log("Are we hitting here? 1")
        // console.log((onCheckWin(newBoard) === false))
        // console.log(newBoard,"o")
         score = { "score": (-100 + depth)}
         return score
    } else if (checkGameStatus(newBoard, playerSymbol)) {
        // console.log("Are we hitting here? 2")
        // console.log(checkGameStatus(newBoard))
        // console.log(newBoard,"o")
        score =  { "score": (100 - depth)}
        return score
    } else if (availableSpots.length === 0) {
        // console.log("Are we hitting here? 3")
        score = { "score": 0 }
        return score
    } 
    let moves = [];
    
    let move = {};
    for (let i=0; i<availableSpots.length; i++) {
      move.index = newBoard[availableSpots[i]];
      newBoard[availableSpots[i]] = player; 
    //   console.table(newBoard)
    if (player === computerSymbol) {
        var result = minimax(newBoard, playerSymbol , depth++);
        // console.log(newBoard,"first");
        // console.log(result)
        move.score = result["score"];
    } else {
        let result = minimax(newBoard, computerSymbol, (depth + 1));
        console.log(newBoard,"first");
        move.score = result.score;
        
    } 
    console.log(moves)
    //   console.log(moves,move)
      newBoard[availableSpots[i]] = move.index;
      moves.push(move);
    //   console.log(moves,move)
    } // end of for look
    
    let bestMove;
    
    
        if (player === playerSymbol) {
            let bestScore = -10000;
            for (let i=0; i<moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                    // console.log(bestMove)
                }
                // end of for loop
            }
            if (player === computerSymbol) {
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
        // console.log(moves[bestMove])
        return moves[bestMove];
    }
    
    function botPicksSpot() {
        return minimax(squareValues,computerSymbol).index;
    }
    function emptySquares() {
        return squareValues.filter(item => typeof item === 'number');
    }
    // console.table(emptySquares());
    
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
    








const checkGameStatus = (board, player) => {
    let plays = board.reduce((a, e, i) => {
      return (e === player) ? a.concat(i) : a;
    }, []);
    let gameWon = false;
    for (let [index, win] of winCombos.entries()) {
      if (win.every(elem => plays.indexOf(elem) > -1)) {
        gameWon = {
          index: index,
          player: player
        };
        break;
      }
    }
    return gameWon;
  
}
function runBotAfterUser() {
        computerMove();
        
    }


    
    
    // ====================================================================
    // addEventListener - DOMContentLoader
    // ====================================================================
    window.addEventListener("DOMContentLoaded", event => {
        const gameBoard = document.getElementById("tic-tac-toe-board");
        
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
        
        
        
        function computerMove() {   
               let botIndexPick = botPicksSpot();
                console.log(botIndexPick);
                
                // selectedSquare.innerHTML =
                // `<img src="https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-${computerSymbol}.svg">`
                
                computerTurn = false
            }
        
            assignSymbol();
        
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
            
            // ====================================================================
            // New game Button
            // ====================================================================
        
                    newGameButton.addEventListener("click", event => {
                        localStorage.removeItem("savedValues");
                        localStorage.removeItem("next-turn");
                        localStorage.removeItem("isComputerTurn")
                        localStorage.removeItem("winner");
                        squareValues = Array.from(Array(9).keys());;
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
    
    function onTurnClick(event) {
        
        
        
        
    
    

        let id = event.target.id;
        console.log(id,"id")
        if (id.includes("square-")) {
            console.log("Are we getting here?")
            if (winner !== '') {
                return; 
            } 
            let gridIndex = parseInt(id[id.length -1])
            console.log(gridIndex)
            if (typeof squareValues[gridIndex] === "number" ) {
                let selectedSquare = document.getElementById(id);
                selectedSquare.innerHTML = 
                `<img src=https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-${playerSymbol}.svg>`
                squareValues[gridIndex] = playerSymbol;
                    computerTurn = true;
                    whosTurn();
                    if (!checkGameStatus(squareValues,playerSymbol)) {    
                    // runBotAfterUser();
                    }
          
        
            }
}
    
}      

    gameBoard.addEventListener("click", onTurnClick)

})
