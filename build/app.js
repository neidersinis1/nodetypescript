"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import "dotenv/config";
require("dotenv/config");
const express = require("express");
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes/");
const mongo_1 = __importDefault(require("./config/mongo"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import bodyParser from "body-parser";
const http = require("http");
const PORT = process.env.PORT || 3002;
const app = express();
const server = http.createServer(app);
app.use((0, cors_1.default)({
    credentials: true
}));
app.use(express.json());
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
// app.use(bodyParser.json)
app.use(routes_1.router);
(0, mongo_1.default)().then(() => console.log("DATABASE ==> Conexion Ready"));
server.listen(PORT, () => console.log(`Server run on port http://localhot:${PORT}`));
