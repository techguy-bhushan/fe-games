const r1 = document.getElementById("r1");
const r2 = document.getElementById("r2");
const r3 = document.getElementById("r3");
const r4 = document.getElementById("r4");
const r5 = document.getElementById("r5");
const r6 = document.getElementById("r6");
const r7 = document.getElementById("r7");
const r8 = document.getElementById("r8");
const r9 = document.getElementById("r9");

const player1TitleElement = document.getElementById("player1");
const player2TitleElement = document.getElementById("player2");

const backdropElement = document.getElementById("backdrop");
const resultElemnt = document.getElementById("result");
const closeBtnElement = document.getElementById("closeBtn");
const resultInfoElement = document.getElementById("result_info");

const gameWinBox = [
  [r1, r2, r3],
  [r4, r5, r6],
  [r7, r8, r9],
  [r1, r4, r7],
  [r2, r5, r8],
  [r3, r6, r9],
  [r1, r5, r9],
  [r3, r5, r7],
];

const holdKeyValues = new Map([
  [r1, null],
  [r2, null],
  [r3, null],
  [r4, null],
  [r5, null],
  [r6, null],
  [r7, null],
  [r8, null],
  [r9, null],
]);

const player1 = "Player 1";
const player2 = "Player 2";

let totalMoves = 0;
let playerMoveAudio = new Audio()
let resultAudio = new Audio();

init();

function move() {
  playerMoveAudio.play();
  if (totalMoves == 9) {
    alert("Game over");
    return;
  }
  totalMoves++;
  let currentPlayer = totalMoves % 2 == 0 ? player2 : player1;
  console.log(
    "current move : %s, moved by %s",
    totalMoves,
    currentPlayer,
    this
  );
  blockBoxAndUpdateBackgroundColor(currentPlayer, this);
  add(currentPlayer, this);
  checkResult(currentPlayer);
}

function isCurrentPlayerWon(elements, currentPlayer) {
  let mattached = false;
  elements.forEach((rows) => {
    let count = 0;
    rows.forEach((row) => {
      if (holdKeyValues.get(row) == currentPlayer) {
        count++;
      } else {
        return;
      }
    });
    if (count == 3) {
      mattached = true;
    }
  });
  return mattached;
}

function updateResult(msg) {
  backdropElement.style.display = "block";
  resultElemnt.style.display = "block";
  resultInfoElement.textContent = msg;
}

function checkResult(currentPlayer) {
  let won = isCurrentPlayerWon(gameWinBox, currentPlayer);
  if (won) {
    resultAudio.play();
    let message = `${currentPlayer} won the match`;
    console.log(message);
    updateResult(message);
  } else if (totalMoves == 9) {
    updateResult("ohh! Match Draw");
  }
}

function add(currentPlayer, key) {
  if (holdKeyValues.has(key) && holdKeyValues.get(key) != null) {
    console.log(
      "already have key %s value %s for given player %s",
      key.id,
      holdKeyValues.get(key),
      currentPlayer
    );
  } else {
    holdKeyValues.set(key, currentPlayer);
    console.log("added %s to %s", currentPlayer, key.id);
  }
}

function init() {
  registerEvents();
  initAudio()
  console.log("regesters events");
  closeBtnElement.addEventListener("click", resetAll);
}

function initAudio() {
  playerMoveAudio.src = "audio/click.wav";
  resultAudio.src = "audio/wow.wav";
}

function registerEvents() {
  holdKeyValues.forEach((value, key) => {
    console.log("register on click event to %s", key.id);
    key.addEventListener("click", move);
  });
}

function blockBoxAndUpdateBackgroundColor(player, element) {
  if (player == player1) {
    element.classList.add("player1_button");
    activeCurrentPlayerAndDeactivePreviousPlayer(
      player1TitleElement,
      player2TitleElement
    );
  } else {
    element.classList.add("player2_button");
    activeCurrentPlayerAndDeactivePreviousPlayer(
      player2TitleElement,
      player1TitleElement
    );
  }
  element.classList.add("avoid_clicks");
}

function resetAll() {
  totalMoves = 0;
  player1TitleElement.classList.remove("active_player");
  player2TitleElement.classList.remove("active_player");
  holdKeyValues.forEach((value, key) => {
    key.classList.remove("player1_button");
    key.classList.remove("avoid_clicks");
    key.classList.remove("player2_button");
    holdKeyValues.set(key, null);
  });
  backdropElement.style.display = "none";
  resultElemnt.style.display = "none";
  console.log("reset map", holdKeyValues);
}

function activeCurrentPlayerAndDeactivePreviousPlayer(
  currentPlayerTitleElement,
  previosPlayerTitleElement
) {
  currentPlayerTitleElement.classList.add("active_player");
  previosPlayerTitleElement.classList.remove("active_player");
}
