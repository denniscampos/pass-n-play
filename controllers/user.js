const User = require("../models/User");
const moment = require("moment");

module.exports = {
  getUsers: async (req, res) => {
    try {
      const users = await User.find(req.userName);

      res.render("users", {
        users: users,
        email: req.user.email,
        moment: moment,
      });
    } catch (err) {
      console.log(err);
    }
  },

  getFollowers: async (req, res) => {
    try {
      const users = await User.find(req.userName);
      console.log(users);
      // console.log(users);
    } catch (err) {
      console.log(err);
    }
  },
};
