const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const config = require("./utils/config");
const logger = require("./utils/logger");
const blogRouter = require("./controllers/blogs");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connect to MongoDB successfully");
  })
  .catch((error) => {
    logger.error(error);
  });

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogRouter);

module.exports = app;
