const express = require("express");
const userRouter = require("./routes/user.route");
const ConnectTODB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
ConnectTODB();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRouter);

module.exports = app;
