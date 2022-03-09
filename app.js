const gameField = document.querySelector(".gameField");
let mapSquares = new Map();
let isActive = false;
let arrSqr = [];
let vector = {
  x: 0,
  y: 0,
  dir: "noway",
};
let startFlag = true;
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
    // console.log("Массив при создании: ", arrSqr);

    sqr.div.classList.add("__scuare");
    // mapSquares.set(i, isActive);

    sqr.div.addEventListener("mousedown", (e) => {
      scuareClick(i);

      vector.x = e.pageX;
      vector.y = e.pageY;
      e.preventDefault();
    });

    sqr.div.addEventListener("mousemove", (e) => {
      e.preventDefault();
    });

    sqr.div.addEventListener("mouseup", (e) => {
      vector.x = e.pageX - vector.x;
      vector.y = e.pageY - vector.y;
      direction();
      moveLine(vector, arrSqr);
      e.preventDefault();
    });

    sqr.div.id = i;
    gameField.appendChild(sqr.div);
  }
}
addGameField();
randAdd(arrSqr);

function randAdd(arr, startFlag) {
  let emptArr = [];

  // for (let j = 0; j <= 2; j++) {
  emptArr = arr.filter((el) => el.sum == 0);
  if (emptArr.length >= 2) {
    let startCond = Math.floor(Math.random() * emptArr.length, 0);
    let startSquare = document.getElementById(`${emptArr[startCond].id}`);
    startSquare.textContent = Number(startSquare.textContent) + 2;
    arr[emptArr[startCond].id].sum += 2;
    if (startFlag == true) {
      arr[startCond].isAct = true;
      document.getElementById(startCond).classList.add("scuare-active");
      startFlag = false;
    }
  } else {
    console.log("Game Over");
  }
  // }
  emptArr = arr.filter((el) => el.sum == 0);
  // console.log(emptArr);
}

function scuareClick(index) {
  if (arrSqr[index].isAct == false) {
    arrSqr.forEach((value, key) => {
      arrSqr[key].isAct = false;
      document.getElementById(value.id).classList.remove("scuare-active");
    });
    arrSqr[index].isAct = true;
    document.getElementById(index).classList.add("scuare-active");
  }
}

function moveLine(vect, arr) {
  let acts = arr.map((el) => el.isAct);
  let currAct = acts.indexOf(true);

  if (vect.dir === "down" && currAct < 12) {
    // Обходим столбцы:
    // Если выше текущего элемента(по обходу строки) есть элемент, который равен текущему, то суммируем,
    // Если ниже текущего элемента есть пустой элемент, то текущий становится пустым, а нижний получает значение текущего
    // Когда итерации закончены, переходим к следующему столбцу
    console.log("Итерация:");
    //НА СЛОЖЕНИЕ
    for (let cl = 0; cl <= 3; cl++) {
      let arrCol = arr.filter((el) => el.col == cl);
      let arrSum = arrCol.map((el) => el.sum);
      // console.log(arrSum);

      for (let rw = 3; rw >= 1; rw--) {
        let newArrSum = arrSum.filter((el, index) => index < rw);
        // console.log(newArrSum);

        if (newArrSum.includes(arrCol[rw].sum) && arrCol[rw].sum != 0) {
          let idxEq = newArrSum.indexOf(arrCol[rw].sum);
          // if (idxEq ==0){
          for (iter = 0; iter <= idxEq; iter++) {}
          arr.find((el) => el.row == idxEq && el.col == cl).div.textContent =
            "";
          arr.find((el) => el.row == idxEq && el.col == cl).sum = 0;

          arr.find((el) => el.row == rw && el.col == cl).sum += arrCol[rw].sum;
          arr.find((el) => el.row == rw && el.col == cl).div.textContent =
            arr.find((el) => el.row == rw && el.col == cl).sum;
          rw--;
        }
        //НА СДВИГ
      }
    }

    //НА СДВИГ
    for (let cl = 0; cl <= 3; cl++) {
       for (let rw = 1; rw <= 3; rw++) {
        let a = arr.find((el) => el.row == rw - 1 && el.col == cl).sum;
        let b = arr.find((el) => el.row == rw && el.col == cl).sum;
        if (rw > 0 && b == 0 && a != 0) {
          // console.log(
          //   `Колонка:${cl} Строка: ${rw} Значение в ней: ${b} Значение в строке выше: ${a}`
          // );
          arr.map((el) => {
            if (el.id == rw * 4 + cl) {
              el.sum = a;
              el.div.textContent = a;
            }
            if (el.id == (rw - 1) * 4 + cl) {
              el.sum = b;
              el.div.textContent = "";
            }
          });
        }else{
          // console.log('На этом шаге не было итерраций');
        }
      }
      // console.log(arr.filter((el) => el.col == cl));
    }

    randAdd(arr);

    while (currAct < 12) {
      currAct += 4;
    }
    activeSqr(arrSqr, currAct);
  } else if (vect.dir === "up" && currAct > 3) {
    while (currAct > 3) {
      currAct -= 4;
    }
    activeSqr(arrSqr, currAct);
  } else if (vect.dir === "left" && currAct % 4 != 0) {
    currAct = currAct - (currAct % 4);
    activeSqr(arrSqr, currAct);
  } else if (vect.dir === "right" && currAct % 4 != 3) {
    currAct = currAct + 3 - (currAct % 4);
    activeSqr(arrSqr, currAct);
  }
}

function activeSqr(arr, newAct) {
  arr.forEach((value, key) => {
    arr[key].isAct = false;
    document.getElementById(key).classList.remove("scuare-active");
  });
  arr[newAct].isAct = true;
  document.getElementById(newAct).classList.add("scuare-active");
}

function direction() {
  if ((vector.x == 0, vector.y == 0)) {
    //console.log("noway");
    vector.dir = "noway";
  } else if (Math.abs(vector.x) >= Math.abs(vector.y) && vector.x >= 0) {
    // console.log("right");
    vector.dir = "right";
  } else if (Math.abs(vector.x) < Math.abs(vector.y) && vector.y >= 0) {
    //console.log("down");
    vector.dir = "down";
  } else if (Math.abs(vector.x) >= Math.abs(vector.y) && vector.x < 0) {
    //console.log("left");
    vector.dir = "left";
  } else if (Math.abs(vector.x) < Math.abs(vector.y) && vector.y < 0) {
    // console.log("up");
    vector.dir = "up";
  }
}
