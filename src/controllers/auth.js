import * as authService from "../services/auth.js"
import { nullable } from "../utils/converter.js";

export const register = async (req,res,next) =>{
    try {
        const {name, email, password, age, city, postal_code} = req.body

        const result = await authService.insertUser({
            name,
            email, 
            password, 
            age, 
            city, 
            postal_code: nullable(postal_code)});
        return res.status(200).json({
            success: true,
        })
        
    } catch (error) {
        next(error)
    }
}

export const login = async (req,res,next) =>{
    try {
        
    } catch (error) {
        
    }
}

export const logout = async (req,res,next) =>{
    try {
        
    } catch (error) {
        
    }
}