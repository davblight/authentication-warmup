const mongoose = require("mongoose");
const db = mongoose.connection;

async function connect() {
    let connectString = `mongodb+srv://<username>:<password>@cluster0.f0la0.mongodb.net/?retryWrites=true&w=majority`
    try {
        await mongoose.connect(connectString, {
            userNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (err) {
        console.log("error connectign to mongoose", err);
        throw "Mongoose couldn't connect";
    }
}

function onConnect(callback) {
    db.once("open", () => {
        console.log("mongo connection open");
        callback();
    });
}

module.exports = {
    connect,
    onConnect,
}