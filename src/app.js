const express = require("express");
const routes = require("./routes");
const LoggerMiddleware = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const app = express();

app.use(express.json());
app.use(LoggerMiddleware);

app.use("/api", routes);

app.get("/", (req, res) => {
    res.send("Api del curso de express js");
});

app.use(errorHandler);

module.exports = app;
