const user = require("../controller/userController.js");
const userRoute = require("express").Router();
const passport = require("passport");

// Create a new user
userRoute.post("/register", user.create);

// Retrieve a single user with id
userRoute.post("/login", user.login);

// Retrieve the data of the logged in user
userRoute.get('/profile', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  return res.json({
    player: req.user
  });
});

module.exports = userRoute;