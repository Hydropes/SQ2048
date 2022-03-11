import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';
import express from "express";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;
const app= express()
const jsonParser = express.json();
app.set("view engine", "hbs");
app.set("views", "public");

app.use(express.static(path.resolve(__dirname, 'public')))

app.use("/", (req, res) => {
  res.render("index.hbs", {title: 'iii'});
});

app.post("/user", jsonParser, function (request, response) {
  console.log(request.body);
  if (!request.body) return response.sendStatus(400);

  response.json(request.body); // отправляем пришедший ответ обратно
});

app.listen(PORT, ()=>{
  console.log(`Server works on port ${PORT}...`);
})

