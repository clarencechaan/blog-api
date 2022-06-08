const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");

/* POST create user */
exports.user_post = [
  body("first_name", "First name must be between 1 and 72 characters.")
    .trim()
    .isLength({ min: 1, max: 72 })
    .escape(),
  body("last_name", "Last name must be between 1 and 72 characters.")
    .trim()
    .isLength({ min: 1, max: 72 })
    .escape(),
  body("username", "Username must be between 1 and 24 characters.")
    .trim()
    .isLength({ min: 1, max: 24 })
    .escape(),
  body("password", "Password must be between 1 and 24 characters.")
    .trim()
    .isLength({ min: 1, max: 24 })
    .escape(),
  async function (req, res, next) {
    const errors = validationResult(req);
    const { first_name, last_name, username, password } = req.body;

    try {
      // throw error if errors exist
      if (!errors.isEmpty()) {
        throw errors.array();
      }

      // check if username exists
      const found = await User.findOne({ username: username });
      if (found) {
        res.json({
          error: "User with username `" + username + "` already exists",
        });
        return;
      }

      bcrypt.hash(password, 10, async (err, hashedPassword) => {
        if (err) {
        }
        const user = new User({
          first_name,
          last_name,
          username,
          password: hashedPassword,
        });
        // Save user
        res.json(await user.save());
      });
    } catch (err) {
      res.json(err);
    }
  },
];

/* GET user from JWT sent in request */
exports.user_get = [
  passport.authenticate("jwt", { session: false }),
  async function (req, res, next) {
    try {
      const user = await User.findById(req.user._id, "-password");
      res.json(user);
    } catch (err) {
      res.json(err);
    }
  },
];
