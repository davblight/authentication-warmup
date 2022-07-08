const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./model");

passport.use(new localStrategy(async (username, password, done) => {
    let user;
    try {
        user = await User.findOne({"username": username, "password": password});
        if (!user) {
            done(null, false);
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

const setUpAuth = function (app) {
    app.use(passport.initialize());
    app.use(passport.authenticate("session"));

    passport.serializeUser(function (user, callback) {
        callback(null, {
            id: user._id,
            username: user.username
        })
    });
    passport.deserializeUser(function (user, callback) {
        return callback(null, user);
    });
    app.post("/session", passport.authenticate("local"), (req, res) => {
        res.status(201).json({
            message: "successfully created session",
            username: req.user.username,
            user_id: req.user._id,
        });
    });
    app.get("/session", (req, res) => {
        if (!req.user) {
            res.status(401).json({ message: "unauthenticated -- please log in" });
            return;
        }
        res.status(200).json({
            message: "successfully authenticated",
            username: req.user.username
        });
    });
};

module.exports = setUpAuth