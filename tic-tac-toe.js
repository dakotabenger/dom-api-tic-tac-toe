let currentPlayerSymbol = "x";
let squareValues = ["","","","","","","","",""];
let winner = '';
const winnerEl = document.getElementById("game-status");
const newGameButton = document.getElementById("new-game")

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
    
    function endRound() {
        if (winner !== "") {
            newGameButton.disabled = false;
        }
        winnerEl.innerHTML = `WINNER: ${winner}`;
    }

}

window.addEventListener("DOMContentLoaded", event => {
    
    const gameBoard = document.getElementById("tic-tac-toe-board");
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
                    selectedSquare.innerHTML = `<img src="https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-${currentPlayerSymbol}.svg"> </img>`
                    squareValues[gridIndex] = currentPlayerSymbol;
                if (currentPlayerSymbol === "o") {    
                    currentPlayerSymbol = "x";
                } else {currentPlayerSymbol = "o"}
            }
        }   

        checkGameStatus();
    
    })
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


  })  

})