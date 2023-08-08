export function updateSqr(arr) {
  let arrSum = arr.map((el) => el.sum);
  for (let i = 0; i < arrSum.length; i++) {
    if (arrSum[i] == 0) {
      arr[i].div.textContent = "";
    } else {
      arr[i].div.textContent = arrSum[i];
    }
  }
 
  arr.map((el) => {
    if (el.sum > 100) {
      el.div.classList.add("square-yellow");
    } else if (el.sum > 500) {
      el.div.classList.add("square-orange");
    } else if (el.sum > 1000) {
      el.div.classList.add("square-red");
    } else {
      el.div.classList.remove("square-yellow");
      el.div.classList.remove("square-orange");
      el.div.classList.remove("square-red");
    }
  });
}
