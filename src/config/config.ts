import dotenv from "dotenv";

dotenv.config();

const SERVER_HOST = process.env.HOST || "localhost";
const SERVER_PORT = process.env.PORT || 8000;

const MONGO_OPTIONS = {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true,
};

const MONGO_HOST = process.env.MONGO_HOST || "localhost";
const MONGO_PORT = process.env.MONGO_PORT || "27017";
const MONGO_USERNAME = process.env.MONGO_USERNAME || "admin";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "admin";
const DB_NAME = process.env.DB_NAME || "testdb";

const MONGO = {
    host: MONGO_HOST,
    port: MONGO_PORT,
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    options: MONGO_OPTIONS,
    url:
        MONGO_HOST == "localhost"
            ? `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${DB_NAME}?authSource=admin`
            : `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${DB_NAME}?authSource=admin`,
};

const SERVER = {
    host: SERVER_HOST,
    port: SERVER_PORT,
};

const config = {
    mongo: MONGO,
    server: SERVER,
};

export default config;
