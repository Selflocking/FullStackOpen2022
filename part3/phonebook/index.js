require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Phone = require("./models/phone");

morgan.token("data", (req, res) => {
  if (req.method !== "POST") {
    return "";
  } else {
    return JSON.stringify(req.body);
  }
});

app.use(cors());
app.use(express.static("build/"));
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

// 定义端口
const PORT = process.env.PORT || 3001;

app.get("/api/persons", (req, res) => {
  Phone.find({}).then((phones) => {
    res.json(phones);
  });
});

app.get("/api/persons/:id", (req, res) => {
  Phone.findById(req.params.id).then((phone) => {
    res.json(phone);
  });
});

app.delete("/api/persons/:id", (req, res) => {
  Phone.findByIdAndDelete(req.params.id).then((phone) => {
    res.json(phone);
    res.status(200).end();
  });
});

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

  const phone = new Phone({
    name: body.name,
    number: body.number,
  });

  phone.save().then((savedPhone) => {
    res.json(savedPhone);
  });
});

app.get("/api/info", (req, res) => {
  const sum = Phone.count();
  let date = new Date();

  let result = `<p>Phonebook has info for ${sum} people</p>`;
  result = result.concat("\n" + date.toString());
  res.send(result);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
