import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./routes";
import db from "./config/mongo";
import compression from "compression";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import http from 'http'

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

db().then(() => console.log("DBConexion Ready"));
server.listen(PORT, () => console.log(`El servidor esta corriendo por el puerto http://localhot:${PORT}`));




