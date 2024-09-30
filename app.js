const cells = document.querySelectorAll("[data-cell]");
const statusMessage = document.querySelector(".status-message");
const restartBtn = document.querySelector(".restart-btn");
const playerVsComputerBtn = document.getElementById("player-vs-computer");
const playerVsPlayerBtn = document.getElementById("player-vs-player");

let isPlayerVsComputer = false;
let turnO = true;
let movesCount = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    cells.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove("disabled");
    });
    statusMessage.innerText = "";
    movesCount = 0;
    turnO = true;
};

const checkWinner = () => {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (cells[a].innerText && cells[a].innerText === cells[b].innerText && cells[a].innerText === cells[c].innerText) {
            return cells[a].innerText;
        }
    }
    return movesCount === 9 ? "Draw" : null;
};

const makeComputerMove = () => {
    const emptyCells = [...cells].filter(cell => cell.innerText === "");
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomCell.innerText = "X";
    movesCount++;
    const winner = checkWinner();
    if (winner) {
        showResult(winner);
    } else {
        turnO = true;
    }
};

const showResult = (winner) => {
    if (winner === "Draw") {
        statusMessage.innerText = "Game was a Draw.";
    } else {
        statusMessage.innerText = `Congratulations, Winner is ${winner}`;
    }
    cells.forEach(cell => cell.classList.add("disabled"));
};

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        if (cell.innerText || cell.classList.contains("disabled")) return;
        cell.innerText = turnO ? "O" : "X";
        movesCount++;
        const winner = checkWinner();
        if (winner) {
            showResult(winner);
        } else if (isPlayerVsComputer) {
            makeComputerMove();
        } else {
            turnO = !turnO;
        }
    });
});

restartBtn.addEventListener("click", resetGame);
playerVsComputerBtn.addEventListener("click", () => {
    isPlayerVsComputer = true;
    resetGame();
});
playerVsPlayerBtn.addEventListener("click", () => {
    isPlayerVsComputer = false;
    resetGame();
});
