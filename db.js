const mongoose = require("mongoose");
const DBURI =
    "mongodb+srv://hayk:simplepassword@cluster0.abb8c.mongodb.net/users?retryWrites=true&w=majority";

async function connectToDB() {
    try {
        await mongoose.connect(DBURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log("connected to DataBase");
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = connectToDB;
