export function scoreCounter(arr) {
    try {
        let scr = 0;
        arr.forEach((el) => {
          scr += el.sum;
        });
        document.querySelector("#currScore").textContent = scr;
        if (Number(document.querySelector("#maxScore").textContent) < scr) {
          document.querySelector("#maxScore").textContent = scr;
        }
        return scr;
    } catch (error) {
        print(error)
    }
    
}
