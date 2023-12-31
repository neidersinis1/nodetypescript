// import "dotenv/config";
require("dotenv/config");
const express = require("express")
import cors from "cors";
import { router } from "./routes/";
import db from "./config/mongo";
import compression from "compression"
import cookieParser from "cookie-parser"
// import bodyParser from "body-parser";
import http = require('http')

const PORT = process.env.PORT || 3002;
const app = express();
const server = http.createServer(app)

app.use(cors({
  credentials: true
}));

app.use(express.json());
app.use(compression())
app.use(cookieParser())
// app.use(bodyParser.json)
app.use(router);

db().then(() => console.log("DATABASE ==> Conexion Ready"));
server.listen(PORT, () => console.log(`Server run on port http://localhot:${PORT}`));




