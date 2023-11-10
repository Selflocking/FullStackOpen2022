const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(morgan("tiny"));

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

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = phonebook.filter((item) => item.id === id);
  if (item.length > 0) {
    res.json(item);
  } else {
    res.status(404);
    res.send(`<p>Not found this id: ${id} person"</p>`);
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  phonebook = phonebook.filter((item) => item.id !== id);
  res.status(200).end();
});

const generateId = () => {
  const min = 1;
  const max = 1000000;
  return Math.floor(Math.random() * (max - min) + min);
};

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      msg: "error",
    });
  }

  if (!body.name) {
    return res.status(400).json({
      error: "name missing",
    });
  }

  if (!body.number) {
    return res.status(400).json({
      error: "number missing",
    });
  }

  found = phonebook.find((item) => item.name === body.name);
  if (found) {
    return res.status(400).json({
      error: "name has exist",
    });
  }

  const item = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  phonebook = phonebook.concat(item);

  res.status(200).end();
});

app.get("/api/info", (req, res) => {
  const sum = phonebook.length;
  let date = new Date();

  let result = `<p>Phonebook has info for ${sum} people</p>`;
  result = result.concat("\n" + date.toString());
  res.send(result);
});

app.listen(POST, () => {
  console.log(`Example app listening on port ${POST}`);
});
