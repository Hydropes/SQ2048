
export function scoreData(){
    document.querySelector('#save').addEventListener('click', (e)=>{
        let curUser = document.querySelector("#curUser").textContent;
        if (curUser != "noName"){
            let score = parseInt(
              document.querySelector("#maxScore").textContent
            );
            updateScore(curUser, score)
            getScore().then(
              
            );
           


        }
    })
     async function updateScore(userName, userScore) {
        await fetch("api/users", {
         method: "PUT",
         headers: {
           Accept: "application/json",
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
              name: userName,
              score: userScore
         }),
       });
      
     }
     async function getScore(){
      const res=  await fetch("api/users",{
         method: "GET",
         headers:{
           Accept: "application/json",
           'Content-Type': "application/json"
         }
       })
       if (res.ok === true) {
         const users = await res.json();
         return users.map(el=>el.score)
    
       }
     }

}