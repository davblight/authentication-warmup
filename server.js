const express = require("express");
const User = require("./model");
const app = express();
const setUpAuth = require("./auth");

app.use(express.json());

setUpAuth(app);

app.post("/users", async (req, res) => {
    try {
        let user = await User.create({
            username: req.body.username,
            password: req.body.password
        });
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({
            message: "post request failed to create user",
            error: err
        })
    }
})

module.exports = app