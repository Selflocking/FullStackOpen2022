const express = require("express");

const app = express();

app.use(express.json());

// 定义端口
const POST = 3001;

let phonebook = require("./phonebook.json");

app.get("/", (req, res) => {
  let index = `
<h3>Phone Book</h3>
<ul>
${phonebook
  .map((item) => `<li>name: ${item.name} number: ${item.number}</li>`)
  .join("\n")}
</ul>
`;

  res.send(index);
});

app.get("/api/persons", (req, res) => {
  return res.send(phonebook);
});

app.listen(POST, () => {
  console.log(`Example app listening on port ${POST}`);
});
