export function squareClick(arr, index) {
  if (arr[index].isAct == false) {
    arr.forEach((value, key) => {
      arr[key].isAct = false;
      document.getElementById(value.id).classList.remove("square-active");
    });
    arr[index].isAct = true;
    document.getElementById(index).classList.add("square-active");
  }
}
