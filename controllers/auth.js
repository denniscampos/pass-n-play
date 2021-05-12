module.exports = {
  getLogin: (req, res) => {
    res.render("login.ejs");
  },
  getRegister: (req, res) => {
    res.render("register.ejs");
  },
};
