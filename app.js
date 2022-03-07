const gameField = document.querySelector(".gameField");
let mapSquares = new Map();
let isActive = false;
for (let i = 0; i <= 15; i++) {
  let square = document.createElement("div");
  square.classList.add("__scuare");
  mapSquares.set(i, isActive);
  square.addEventListener("click", () => {
   scuareClick(i)
    // square.classList.add("scuare-active");
  });
  square.id = i;
  gameField.appendChild(square);
}
let startCond = Math.round(Math.random() * 15, 0);
let startSquare = document.getElementById(`${startCond}`);
startSquare.textContent = "2";

function scuareClick(index){
     if (mapSquares.get(index) == false) {
       mapSquares.forEach((value, key) => {
         document.getElementById(key).classList.remove("scuare-active");
       });
       document.getElementById(index).classList.add("scuare-active");
     } 
}