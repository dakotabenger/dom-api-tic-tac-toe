let currentPlayerSymbol = "x";
let squareValues = ["","","","","","","","",""];
let winner = '';

const checkGameStatus = () => {
    const winnerEl = document.getElementById("game-status");
    for(let i = 0; i < squareValues.length; i += 3) {
        if(squareValues[i] === (squareValues[i+1] && squareValues[i+2]) && squareValues[i]) {
            winner = squareValues[i].toUpperCase();
            winnerEl.innerHTML = `WINNER: ${winner}`;
            return;
        }
    }

    for (let i = 0; i < (squareValues.length-6); i++) {
        if(squareValues[i] === (squareValues[i+3] && squareValues[i+6])) {
            winner = squareValues[i].toUpperCase();
            winnerEl.innerHTML = `WINNER: ${winner}`;
            return;
        }
    }

    if((squareValues[0] === (squareValues[4] && squareValues[8])) || 
        (squareValues[2] === (squareValues[4] && squareValues[6]))) {
        winner = squareValues[4].toUpperCase();
        winnerEl.innerHTML = `WINNER: ${winner}`;
        return;
    }

    if(winner === '' && !squareValues.includes('')) {
        winner = 'None';
        winnerEl.innerHTML = `WINNER: ${winner}`;
        return;
    }
}

window.addEventListener("DOMContentLoaded", event => {
    const gameBoard = document.getElementById("tic-tac-toe-board");

    gameBoard.addEventListener("click", event => {
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


})