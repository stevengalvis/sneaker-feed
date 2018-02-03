const { BasicStrategy } = require("passport-http");
const express = require("express");
const jsonParser = require("body-parser").json();
const passport = require("passport");

const { User } = require("./model");

const router = express.Router();

router.use(jsonParser);

const basicStrategy = new BasicStrategy((username, password, callback) => {
  let user;
  User.findOne({ username: username })
    .exec()
    .then(_user => {
      user = _user;
      if (!user) {
        return callback(null, false);
      }
      return user.validatePassword(password);
    })
    .then(isValid => {
      if (!isValid) {
        return callback(null, false);
      } else {
        return callback(null, user);
      }
    })
    .catch(err => callback(err));
});

router.use(
  require("express-session")({
    secret: "something something",
    resave: false,
    saveUninitialized: false
  })
);

passport.use(basicStrategy);
router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

router.post("/", (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "No request body" });
  }

  if (!("username" in req.body)) {
    return res.status(422).json({ message: "Missing field: username" });
  }

  let { username, password, firstName, lastName } = req.body;

  if (typeof username !== "string") {
    return res.status(422).json({ message: "Incorrect field type: username" });
  }

  username = username.trim().toLowerCase();

  if (username === "") {
    return res.status(422).json({ message: "Incorrect field length: username" });
  }

  if (!password) {
    return res.status(422).json({ message: "Missing field: password" });
  }

  if (typeof password !== "string") {
    return res.status(422).json({ message: "Incorrect field type: password" });
  }

  password = password.trim();

  if (password === "") {
    return res.status(422).json({ message: "Incorrect field length: password" });
  }

  //check for existing user
  return User.find({ username })
    .count()
    .exec()
    .then(count => {
      if (count > 0) {
        return res.status(422).json({ message: "username already taken" });
      }
      // if user does not existing
      return User.hashPassword(password);
    })
    .then(hash => {
      return User.create({
        username: username,
        password: hash,
        firstName: firstName,
        lastName: lastName
      });
    })
    .then(user => {
      return res.status(201).json(user.apiRepr());
    })
    .catch(err => {
      res.status(500).json({ message: "Internal server error" });
    });
});

const isAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(500).json({ message: "not logged in" });
  }
};
router.get("/", (req, res) => {
  return User.find()
    .exec()
    .then(users => res.json(users.map(user => user.apiRepr())))
    .catch(err => res.status(500).json({ message: "Internal server error" }));
});

router.post("/login", passport.authenticate("basic", { session: true }), (req, res) =>
  res.json({ user: req.user.apiRepr() })
);

router.get("/logout", (req, res) => {
  req.session.destroy(function(err) {
    res.redirect("/");
  });
});

// endpoint for users to add to favorites
router.put("/favorites", isAuthenticated, (req, res) => {
  let user;
  User.findOneAndUpdate({ username: req.user.username }, { $push: { favorites: req.body } }, { new: true })
    .exec()
    .then(_user => {
      user = _user;
      res.status(201).json(user.apiRepr());
    })
    .catch(err => res.status(500).json({ message: "Something went wrong" }));
});

router.get("/favorites", isAuthenticated, (req, res) => {
  let user;
  User.findOne({ username: req.user.username })
    .exec()
    .then(_user => {
      user = _user;
      res.status(201).json(user.apiFavorites());
    })
    .catch(err => res.status(500).json({ message: "could not get favorites list" }));
});

router.get("/favorites/:id", isAuthenticated, (req, res) => {
  let user;
  User.findOne({
    username: req.user.username
  })
    .exec()
    .then(_user => {
      user = _user;
      if (user.isIteminFavorites(req.params.id)) {
        res.status(201).json({ itemInFavorites: "true" });
      }
      res.status(201).json({ itemInFavorites: "false" });
    })
    .catch(err => res.status(500).json({ message: "internal server error" }));
});

// endpoint for removing from favorites
router.post("/favorites", isAuthenticated, (req, res) => {
  let user;
  User.findOneAndUpdate({ username: req.user.username }, { $pull: { favorites: { id: req.body.id } } }, { new: true })
    .exec()
    .then(_user => {
      user = _user;
      res.status(201).json(user.apiFavorites());
    })
    .catch(err => res.status(500).json({ message: "could not delete item" }));
});

module.exports = { router };
