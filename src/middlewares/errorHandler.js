export const errorHandler = (err,req,res,next) => {

    console.log(">error interceptado", err)

const statusCode = err.statusCode || 500;
const message = err.message || "Algo ha salido mal"

return res.status(statusCode).json({
    success: false,
    message: message
})

}