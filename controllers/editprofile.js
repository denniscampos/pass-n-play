const axios = require("axios").default;
const Edit = require("../models/Edit");

module.exports = {
  getEdit: async (req, res) => {
    try {
      res.render("editProfile");
    } catch (err) {
      console.log(err);
    }
  },
};
