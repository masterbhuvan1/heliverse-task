const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const port = process.env.PORT || 3001;
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    // useNewUrlParser: true,
    useUnifiedTopology: true,
    tls: true,
    tlsInsecure: true,
  })
  .then((con) => {
    // console.log(con.connection);
    console.log("Sucess");
  });
app.listen(port, () => {
  console.log(`u r in ${port}`);
});
