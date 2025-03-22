const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb+srv://shevchyshen:BcVJVkcbwScVhOch@testcluster.k9d7b.mongodb.net/").then(() => {
  console.log("db ok")
})

app.get("/", (req, res) => {
  res.send("Hello Word")
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})