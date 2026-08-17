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

export const updateProfile = async ({email, data}) => {
    try {
        
        const updated = await prisma.users.update({
            where:{email}, 
            data: data,
        });
        
        const {id, password, role, created_at, updated_at, ...cleanUser} = updated;
        
        return cleanUser; 
        
    } catch (error) {
        console.log("Problema con el service")
        return{
            success: false,
            message: "No se ha podido actualizar"
        }
    }
};

export const deleteProfile = async ({email}) =>{
    try {

        const profile = await prisma.users.delete({
        where:{email}
        });

        return profile

    } catch (error) {
        console.log("> Ha habido un fallo")
        return{
            success: false,
            message: "No se ha podido eliminar el usuario"
        }
        
    }
};