const express = require("express");
const connectToDB = require("./db");
const adminRoute = require("./routes/admin");
const app = express();

express.urlencoded({ extended: false });

connectToDB();

app.use(express.json());

const auth = require("./routes/auth");

app.use("/api/user", auth);

app.use("/admin", adminRoute);

app.listen(3000, () => console.log("Server is running"));
