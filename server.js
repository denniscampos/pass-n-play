//env configuration
require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose"); // check
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const bodyParser = require("body-parser");
const moment = require("moment");
const rateLimit = require("express-rate-limit");
const mainRoutes = require("./routes/main");
const profileRoutes = require("./routes/profile");
const gameRoutes = require("./routes/games");
// const commentsRoutes = require("./routes/main");
// const userRoutes = require("./routes/users");

// Moment JS
moment().format();

// connect to DB
connectDB();

// passport config
require("./config/passport")(passport);

//Middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//api limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 300,
});
app.use(limiter);
app.set("trust proxy", 1); // for heroku

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//logging
app.use(logger("dev"));

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
app.use("/profile", profileRoutes);
app.use("/games", gameRoutes);
// app.use("/homepage", homepageRoutes);
// app.use("/results", homepageRoutes);
// app.use("/comments", commentsRoutes);
// app.use("/search", homepageRoutes);
// app.use("/users", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on Port ${process.env.PORT}`);
});
