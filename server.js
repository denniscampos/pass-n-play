const express = require("express");
const MongoDB = require("mongodb"); // check
const app = express();
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");

//env configuration
require("dotenv").config();

// connec to DB
connectDB();

//Middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set up routes for server
app.use("/", mainRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on Port ${process.env.PORT}`);
});

// Mongoose, nodemon, passport
