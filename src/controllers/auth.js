import * as authService from "../services/auth.js"
import { nullable } from "../utils/converter.js";

const NODE_ENV = process.env.NODE_ENV

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

        if(!result.success) return next({
            statusCode: 400,
            message: "Bad Error"
        })
        return res.status(201).json({
            success: true,
        })
        
    } catch (error) {
        next(error)
    }
}

export const login = async (req,res,next) =>{
    try {
        const { email, password } = req.body

        const result = await authService.selectUser({
            email,
            password
        })
        if(!result.success) return next({
            statusCode: 400,
            message: result.message
        })

        res.cookie("access_token",
            result.data,{
                expiresAt: new Date() + 3_600_000,
                httpOnly: true,
                secure: NODE_ENV,
            }
        );
        return res.status(200).json({
            success:true,
        });
    } catch (error) {
        next(error)
    }
};

export const logout = async (req,res,next) =>{
    try {
        
    } catch (error) {
        
    }
}