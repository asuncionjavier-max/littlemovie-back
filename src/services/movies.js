import prisma from "../lib/prisma.js"

export const findAllMovies = async (movieIds) =>{
    try {
        return{
            ok:true,
            content: await prisma.movies.findMany({
                orderBy:{id: "asc"},
                omit:{created_at: true, updated_at: true},
                where: {id : {in: movieIds}}
            })
        };
    } catch (error) {
        console.error("Error al traer la lista de peliculas")
        return{
            ok:false,
            content: []
        };
    }
};

export const findMovieById = async (id) =>{
    try {
        const movie = await prisma.movies.findUnique({where: {id},
        omit: {created_at: true, updated_at: true}})
        if(!movie) return {
            ok: false,
            message: "La pelicula que buscas no existe"
        }
        
        return{
            ok: true,
            content: movie
        } 
        
    } catch (error) {
        return{
            ok: false,
            message: "error al consultar la base de datos" 
        };
    }
};

export const createMovie = async (data) => {
    try {
    if(!data) return{
        ok:false,
        message: "No se ha podido añadir la pelicula"
    }
        const newMovie = await prisma.movies.create({data})

        return {
            ok: true,
            content: newMovie
        }
    } catch (error) {
        return {
            ok: false,
            message: "No se ha podido añadir la pelicula"
        }
    }
};

export const updateMovie = async (id, data) =>{
    try {
        const update = await prisma.movies.update({
            where: {id},
            data
        })
        return {
        ok: true,
        content: update
        }
    } catch (error) {
        return {
            ok: false,
            message: "Error al actualizar la pelicula"
        }
    }
}


export const deleteMovie = async (id) =>{
    return await prisma.movies.delete({
        where:{id}
    })
}