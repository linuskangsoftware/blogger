const express = require("express");
const path = require("path");
const cors = require('cors');

const { logger } = require('./utils/winston');
const pageRoutes = require("./endpoints/pages")
const apiRoutes = require("./endpoints/api");
const srcRoutes = require("./endpoints/src");
const config = require("../configuration.json");

const port = config.port || 3000;
const host = config.host || "0.0.0.0";
const blogger_version = "1.0.0-4"

const log = logger();
const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'views')));
app.set("views", path.join(__dirname, "views"));

app.use((req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    log.info(`[client-ip] Incoming request from: ${ip} - ${req.method} ${req.url}`);
    next();
});
app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use(pageRoutes);
app.use('/v1', apiRoutes);
app.use('/src', srcRoutes);
app.use((req, res, next) => { res.status(404).send('404 Not Found'); });
app.use((err, req, res, next) => {
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    log.error(`Client IP: ${clientIp}, Error: ${err.stack}`);
    res.status(500).send("Internal Server Error. Please try again later.");
});

app.listen(port, host, () => {
    log.info(`Thanks for using Blogger! Made with ❤️ by Linus`);
    log.info(`Version: ${blogger_version}`);
    log.info(`Blogger is ready on http://${host}:${port}`);
});