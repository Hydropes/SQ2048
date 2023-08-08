import { randAdd } from "./randAdd.js";
import { updateSqr } from "./updateSqr.js";
import { direction } from "./direction.js";
import { squareClick } from "./squareClick.js";
// import { users } from "./registration.js";
// import { validation } from "./validation.js";
import { scoreCounter } from "./scoreCounter.js";
// import { scoreData } from "./scoreData.js";
// import { reg } from "./registration.js";
const gameField = document.querySelector(".gameField");
let arrSqr = [];
let score = 0;
let vector = {
  x: 0,
  y: 0,
  dir: "noway",
};
// users()
// validation();
// scoreData()

function addGameField() {
  for (let i = 0; i <= 15; i++) {
    let sqr = {
      div: document.createElement("div"),
      isAct: false,
      id: i,
      sum: 0,
      col: i % 4,
      row: Math.trunc(i / 4),
    };
    arrSqr.push(sqr);
    sqr.div.classList.add("__square");
    sqr.div.addEventListener("mousedown", (e) => {
      e.preventDefault();
      squareClick(arrSqr, i);
      vector.x = e.pageX;
      vector.y = e.pageY;
    });
    sqr.div.addEventListener("mousemove", (e) => {
      e.preventDefault();
    });

    sqr.div.addEventListener("mouseup", (e) => {
      e.preventDefault();
      vector.x = e.pageX - vector.x;
      vector.y = e.pageY - vector.y;
      direction(vector);
      moveLine(vector, arrSqr);
    });

    sqr.div.id = i;
    gameField.appendChild(sqr.div);
  }
  randAdd(arrSqr);
}



function moveLine(vect, arr) {
  let acts = arr.map((el) => el.isAct);
  let currAct = acts.indexOf(true);

  if (vect.dir === "down" && currAct < 12) {
    shiftDown(arr);
    shiftDown(arr);
    shiftDown(arr);
    sumDown(arr);
    shiftDown(arr);
    randAdd(arr);
    updateSqr(arr);
    score += scoreCounter(arr);

    while (currAct < 12) {
      currAct += 4;
    }
    activeSqr(arrSqr, currAct);
  } else if (vect.dir === "up" && currAct > 3) {
    shiftUp(arr);
    shiftUp(arr);
    shiftUp(arr);
    sumUp(arr);
    shiftUp(arr);
    randAdd(arr);
    updateSqr(arr, score);
    score += scoreCounter(arr);

    while (currAct > 3) {
      currAct -= 4;
    }
    activeSqr(arrSqr, currAct);
  } else if (vect.dir === "left" && currAct % 4 != 0) {
    shiftLeft(arr);
    shiftLeft(arr);
    shiftLeft(arr);
    sumLeft(arr);
    shiftLeft(arr);
    randAdd(arr);
    updateSqr(arr, score);
    score += scoreCounter(arr);
    currAct = currAct - (currAct % 4);
    activeSqr(arrSqr, currAct);
  } else if (vect.dir === "right" && currAct % 4 != 3) {
    shiftRight(arr);
    shiftRight(arr);
    shiftRight(arr);
    sumRight(arr);
    shiftRight(arr);
    randAdd(arr);
    updateSqr(arr, score);
    score += scoreCounter(arr);
    currAct = currAct + 3 - (currAct % 4);
    activeSqr(arrSqr, currAct);
  }
}

function activeSqr(arr, newAct) {
  arr.forEach((value, key) => {
    arr[key].isAct = false;
  });
  arr[newAct].isAct = true;
}

function shiftRight(arr) {
  for (let rw = 0; rw <= 3; rw++) {
    let arrRows = arr.filter((el) => el.row == rw);

    for (let i = 2; i >= 0; i--) {
      if (arrRows[i + 1].sum == 0 && arrRows[i].sum != 0) {
        let a = arrRows[i].sum;
        arrRows[i].sum = arrRows[i + 1].sum;
        arrRows[i + 1].sum = a;
        arr.map((el, id) => {
          if (id == arrRows[i].id) {
            el.sum = 0;
          } else if (id == arrRows[i + 1].id) {
            el.sum = a;
          }
        });
      }
    }
  }
}
function shiftLeft(arr) {
  for (let rw = 0; rw <= 3; rw++) {
    let arrRows = arr.filter((el) => el.row == rw);
    let arrSum = arrRows.map((el) => el.sum);
    for (let i = 1; i <= 3; i++) {
      if (arrRows[i - 1].sum == 0 && arrRows[i].sum != 0) {
        let a = arrRows[i].sum;
        arrRows[i].sum = arrRows[i - 1].sum;
        arrRows[i - 1].sum = a;
        arr.map((el, id) => {
          if (id == arrRows[i].id) {
            el.sum = 0;
          } else if (id == arrRows[i - 1].id) {
            el.sum = a;
          }
        });
      }
    }
  }
}

function shiftDown(arr) {
  for (let cl = 0; cl <= 3; cl++) {
    let arrCols = arr.filter((el) => el.col == cl);
    let arrSum = arrCols.map((el) => el.sum);

    for (let i = 2; i >= 0; i--) {
      if (arrCols[i + 1].sum == 0 && arrCols[i].sum != 0) {
        let a = arrCols[i].sum;
        arrCols[i].sum = arrCols[i + 1].sum;
        arrCols[i + 1].sum = a;
        arr.map((el, id) => {
          if (id == arrCols[i].id) {
            el.sum = 0;
          } else if (id == arrCols[i + 1].id) {
            el.sum = a;
          }
        });
      }
    }
  }
}
function shiftUp(arr) {
  for (let cl = 0; cl <= 3; cl++) {
    let arrCols = arr.filter((el) => el.col == cl);
    let arrSum = arrCols.map((el) => el.sum);
    for (let i = 1; i <= 3; i++) {
      if (arrCols[i - 1].sum == 0 && arrCols[i].sum != 0) {
        let a = arrCols[i].sum;
        arrCols[i].sum = arrCols[i - 1].sum;
        arrCols[i - 1].sum = a;
        arr.map((el, id) => {
          if (id == arrCols[i].id) {
            el.sum = 0;
          } else if (id == arrCols[i - 1].id) {
            el.sum = a;
          }
        });
      }
    }
  }
}

function sumDown(arr) {
  for (let cl = 0; cl <= 3; cl++) {
    for (let i = 2; i >= 0; i--) {
      let arrCols = arr.filter((el) => el.col == cl);
      let arrSum = arrCols.map((el) => el.sum);
      if (arrCols[i + 1].sum == arrCols[i].sum) {
        arrCols[i + 1].sum *= 2;
        arrCols[i].sum = 0;
        arr.map((el, id) => {
          if (id == arrCols[i].id) {
            el.sum = 0;
          } else if (id == arrCols[i + 1].id) {
            el.sum = arrCols[i + 1].sum;
          }
        });
      }
    }
  }
}
function sumUp(arr) {
  for (let cl = 0; cl <= 3; cl++) {
    for (let i = 1; i <= 3; i++) {
      let arrCols = arr.filter((el) => el.col == cl);
      let arrSum = arrCols.map((el) => el.sum);
      if (arrCols[i - 1].sum == arrCols[i].sum) {
        arrCols[i - 1].sum *= 2;
        arrCols[i].sum = 0;
        arr.map((el, id) => {
          if (id == arrCols[i].id) {
            el.sum = 0;
          } else if (id == arrCols[i - 1].id) {
            el.sum = arrCols[i - 1].sum;
          }
        });
      }
    }
  }
}

function sumRight(arr) {
  for (let rw = 0; rw <= 3; rw++) {
    for (let i = 2; i >= 0; i--) {
      let arrRows = arr.filter((el) => el.row == rw);
      let arrSum = arrRows.map((el) => el.sum);
      if (arrRows[i + 1].sum == arrRows[i].sum) {
        arrRows[i + 1].sum *= 2;
        arrRows[i].sum = 0;
        arr.map((el, id) => {
          if (id == arrRows[i].id) {
            el.sum = 0;
          } else if (id == arrRows[i + 1].id) {
            el.sum = arrRows[i + 1].sum;
          }
        });
      }
    }
  }
}
function sumLeft(arr) {
  for (let rw = 0; rw <= 3; rw++) {
    for (let i = 1; i <= 3; i++) {
      let arrRows = arr.filter((el) => el.row == rw);
      if (arrRows[i - 1].sum == arrRows[i].sum) {
        arrRows[i - 1].sum *= 2;
        arrRows[i].sum = 0;
        arr.map((el, id) => {
          if (id == arrRows[i].id) {
            el.sum = 0;
          } else if (id == arrRows[i - 1].id) {
            el.sum = arrRows[i - 1].sum;
          }
        });
      }
    }
  }
}


async function addUserScore(scr) {
  const res = await fetch("/updateScore", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      score: scr,
    }),
  });
}

if (gameField) {
  addGameField();
  document.querySelector("#save").addEventListener("click", () => {
    addUserScore(scoreCounter(arrSqr));
  });
}




