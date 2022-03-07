const gameField = document.querySelector(".gameField");
let mapSquares = new Map();
let isActive = false;
let arrSqr=[]
let vector = {
  x: 0,
  y: 0,
  dir: null,
};
for (let i = 0; i <= 15; i++) {
  let sqr ={
    div: document.createElement("div"),
    isAct: false,
    id: i
  }
  arrSqr.push(sqr)
  let square = document.createElement("div");
  square.classList.add("__scuare");
  mapSquares.set(i, isActive);
  square.addEventListener("mousedown", (e) => {
    scuareClick(i);
    vector.x = e.pageX ;
    vector.y = e.pageY ;
    console.log(`Текущие координаты клика вниз X:${vector.x}, Y:${vector.y}`);
    e.preventDefault();
  });
  square.addEventListener("mousemove", (e) => {
    e.preventDefault();
  });
  square.addEventListener("mouseup", (e) => {
     
    vector.x = e.pageX - vector.x;
    vector.y = e.pageY  - vector.y;
    console.log(`Текущие координаты клика вверх X:${vector.x}, Y:${vector.y}`);
    if ((vector.x == 0, vector.y == 0)) {
      console.log("noway");
    } else if (Math.abs(vector.x) >= Math.abs(vector.y) && vector.x >= 0) {
      console.log("right");
    } else if (Math.abs(vector.x) < Math.abs(vector.y) && vector.y >= 0) {
      console.log("down");
    } else if (Math.abs(vector.x) >= Math.abs(vector.y) && vector.x < 0) {
      console.log("left");
    } else if (Math.abs(vector.x) < Math.abs(vector.y) && vector.y < 0) {
      console.log("up");
    }
    e.preventDefault();
  });

  // square.addEventListener("keyright", (e) => {
  // console.log("right");
  // });

  square.id = i;
  gameField.appendChild(square);
}
console.log(arrSqr);
for (let j = 0; j <= 3; j++) {
  let startCond = Math.round(Math.random() * 15, 0);
  let startSquare = document.getElementById(`${startCond}`);
  startSquare.textContent = Number(startSquare.textContent) + 2;
  document.getElementById(3).classList.add("scuare-active");
}

function scuareClick(index) {
  if (mapSquares.get(index) == false) {
    mapSquares.forEach((value, key) => {
      document.getElementById(key).classList.remove("scuare-active");
    });
    document.getElementById(index).classList.add("scuare-active");
  }
}
