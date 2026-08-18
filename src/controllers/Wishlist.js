import * as wishlistService from "../services/Wishlist.js"


export const addWish = async (req,res,next) =>{
try {
    const { movie } = req.body;
    
    const {id} = res.locals;
    const result = await wishlistService.addToWishlist({
        movieId: movie,
        userId: id
    })
    if(!result.ok) return next({
        statusCode: 400,
        message: "No se ha podido añadir la pelicula"
    })
    
    return res.status(201).json({
        success:true,
        data: "Pelicula añadida a la wishlist"
    })
    
} catch (error) {
    next(error)
    }
};

export const getWishlist = async (req,res,next) =>{
    const {id} = res.locals;
    
    const result = await wishlistService.getWishlistbyUser({
        userId: id
    });

    if(!result.ok) return  next({
        statusCode: 400,
        message: "No se ha podido traer la wishlist"
    })

    
    return res.status(200).json({
            success: true,
            message: "wishlist",
            data: result.data,
        })
};  


export const deleteWish = async (req,res,next) =>{
    try {
        const { movieId } = req.params;

        const { id } = res.locals;


        const result = await wishlistService.removeFromWishlist(id, movieId)
        return res.status(200).json({
            success: true,
            message: "Eliminado de wishlist"
        })
    } catch (error) {
        next(error)
    }
};