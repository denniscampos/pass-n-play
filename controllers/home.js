module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },

  getHomepage: (req, res) => {
    res.render("homepage.ejs");
  },
};
