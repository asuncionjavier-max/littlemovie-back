import * as userService from "../services/users.js"

export const getMe = async (req,res,next) =>{
    try {
        const { email } = res.locals;

        if(!email) return next({statusCode: 400, message: "Error 1"});

        const profile = await userService.getProfile({email});

        if(!profile) return next({statusCode: 400, message: "Error 2"});


        res.status(200).json({
            success: true,
            data: profile
        });

    } catch (error) {
        next(error)
    }
};
export const updateAcount = async (req,res,next) =>{
try {
    const {email} = res.locals;
    const {name, age, city, postal_code} = req.body;

    const updateUser = await userService.updateProfile({ email, 
        data :{
            name,
            age,
            city,
            postal_code}
            }
    );

    res.status(201).json({
        success: true,
        data: updateUser,
        message: "usuario actualizado"
    });

} catch (error) {
    next(error)
}
};
export const deleteAcount = async (req,res,next) =>{
    try {
        const {email} = res.locals;

        const deleteProfile = await userService.deleteProfile({email})


        res.clearCookie("access_token")

        res.status(200).json({
            success: true,
            data: "Usuario eliminado"
        });

    } catch (error) {
        next(error)
    }
};