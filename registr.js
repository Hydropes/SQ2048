
document.getElementById("registration").addEventListener("click", function (e) {
  e.preventDefault();
  // получаем данные формы
  let registerForm = document.forms["registerForm"];
  let userName = registerForm.elements["user"].value;
  let userPass = registerForm.elements["pass"].value;
  // сериализуем данные в json
  let user = JSON.stringify({ userName: userName, userPass: userPass });
  let request = new XMLHttpRequest();
  // посылаем запрос на адрес "/user"
  request.open("POST", "/user", true);
  request.setRequestHeader("Content-Type", "application/json");
  request.addEventListener("load", function () {
    // получаем и парсим ответ сервера
    let receivedUser = JSON.parse(request.response);
    console.log(receivedUser.userName, "-", receivedUser.userPass); // смотрим ответ сервера
  });
  request.send(user);
});
