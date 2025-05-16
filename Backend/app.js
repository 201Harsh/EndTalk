const express = require("express");
const userRouter = require("./routes/user.route");
const ConnectTODB = require("./config/db");
const cors = require("cors");
ConnectTODB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRouter);

module.exports = app;
