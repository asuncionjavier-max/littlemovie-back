import prisma from "../lib/prisma.js";


export const checkoutUserCart = async (id) =>{
    try {
        const cart = await prisma.cart.findFirst({
            where:{user_id: id},
            include:{cart_movies: {
                include: {
                    movies: true
                }
            }
        }
    });
    if(!cart){
        return{
            ok: false,
            message: "El carrito esta vacio"
        };
    }
    const totalPrice = cart.cart_movies.reduce((acc, item)=> {
        return acc + Number(item.movies.price);
    }, 0);

    const newOrder = await prisma.$transaction(async (tx) =>{
        const order = await tx.orders.create({
            data: {
                user_id: id,
                total: totalPrice
            }
        });

    const orderItemsData = cart.cart_movies.map((items) => ({
        order_id: order.id,
        movie_id: items.movie_id,
        price_at_purchease: items.movies.price
    }));

    await tx.order_item.createMany({
        data: orderItemsData
    });
    await tx.cart_movies.deleteMany({
        where: { cart_id: cart.id }
    });

    return order;
    });
    return {
        ok: true,
            content: {
            orderId: newOrder.id,
            total: totalPrice,
        }
    }

    } catch (error) {
    console.error(">Error", error)
    return{
        ok: false
    }
    }
};