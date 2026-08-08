import prisma from "../lib/prisma.js";
import { crypt } from "../utils/pass.js";
import { stringfy } from "../utils/converter.js";
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
