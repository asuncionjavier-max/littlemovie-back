
export default (...fields) => 
(req, _, next) => {
    if(!req.body) return next ({statusCode: 500, message: "Internal Error"});

    for(const field of fields) {
        if(!req.body[field]) return next({statusCode: 400, message : `Falta ${field} por rellenar`})
        }
    next();
} ;