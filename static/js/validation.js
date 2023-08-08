export function validation() {
    async function entry(){
        const res = await fetch("/api/users", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        if (res.ok === true){
            const users = await res.json();
             const form = document.forms["registerForm"];
             const name = form.elements["name"].value;
             const pass = form.elements["pass"].value;
             const user = document.querySelector("#curUser");
        }
       
    }
    document.querySelector("#entry").addEventListener('click', (e)=>{
        e.preventDefault()
        entry();
    })
}
