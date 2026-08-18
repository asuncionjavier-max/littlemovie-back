import app from "./app.js";
import "dotenv/config";
import { dbConnect } from "./src/config/database.js";

const PORT = process.env.PORT;

app.listen(PORT, async () =>{
    try {
        await dbConnect()
        console.log(`Server funcionando en el puerto en http://localhost:${PORT}`)
        
    } catch (error) {
        console.error(">error connecting database", error.message)
        process.exit(1)
    };
})