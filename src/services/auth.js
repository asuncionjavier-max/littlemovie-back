import prisma from "../lib/prisma.js";
import { comparePass, crypt } from "../utils/pass.js";
import { stringfy, nullable } from "../utils/converter.js";
import { sign } from "../utils/jwt.js";

export const insertUser = async ({ password, postal_code, ...user }) =>{
try {
    
        const hashedPass = await crypt(stringfy(password));

        const isNull = nullable(postal_code);
        
            await prisma.users.create({
            data: {...user, password: hashedPass, postal_code: isNull} });
            return {
                success: true,
            }
} catch (error) {
console.log(">error insert user", error.message);
return{
    success: false,
    response: null
        };
    }
};


export const selectUser = async ({email, password}) =>{
try {

    if(!email || !password) return ({success: false, message: "Email y contraseña obligatorios"})
    const user = await prisma.users.findUnique({
        select: { id: true, name: true, password: true, role: true, },
        where: {email}, 
    });
    if(!user) return {success :false, message: "Email o contraseña incorrecto"};


    const validPass = await comparePass(stringfy(password), user.password);

    if(!user || !validPass) return {success :false, message: "Email o contraseña incorrecto"};

    const {name, role, id } = user

    const token = sign({name, email, role: user.role, id: user.id}) 
    
    return {
    success: true,
    data: token
    };
    
} catch (error) {
console.log(">error querying user", error.message);
    return{
    success: false,
    message: "error al procesar solicitud"
        };
}
}