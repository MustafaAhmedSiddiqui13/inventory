const mongoose = require("mongoose");

const uri = "mongodb://localhost:27017/inventory";

function main() {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB Atlas successfully!");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB Atlas:", err);
    });
}

module.exports = { main };
