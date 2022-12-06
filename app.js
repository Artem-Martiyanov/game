const devButton = document.getElementById("dev-btn");
const devButton2 = document.getElementById("dev-btn2");

const allItems = document.querySelectorAll(".item");
const endScreen = document.querySelector(".end-screen");
let counter = 0;
let currentValue = 0;
let lastValue = 0;
let lastGameCell;
let gameCheck = 0;
let gameItemValue = allItems.length / 2;
const restartButton = document.getElementById("restart-btn");
let score = document.querySelector(".score");
let scoreCounter = 0;

function restartGame() {
  allItems.forEach(function (item) {
    item.classList.remove("off");
  });
  endScreen.style.display = "none";
  counter = 0;
  currentValue = 0;
  lastValue = 0;
  lastGameCell = 0;
  gameCheck = 0;
  fillGameField();
}

function getRandValue(maxValue) {
  return Math.floor(Math.random() * maxValue) + 1;
}

function fillGameField() {
  //------------------------------ Обнуление

  allItems.forEach(function (item) {
    item.innerHTML = 0;
  });

  allItems.forEach(function (item) {
    let currentItem = item;
    let numCounter = 0;
    let randomValue;

    while (currentItem.innerHTML == 0) {
      randomValue = getRandValue(gameItemValue);

      allItems.forEach(function (item) {
        if (item.innerHTML == randomValue) {
          numCounter++;
        }
      });

      if (numCounter < 2) {
        currentItem.innerHTML = randomValue;
        console.log("Присвоить: " + randomValue);
      }
      numCounter = 0;
    }
  });
}

function isRestart() {
  restartButton.addEventListener("click", restartGame);
}

function removeClass(item) {
  setTimeout(function () {
    counter = 0;
    item.classList.remove("active");
  }, 400);
}

allItems.forEach(function (item) {
  let gameCell = item;

  function checkEndGame() {
    if (gameCheck == gameItemValue) {
      setTimeout(function () {
        endScreen.style.display = "flex";
        document.querySelector(".total_score").innerHTML = score.innerHTML;
      }, 500);
    }
  }

  function deleteItem() {
    gameCell.classList.add("off");
    lastGameCell.classList.add("off");
    score.innerHTML = parseInt(score.innerHTML) + 22 - parseInt(scoreCounter);
    scoreCounter = 0;
    gameCheck++;
  }

  gameCell.addEventListener("click", function () {
    if (!gameCell.classList.contains("active") && counter < 2) {
      gameCell.classList.add("active");
      counter++;
      scoreCounter++;
    }

    if (counter > 1) {
      allItems.forEach(removeClass);
    }

    currentValue = gameCell.innerHTML;

    if (
      currentValue == lastValue &&
      lastGameCell != gameCell &&
      lastGameCell.classList.contains("active")
    ) {
      deleteItem();
    }

    lastValue = currentValue;
    lastGameCell = gameCell;
    checkEndGame();
    isRestart();
  });
});
/*


devButton2.addEventListener("click", function () {
  // Показать все ячейки
  allItems.forEach(function (item) {
    item.style.color = "#fff";
  });
});

//--
//--
//--

devButton.addEventListener("click", function () {});
*/
