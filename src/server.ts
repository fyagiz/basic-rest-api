import http from "http";
import express from "express";
import bodyParser from "body-parser";
import logger from "./config/logger";
import config from "./config/config";
import mongoose from "mongoose";

import healthCheckRouter from "./routers/healthCheckRouter";

const NAMESPACE = "Server";
const router = express();

mongoose
    .connect(config.mongo.url, config.mongo.options)
    .then((result) => {
        logger.info(NAMESPACE, `Connectod to mongoDB on ${config.mongo.host}` + (config.mongo.host == "localhost" ? `:${config.mongo.port}` : ""));
    })
    .catch((error) => {
        logger.error(NAMESPACE, error.message, error);
    });

/** Logging the request */
router.use((req, res, next) => {
    logger.info(NAMESPACE, `METHOD - [${req.method}] | URL - [${req.url}] | IP - [${req.socket.remoteAddress}]`);

    res.on("finish", () => {
        logger.info(NAMESPACE, `METHOD - [${req.method}] | URL - [${req.url}] | IP - [${req.socket.remoteAddress}] | STATUS - [${res.statusCode}]`);
    });

    next();
});

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if (req.method != "GET") {
        res.header("Access-Control-Allow-Methods", "GET");
        return res.status(405).json({
            message: "Only HTTP GET method is allowed!",
        });
    }

    next();
});

// /healthcheck
router.use("/api/v1/healthcheck", healthCheckRouter);

router.use((req, res, next) => {
    const error = new Error("not found");

    return res.status(404).json({
        message: error.message,
    });
});

const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => {
    logger.info(NAMESPACE, `Server running on ${config.server.host}:${config.server.port}`);
});
