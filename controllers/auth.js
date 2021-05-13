const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");

// exports = {
//   getLogin: (req, res) => {
//     res.render("login.ejs");
//   },
//   getRegister: (req, res) => {
//     res.render("register.ejs");
//   },
// };

exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/homepage");
  }
  res.render("login", {
    title: "Login",
  });
};

exports.getRegister = (req, res) => {
  if (req.user) {
    return res.redirect("/homepage");
  }
  res.render("register", {
    title: "Create Account",
  });
};

exports.postRegister = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("../register");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });

  User.findOne(
    { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        req.flash("errors", {
          msg: "Account with that email address or username already exists.",
        });
        return res.redirect("../register");
      }
      user.save((err) => {
        if (err) {
          return next(err);
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          res.redirect("/homepage");
        });
      });
    }
  );
};
