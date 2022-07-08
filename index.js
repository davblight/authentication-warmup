const app = require(`./server`);
const mongo = require(`./mongo`);

mongo.onConnect(() => {
    app.listen(8080, () => {
        console.log(`Server is running on port 8080`);
    });
});

mongo.connect