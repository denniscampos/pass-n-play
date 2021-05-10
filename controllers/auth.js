module.exports = {
  getLogin: (req, res) => {
    res.render("login.ejs");
  },
  getReguster: (req, res) => {
    res.render("register.ejs");
  },
};
