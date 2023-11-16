require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Phone = require("./models/phone");

morgan.token("data", (req) => {
  if (req.method !== "POST") {
    return "";
  } else {
    return JSON.stringify(req.body);
  }
});

const requestLogger = morgan(
  ":method :url :status :res[content-length] - :response-time ms :data"
);

const errorHandler = (error, request, response, next) => {
  console.log(error.name);
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "MongoServerError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(cors());
app.use(express.static("build/"));
app.use(express.json());
app.use(requestLogger);

// 定义端口
const PORT = process.env.PORT || 3001;

app.get("/api/persons", (req, res) => {
  Phone.find({}).then((phones) => {
    res.json(phones);
  });
});

app.get("/api/persons/:id", (req, res, next) => {
  Phone.findById(req.params.id)
    .then((phone) => {
      res.json(phone);
      if (phone) {
        res.json(phone);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;
  Phone.findByIdAndUpdate(
    req.params.id,
    { name: body.name, number: body.number },
    { runValidators: true, context: "query", returnDocument: "after" }
  )
    .then((phone) => {
      if (phone) {
        res.json(phone);
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Phone.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
});

app.post("/api/persons", (req, res, next) => {
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

  phone
    .save()
    .then((savedPhone) => {
      res.json(savedPhone);
    })
    .catch((error) => next(error));
});

app.get("/api/info", (req, res) => {
  const sum = Phone.count();
  let date = new Date();

  let result = `<p>Phonebook has info for ${sum} people</p>`;
  result = result.concat("\n" + date.toString());
  res.send(result);
});

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
