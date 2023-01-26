let displayPlayer = document.querySelector(".display-player");
let tiles = Array.from(document.querySelectorAll(".tile"));
let result = document.querySelector(".result");
let resetBtn = document.querySelector(".reset");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

const PLAYERX_WON = "PLAYERX_WON";
const PLAYERO_WON = "PLAYERO_WON";
const TIE = "TIE";

/* 
    win Indexs 
    [0] [1] [2]
    [3] [4] [5]
    [6] [7] [8]
*/

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const resultValidation = () => {
  let roundWon = false;
  for (let i = 0; i < 8; i++) {
    let conditionWin = winningConditions[i];
    const a = board[conditionWin[0]];
    const b = board[conditionWin[1]];
    const c = board[conditionWin[2]];

    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    announce(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
    isGameActive = false;
    return;
  }
  if (!board.includes("")) announce(TIE);
};

const announce = (type) => {
  switch (type) {
    case "PLAYERX_WON": {
      result.innerHTML = `Player <span class = "playerX">X</span> Won`;
      break;
    }
    case "PLAYERO_WON": {
      result.innerHTML = `Player <span class = "playerO">O</span> Won`;
      break;
    }
    case "TIE": {
      result.innerText = "TIE";
    }
  }
  result.classList.remove("hide");
};

const isValidatAction = (tile) => {
  if (tile.innerText === "X" || tile.innerText === "O") {
    return false;
  }
  return true;
};
const updateBoard = (index) => {
  board[index] = currentPlayer;
};

const changePlayer = () => {
  displayPlayer.classList.remove(`player${currentPlayer}`);
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  displayPlayer.innerText = currentPlayer;
  displayPlayer.classList.add(`player${currentPlayer}`);
};

const userAction = (tile, index) => {
  if (isValidatAction(tile) && isGameActive) {
    tile.innerText = currentPlayer;
    tile.classList.add(`player${currentPlayer}`);
    updateBoard(index);
    resultValidation();
    changePlayer();
  }
};

const resetBoard = () => {
  board = ["", "", "", "", "", "", "", "", ""];
  isGameActive = true;
  result.classList.add("hide");

  if (currentPlayer === "O") changePlayer();

  tiles.forEach((tile) => {
    tile.innerText = "";
    tile.classList.remove("playerX");
    tile.classList.remove("playerO");
  });
};

tiles.forEach((tile, index) => {
  tile.addEventListener("click", () => userAction(tile, index));
});

resetBtn.addEventListener("click", () => resetBoard());
