import  { Wishlist}  from "../config/models/Wishlist.js";
import { findAllMovies } from "./movies.js";


export const addToWishlist = async ({userId, movieId}) =>{
try {
    const item = new Wishlist({userId, movieId})
    await item.save()

    return {
        ok: true
    };
} catch (error) {
    console.error("> Error añadiendo la pelicula a la wishlist:", error)
    return{
        ok: false,
        message: "No se ha podido añadir"
    }
    }
};

export const getWishlistbyUser = async ({userId}) =>{
try {

    const list = await Wishlist.find(
        {userId},
        { movieId: true, _id: false },
    );
    
    const { content } = await findAllMovies(list.map(({movieId}) => movieId))
    return{
        ok: true,
        data: content
    };
} catch (error) {
    console.error(">Error al traer la wishlist del usuario", error);
    return{
        ok: false,
        message: "No hemos podido traer tu wishlist"
        }
    };
};

export const removeFromWishlist = async (userId, movieId) =>{
try {
    const result = await Wishlist.findOneAndDelete({ userId, movieId })
    
    if(!result) return ({
        ok: false
    })
    return{
        ok: true,
    }
} catch (error) {
    console.error("> no se ha podido eliminar la pelicula", error);
    return{
        ok: false,
        message: " No se ha podido eliminar la pelicula"
    }
}

};