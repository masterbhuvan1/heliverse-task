const fs = require("fs");
const mongoose = require("mongoose");
//for config.env
const dotenv = require("dotenv");
// const Tour = require("../../../model/tourModel.js");
const User = require("../../../models/userModel");
// const Review = require("../../../model/reviewModel.js");
dotenv.config({
  path: "/Users/bhuvanjain02/Desktop/heliverse/backend/config.env",
});
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
//to conect to natours-1
mongoose
  .connect(DB, {
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));
//DONT FORGET TO PARSE IN JSON
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, "utf-8"));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));
// const reviews = JSON.parse(
//   fs.readFileSync(`${__dirname}/reviews.json`, "utf-8")
// );

//FUNCTIONS
const importData = async () => {
  try {
    // await Tour.create(tours);
    // console.log("Data successfully loaded!");
    //for password comfirm ={ validateBeforeSave: false }
    await User.create(users, { validateBeforeSave: false });
    // await Review.create(reviews);
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
const deleteData = async () => {
  try {
    // await Tour.deleteMany();
    await User.deleteMany();
    // await Review.deleteMany();
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
//USE OF PROCESS ARGV
// console.log(process.argv, "nikkk");
// console.log(tours);
if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
