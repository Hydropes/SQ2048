import {updateSqr} from './updateSqr.js'
export function randAdd(arr) {
  let emptArr = arr.filter((el) => el.sum == 0);
  if (emptArr.length >= 2) {
    let startCond = Math.floor(Math.random() * emptArr.length, 0);
    arr[emptArr[startCond].id].sum += 2;
    updateSqr(arr);
    arr[startCond].isAct = true;
      // document.getElementById(startCond).classList.add("square-active");
    } else {
    console.log("Game Over");
  }
}
