import * as cartService from "../services/cart.js";

export const getCart = async (req,res,next) =>{
    try {
        const {id} = res.locals;

        const userCart = await cartService.cartFromUser(id)

        return res.status(200).json({
            success:true,
            message: "Carrito del usuario",
            data: userCart.content || []
        })
    } catch (error) {
        next(error)
    }
};

export const addMovieToCart = async (req,res,next) =>{
    try {
        const {id} = res.locals;
        const {movieId} = req.body;

        if(!movieId) return next({
        statusCode: 400,
        message: "Añade una pelicula"
        });

        const MovieToCart = await cartService.addMovieToCart(id, movieId)

        if (!MovieToCart.ok) {
            return next({
                statusCode: 400,
                message: MovieToCart.message
            });
        }
        return res.status(200).json({
            success:true,
            message: "Pelicula añadida al carrito",
            data: MovieToCart.content
        })
    } catch (error) {
        next(error)
    }
};

export const deleteMovieToCart = async (req,res,next) =>{
    try {
        const {id} = res.locals;
        const {movieId} = req.body;

        if(isNaN(movieId)) return next({
        statusCode: 400,
        message: "Añade una pelicula"
        });

        const removed = await cartService.deleteMovieFromCar(id, movieId)

        return res.status(200).json({
            success:true,
            message: "Pelicula quitada del carrito"
        })
    } catch (error) {
        next(error)
    }
};