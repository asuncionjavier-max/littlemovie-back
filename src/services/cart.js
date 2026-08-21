import prisma from "../lib/prisma.js"
import { findMovieById } from "./movies.js";


export const cartFromUser = async (id) =>{
    try {
        if(!id)return {
            ok: false,
            message: "Vuelve ha hacer login"
        };
        const cart = await prisma.cart.findFirst({
            where: {user_id:id},
        include: {
            cart_movies: {
                select: {
                    movies: true
                }
            }
        }
    });
    const movies = cart?.cart_movies.map(item => {const {created_at, updated_at, ...movieData} = item.movies;
        return movieData || []})
    return {
        ok: true,
        content: movies
    }
    } catch (error) {
        return{
            
        }
    }

};

export const addMovieToCart = async (id, movieId) =>{
    try {

        const parsedMovie = Number(movieId);

        if(isNaN(parsedMovie)){
            return{
            ok: false,
            message: "El id de la pelicula tiene que ser un numero"
        }
    };
        const movieResult = await findMovieById(parsedMovie);

        if (!movieResult.ok) {
            return {
                ok: false,
                message: "La película no existe"
            };
    };

        let userCart = await prisma.cart.findFirst ({
            where: {user_id: id},
            select:{id: true}
        });

        if(!userCart){
            userCart = await prisma.cart.create({
            data: {user_id: id},
            select:{id: true}
            })
        }
        const movieAdded =  await prisma.cart_movies.create({
            data: {
                cart_id: userCart.id,
                movie_id: parsedMovie
            }
    })
        return{
            ok: true,
            content: movieResult.content
        }
    } catch (error) {
        console.error(">Ha habido un problema", error)
        return{
            ok:false,
            message: "No se ha podido añadir la pelicula"
        }
    }
    };

export const deleteMovieFromCar = async (id,movieId) =>{
    try {
        const parsedMovie = Number(movieId);

        if(isNaN(parsedMovie)){
            return{
            ok: false,
            message: "El id de la pelicula tiene que ser un numero"
        } 
    };
        let userCart = await prisma.cart.findFirst({
            where:{user_id: id}
        }) ;

        if(!userCart){
        userCart = await prisma.cart.create({
                data: {user_id: id},
                select: {id: true}
            })
        };
    
        const removeMovie = await prisma.cart_movies.deleteMany({
            where:{
                cart_id: userCart.id,
                movie_id: parsedMovie}
        })
        return {
            ok: true,
            message: "Pelicuala eliminada del carrito",
        }
    } catch (error) {
        return{
            ok:false,
            message: "no se ha podido eliminar la pelicula"
        }
        
    }
}