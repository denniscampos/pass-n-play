const express = require("express");
const app = express();
const mongoose = require("mongoose"); // check
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");

//env configuration
require("dotenv").config();

// connect to DB
connectDB();

// passport config
require("./config/passport")(passport);

//Middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Use forms for put / delete
app.use(methodOverride("_method"));

// Passport to send to MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// flash messages for errors, info, etc.
app.use(flash());

// set up routes for server
app.use("/", mainRoutes);

// check to reroute this code below
// app.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/login",
//     failureFlash: true,
//   })
// );

app.listen(process.env.PORT, () => {
  console.log(`Server running on Port ${process.env.PORT}`);
});
