import jwt from "jsonwebtoken";
import "dotenv/config";

const SECRET = process.env.JWT_SECRET

export const sign = (payload) =>{
return jwt.sign(payload, SECRET, {expiresIn: "1h"} )
}

export const verify = (token) =>{
    try {
    return jwt.verify(token, SECRET)
    
} catch (error) {
    console.log("> Error veryfing");
    return false;
    }
};