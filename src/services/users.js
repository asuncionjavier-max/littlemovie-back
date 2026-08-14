import prisma from "../lib/prisma.js";
import { comparePass } from "../utils/pass.js";

export const getProfile = async ({email}) =>{
    try {
        const profile =  await prisma.users.findUnique({
            where:{email},
            select:{name:true, age:true, email: true}
        })
        return profile
    } catch (error) {
        console.log(">bad error")
        return {
        success: false,
        message: "Ha habido un problema"
        }      
    }
};

export const deleteProfile = async ({email, password}) =>{
    try {

        console.log(">intentando borrar email ", email)
        const profile = await prisma.users.delete({
        where:{email}
        });

        console.log("Resultado del borrado:", profile);
        return profile

    } catch (error) {
        console.log("> Ha habido un fallo")
        return{
            success: false,
            message: "No se ha podido eliminar el usuario"
        }
        
    }
};