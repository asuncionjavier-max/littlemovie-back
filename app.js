import express from "express";
import cors from "cors";
// Rutas
import indexroutes from "./src/routes/indexroutes.js";

// Documentacion 
import swaggerUI from "swagger-ui-express";     
import fs from "node:fs"

// necesarias por type:module
import { join, dirname  } from "node:path";
import { fileURLToPath } from "node:url";


const app = express()
app.use(express.json());
app.use(cors());


const __dirname = dirname(fileURLToPath(import.meta.url))
const swaggerDocument = JSON.parse (fs.readFileSync(join(__dirname, "./swagger.json"), "utf-8"),
)
// Rutas
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use("/api", indexroutes);

// Middleware de error
app.use((err, req, res, next) =>{
    console.log("error interceptado", err)
    const statusCode = err.statusCode || 500;

    const message = err.message || "Ha habido un problema"
    return res.status(statusCode).json({
        success: false,
        message: message
    })
});


export default app;