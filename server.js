import app from "./app.js";
import "dotenv/config";

const PORT = process.env.PORT

app.listen(PORT, () =>{
    console.log(`Server funcionando en el puerto en http://localhost:${PORT}`)
})