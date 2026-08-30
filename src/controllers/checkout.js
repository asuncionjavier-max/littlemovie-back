import* as checkoutService from "../services/checkout.js"

export const checkoutCart = async (req, res, next) => {
    try {
        const {id} = res.locals;

        const checkCart = await checkoutService.checkoutUserCart(id)

        if(!checkCart){
            return next ({
                statusCode: 400,
                message: "No hay peliculas en el carrito para pasar al checkout"
            })
        };
        res.status(200).json({
            success: true,
            data: checkCart.content,
            message: "Checkout completado"
        })
        
    } catch (error) {
        next(error)
    }

}