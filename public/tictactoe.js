// define the game state and html elements to update
let gameState = {
    board: new Array(9).fill(null),
    turn: 'x',
    over: false,
    moveCount: 0
}
let pieces = document.getElementById("pieces");
let status = document.getElementById("status");

// makes the move for the current player at the given position if possible
// updates gameState.turn and gameState.over
// returns true if the move is valid, false otherwise
const PlayerMove = (pos) => {
    if (gameState.board[pos] !== null || gameState.over) {
        return false;
    }

    gameState.board[pos] = gameState.turn;
    gameState.over = checkWin(gameState.turn);
    gameState.turn = gameState.turn === 'x' ? 'o' : 'x';
    return true;
}

// checks if the given player has won the game
// returns true if won, false if not
const checkWin = (player) => {
    if (player === null) {
        return false;
    }
    const board = gameState.board;

    let lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    for (line of lines) {
        if (board[line[0]] === player && board[line[1]] === player && board[line[2]] === player) {
            gameState.over = true;
            return true;
        }
    }

    return false;
}

// resets gameState to its initial state
const reset = () => {
    gameState.board = new Array(9).fill(null);
    gameState.turn = 'x';
    gameState.over = false;
    gameState.moveCount = 0;
    pieces.innerHTML = "";
    status.innerHTML = "Game Status: New Game, X moves first";
}

// handles a click on the game board
const move = (e) => {
    // make sure game isn't over before proceeding
    if (gameState.over) {
        return;
    }

    // get id of where the click occurred and player to move
    let pos = parseInt(e.target.id[1]);
    let player = gameState.turn == 'x';

    // create the x or o icon
    let icon;
    if (player) {
        icon = document.createElementNS("http://www.w3.org/2000/svg", "path");
        icon.setAttribute("fill", "red");
        icon.setAttribute("d", "m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z");
        icon.setAttribute("transform", "scale(0.04) translate(" + ((pos % 3) * 750 - 100) + ", " + (Math.floor(pos / 3) * 740 + 860) + ")");
    } else {
        icon = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        icon.setAttribute("stroke", "blue");
        icon.setAttribute("cx", pos % 3 * 30 + 15);
        icon.setAttribute("cy", Math.floor(pos / 3) * 30 + 15);
        icon.setAttribute("r", "11.5");
        icon.setAttribute("fill", "transparent");
        icon.setAttribute("stroke-width", "3.5");
    }

    // add the icon to the board if the move is valid and display game status
    let moved = PlayerMove(pos);
    if (moved) {
        pieces.appendChild(icon);

        gameState.moveCount++;
        if (gameState.over) {
            status.innerHTML = "Game Status: Game Over, " + (player ? 'X' : 'O') + " wins. <br> Click Reset to play again";
        } else if (gameState.moveCount === 9) {
            gameState.over = true;
            status.innerHTML = "Game Status: Game Over, Tie. <br> Click Reset to play again";
        } else {
            status.innerHTML = "Game Status: " + gameState.turn.toUpperCase() + " moves next";
        }

    } else {
        status.innerHTML = "Game Status: Invalid Move, " + gameState.turn.toUpperCase() + " moves next";
    }
}

// add event listeners to the game board and reset button
const gameBoard = document.querySelector("#gameBoard");
gameBoard.addEventListener('click', move);
const resetButton = document.querySelector("#reset");
resetButton.addEventListener('click', reset);