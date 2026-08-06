import * as moviesService from "../services/movies.js"

export const getMovies = async (req ,res, next) =>{
    try {
        const data = await moviesService.findAllMovies( )
        return res.status(200).json({
            success: true,
            data: data
        });

    } catch (error) {
        next({statusCode: 404, message: new Error("Ha habido un problema")})
    }
};

export const getMovieById = async (req,res,next) =>{
    try {
        const id = parseInt(req.params.id)
        if(isNaN(id)){
            return next({statusCode: 400, message: "El id tiene que ser un numero"})
        };
        
        const data = await moviesService.findMovieById(id)
        if(!data) {
            return next({ statusCode: 404, message: "La película no existe" });
    };

        return res.status(200).json({
            success: true, 
            data: data
        })

    } catch (error) {
        next(error)
    
};}

export const addMovie = async (req, res, next) => {
    try {
        const {title, year, director, genre, price, rating} = req.body
        if(!req.body){
            return ({statusCode: 400, message: "Por favor rellena los campos"})
        }
        const newMovie = await moviesService.createMovie({title, year, director, genre, price, rating})
    return res.status(200).json({
        success: true,
        data: newMovie
    })
    } catch (error) {
        next(error)
    }
}

export const updateMovie = async (req,res,next) =>{
    try {
        const id = parseInt(req.params.id)
                if(isNaN(id)){
            return next({statusCode: 400, message: "El id tiene que ser un numero"})
        };
        
        const {title, year, director, genre, price, rating } = req.body
        const updated = await moviesService.updateMovie(id, {title, year, director, genre, price, rating })
        res.status(200).json({
            success:true,
            data: updated
        })
    } catch (error) {
        next(error)
    }
}

export const deleteMovie = async (req, res, next) => {
    try {
        const id = parseInt(req.params.url)
        if (isNaN(id)){
            return next({statusCode: 400, message: "El id tiene que ser un numero"})
        } 
        const movie = await moviesService.findMovieById(id)
        if(!movie) {
            return next({statusCode: 404, message: "La pelicula que buscas no existe "})
        }
        const deleted = await moviesService.deleteMovie(id)
    
            return res.status(200).json({
                success: true,
                data: deleted
            });
        
    } catch (error) {
        next(error)
    }
};