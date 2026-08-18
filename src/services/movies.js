import prisma from "../lib/prisma.js"

export const findAllMovies = async () =>{
    return await prisma.movies.findMany({
        orderBy: {id:"asc"},
        omit:{created_at: true, updated_at: true}
    })
};

export const findMovieById = async (id) =>{
    return await prisma.movies.findUnique({
        where: {id}
    })
};

export const createMovie = async (data) => {
    const newMovie = await prisma.movies.create({data})
    return newMovie
};

export const updateMovie = async (id, data) =>{
    const update = await prisma.movies.update({
        where: {id},
        data
    })
    return update
}


export const deleteMovie = async (id) =>{
    return await prisma.movies.delete({
        where:{id}
    })
}