import path from "path";
import { fileURLToPath } from 'url';
import fs from 'fs'
import express from "express";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;
const app= express()
const jsonParser = express.json();
let entryFlag =false

app.set("view engine", "hbs");
app.set("views", "public");

app.use(express.static(path.resolve(__dirname, 'public')))


const filePath = "users.json";

//Валидация
app.get("/api/users", function (req, res, next) {
  const content = fs.readFileSync(filePath, "utf8");
  const users = JSON.parse(content);
  res.send(users);
  });


//Регистрация
app.post("/api/users", jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
    const userName = req.body.name;
  const userPass = req.body.pass;
  let user = { id: null, name: userName, pass: userPass, score: 0 };

  let data = fs.readFileSync(filePath, "utf8");
  let users = JSON.parse(data);
  const id = Math.max.apply(

    Math,
    users.map((o)=> o.id)
  );
  user.id = id + 1;
  users.push(user);
  data = JSON.stringify(users);
  fs.writeFileSync("users.json", data);
  
  res.send(user);
});


app.put("/api/users", jsonParser, function (req, res) {
  
  if (!req.body) return res.sendStatus(400);
  const userName = req.body.name;
  const userScore = req.body.score;

  let data = fs.readFileSync(filePath, "utf8");
  const users = JSON.parse(data);
  let user;
  for (var i = 0; i < users.length; i++) {
    if (users[i].name == userName) {
      user = users[i];
      break;
    }
  }
  // изменяем данные у пользователя
  if (user.score < userScore) {
    user.score = userScore;
    data = JSON.stringify(users);
    fs.writeFileSync("users.json", data);
    res.send(user);
  } else {
    res.status(404).send(user);
  }
});

app.get('/', (req, res)=>{
    fs.readFile(filePath, "utf8", (err, data)=>{
      if (err){
        console.log(err);
      }
     
      let users= JSON.parse(data)
       console.log(users);
       res.render("index.hbs", { curName: users[0].name });

    });
    // const users = JSON.parse(content);
    // // console.log(users);
    // res.send(users);
})
  

app.listen(PORT, ()=>{
  console.log(`Server works on port ${PORT}...`);
})

