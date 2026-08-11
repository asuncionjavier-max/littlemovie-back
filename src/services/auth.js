import prisma from "../lib/prisma.js";
import { comparePass, crypt } from "../utils/pass.js";
import { stringfy } from "../utils/converter.js";
import { sign } from "../utils/jwt.js";
export const insertUser = async ({ password, ...user }) =>{
try {
    
        const hashedPass = await crypt(stringfy(password))
            await prisma.users.create({
            data: {...user, password: hashedPass} });
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
    const user = await prisma.users.findUnique({
        select: { name: true, password: true, role: true, age: true},
        where: {email}, 
    });
    const validPass = await comparePass(stringfy(password), user.password);

    if(!user || !validPass) return {success :false, message: "Email o contraseña incorrecto"};

    const {name, age } = user

    const token = sign({name, email, age}) 
    
    return {
    success: true,
    data: token
    };
    
} catch (error) {
console.log(">error querying user", error.message);
    return{
    success: false,
        };
}
}