import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// Rutas
import indexroutes from "./src/routes/indexroutes.js";

// Documentacion 
import swaggerUI from "swagger-ui-express";     
import fs from "node:fs"

// necesarias por type:module
import { join, dirname  } from "node:path";
import { fileURLToPath } from "node:url";
import { errorHandler } from "./src/middlewares/errorHandler.js";


const app = express()
app.use(express.json());
app.use(cors());
app.use(cookieParser());


const __dirname = dirname(fileURLToPath(import.meta.url))
const swaggerDocument = JSON.parse (fs.readFileSync(join(__dirname, "./swagger.json"), "utf-8"),
)
// Rutas
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use("/api", indexroutes);

// Middleware de error

app.use(errorHandler); 

export default app;