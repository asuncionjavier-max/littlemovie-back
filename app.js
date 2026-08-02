import express from "express";

const app = express()

app.use(express.json());


// app.use((req,res,next) =>{
//     next({statusCode: 500, error: new Error("ruta no encontrada") });
// });


app.get("/", (req,res) =>{
    res.send('Hola desde el servidor')
});
// Middleware de error

app.use(({statusCode, error}, req, res, next) =>{
    console.log("Source not found")
    return res.status(statusCode).json({
        success: false,
        error: error.message
    })
});
export default app;