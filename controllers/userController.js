const User = require("../models/user");

/* POST create user */
exports.user_post = async function (req, res, next) {
  const { first_name, last_name, username, password } = req.body;
  const user = new User({ first_name, last_name, username, password });

  try {
    // check if username exists
    const found = await User.findOne({ username: username });
    if (found) {
      res.json({
        error: "User with username `" + username + "` already exists",
      });
      return;
    }

    // Save user
    res.json(await user.save());
  } catch (err) {
    res.json(err);
  }
};
