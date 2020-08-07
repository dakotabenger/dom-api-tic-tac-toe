let currentPlayerSymbol = "x";
let squareValues = ["","","","","","","","",""];


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

})


})