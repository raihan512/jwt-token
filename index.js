const express = require("express");
const mongoose = require("mongoose");
const todoHandler = require("./routeHandler/todoHandler");

const app = express();
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://maktabatulamzad2023:Raihan1234@cluster0.bhifpq3.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database Connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/todos", todoHandler);

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
