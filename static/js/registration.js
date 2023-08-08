export function users(){
     // Получение всех пользователей
  async function getUsers() {
     const response = await fetch("/api/users", {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    if (response.ok === true) {
      const users = await response.json();
       console.log(users);
    }
  }
getUsers()
   document.getElementById("registration").addEventListener("click", (e) => {
     e.preventDefault();
     const form = document.forms["registerForm"];
     const name = form.elements["name"].value;
     const pass = form.elements["pass"].value;
     CreateUser(name, pass);
     
   });
  async function CreateUser(userName, userPass) {
    const response = await fetch("api/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userName,
        pass: userPass,
      }),
    });
  }
}