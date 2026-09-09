import { Role } from "@prisma/client";
import * as authService from "../services/auth.js"
import { nullable } from "../utils/converter.js";

const NODE_ENV = process.env.NODE_ENV

export const register = async (req,res,next) =>{
    try {
        const {name, email, password,} = req.body

        const result = await authService.insertUser({
            name,
            email, 
            password, 
    });

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
        if(!result.success) return res.status(400).json({
            success:false,
            message: result.message
        })

        res.cookie("access_token",
            result.data,{
                maxAge: 3_600_000,
                httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            }
        );
        return res.status(200).json({
            success:true,
            data: "Sesion abierta",
            user: {
                name: result.name,
                email: result.email,
                role: result.role
            }
        });
    } catch (error) {
        next(error)
    }
};

export const logout = async (req,res,next) =>{
        res.clearCookie("access_token")       
    
    return res.status(200).json({
        success:true,
        data:"Sesion cerrada"   
    })
        
        next(error)
    };