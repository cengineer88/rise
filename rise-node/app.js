const express = require("express");
const cors = require("cors");
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.get("/priorities", function (req, res) {
  const data = [
    { id: 0, name: "Urgent", color: "#d4380d", bgColor: "volcano" },
    { id: 1, name: "Regular", color: "#389e0d", bgColor: "green" },
    { id: 2, name: "Trivial", color: "#1d39c4", bgColor: "geekblue" },
  ];
  res.status(200).send(data);
});

module.exports = app;
