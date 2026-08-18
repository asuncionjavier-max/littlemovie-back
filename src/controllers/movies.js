import * as moviesService from "../services/movies.js"

export const getMovies = async (req ,res, next) =>{
    try {
        const data = await moviesService.findAllMovies()

        return res.status(200).json({
            success: true,
            data: data.content
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
        
        const result = await moviesService.findMovieById(id)
        if(!result.ok) {
            return next({ statusCode: 404, message: "La película no existe" });
    };

        return res.status(200).json({
            success: true, 
            data: result.content
        })

    } catch (error) {
        next(error)
    
};}

export const addMovie = async (req, res, next) => {
    try {
        const {title, year, director, genre, price, rating} = req.body
    
        const newMovie = await moviesService.createMovie({
            title,
            year,
            director,
            genre, 
            price,
            rating})

            if(!newMovie.ok) return next ({
                statusCode: 400,
                message: "No se ha podido añadir la pelicula"
            })
    return res.status(201).json({
        success: true,
        data: newMovie.content
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
            data: updated.content
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